<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Table;
use App\Services\OrderCalculationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function __construct(
        protected OrderCalculationService $calculationService
    ) {}

    public function index(Request $request)
    {
        // Cargamos la factura con sus ítems propios y con su orden + ítems de la orden como respaldo
        $query = Invoice::with(['order.orderItems.product', 'orderItems.product']);

        // filtros comunes
        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->input('date_from'));
        }
        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->input('date_to'));
        }
        if ($request->filled('min_total')) {
            $query->where('total', '>=', $request->input('min_total'));
        }
        if ($request->filled('max_total')) {
            $query->where('total', '<=', $request->input('max_total'));
        }
        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }
        if ($request->filled('order_type')) {
            $type = $request->input('order_type');
            if ($type !== '') {
                $query->whereHas('order', function ($q) use ($type) {
                    $q->where('type', $type);
                });
            }
        }
        if ($request->filled('search')) {
            $s = $request->input('search');
            $query->where(function ($q) use ($s) {
                $q->where('invoice_number', 'like', "%{$s}%")
                  ->orWhere('fiscal_name', 'like', "%{$s}%")
                  ->orWhere('fiscal_ruc', 'like', "%{$s}%");
            });
        }

        $sortBy = $request->input('sort_by', 'created_at');
        $sortDir = $request->input('sort_dir', 'desc');

        // prevenir sort por columnas no seguras
        $allowedSort = ['created_at', 'total', 'subtotal', 'invoice_number'];
        if (!in_array($sortBy, $allowedSort, true)) {
            $sortBy = 'created_at';
        }
        $sortDir = $sortDir === 'asc' ? 'asc' : 'desc';

        $invoices = $query->orderBy($sortBy, $sortDir)
                          ->paginate(10)
                          ->withQueryString();

        return Inertia::render('Cashier/Invoices/Index', [
            'invoices' => $invoices,
            'filters' => $request->only(['search', 'date_from', 'date_to', 'min_total', 'max_total', 'order_type', 'status', 'sort_by', 'sort_dir']),
        ]);
    }

    /**
     * Resuelve de forma atómica el número de factura dentro de una transacción activa.
     * Si el número enviado por el cliente está vacío o ya fue utilizado, genera el siguiente correlativo.
     */
    protected function resolveUniqueInvoiceNumber(?string $requestedNumber): string
    {
        $trimmed = trim((string) $requestedNumber);
        if ($trimmed !== '') {
            $exists = Invoice::where('invoice_number', $trimmed)->lockForUpdate()->exists();
            if (!$exists) {
                return $trimmed;
            }
        }

        return Invoice::generateInvoiceNumber();
    }

    public function store(Request $request)
    {
        $request->validate([
            'invoice_number' => 'nullable|string|max:50',
            'order_id' => 'required|exists:orders,id',
            'fiscal_name' => 'nullable|string|max:255',
            'fiscal_ruc' => 'nullable|string|max:30',
            'subtotal' => 'nullable|numeric|min:0',
            'discount_type' => 'nullable|string|in:amount,percent',
            'discount_value' => 'nullable|numeric|min:0',
            'discount_reason' => 'nullable|string|max:255',
            'total' => 'nullable|numeric|min:0',
            'items' => 'required|array|min:1',
            'items.*.order_item_id' => 'required|integer',
            'items.*.pay_quantity' => 'required|integer|min:1',
        ]);

        DB::beginTransaction();
        try {
            $order = Order::lockForUpdate()->findOrFail($request->input('order_id'));

            $resolvedLines = [];
            $subtotal = 0.0;

            foreach ($request->input('items', []) as $itemsData) {
                $orderItem = OrderItem::where('order_id', $order->id)
                    ->where('payment_status', 'pending')
                    ->lockForUpdate()
                    ->findOrFail($itemsData['order_item_id']);

                $amountPaid = (int) ($itemsData['pay_quantity'] ?? 0);
                if ($amountPaid <= 0 || $amountPaid > (int) $orderItem->quantity) {
                    throw ValidationException::withMessages([
                        'items' => 'La cantidad a pagar no es válida o excede la cantidad pendiente.',
                    ]);
                }

                $subtotal += (float) $orderItem->price * $amountPaid;
                $resolvedLines[] = [
                    'orderItem' => $orderItem,
                    'amountPaid' => $amountPaid,
                ];
            }

            $subtotal = round($subtotal, 2);
            if ($subtotal <= 0 || empty($resolvedLines)) {
                throw ValidationException::withMessages([
                    'items' => 'Debe seleccionar al menos un ítem válido para facturar.',
                ]);
            }

            $invoiceNumber = $this->resolveUniqueInvoiceNumber($request->input('invoice_number'));
            $discountAmount = $this->calculationService->calculateDiscount(
                $subtotal,
                $request->input('discount_type'),
                $request->input('discount_value')
            );
            $total = max(0.0, round($subtotal - $discountAmount, 2));

            $invoice = Invoice::create([
                'invoice_number' => $invoiceNumber,
                'order_id' => $order->id,
                'fiscal_name' => $request->input('fiscal_name'),
                'fiscal_ruc' => $request->input('fiscal_ruc'),
                'subtotal' => $subtotal,
                'discount_type' => $request->input('discount_type'),
                'discount_value' => $request->input('discount_value'),
                'discount_reason' => $request->input('discount_reason'),
                'discount_amount' => $discountAmount,
                'total' => $total,
            ]);

            foreach ($resolvedLines as $line) {
                /** @var OrderItem $orderItem */
                $orderItem = $line['orderItem'];
                $amountPaid = $line['amountPaid'];

                if ($amountPaid === (int) $orderItem->quantity) {
                    $orderItem->payment_status = 'paid';
                    $orderItem->invoice_id = $invoice->id;
                    $orderItem->save();
                } else {
                    $orderItem->quantity = (int) $orderItem->quantity - $amountPaid;
                    $orderItem->save();

                    OrderItem::create([
                        'order_id' => $orderItem->order_id,
                        'product_id' => $orderItem->product_id,
                        'quantity' => $amountPaid,
                        'price' => $orderItem->price,
                        'payment_status' => 'paid',
                        'invoice_id' => $invoice->id,
                    ]);
                }
            }

            $remainingItems = OrderItem::where('order_id', $order->id)
                ->where('payment_status', 'pending')
                ->exists();

            if (!$remainingItems) {
                $order->status = 'cerrada';
                $order->save();

                if ($order->table_id) {
                    Table::where('id', $order->table_id)->update(['status' => 'libre']);
                }
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'invoice_id' => $invoice->id,
                'invoice_number' => $invoice->invoice_number,
                'subtotal' => $invoice->subtotal,
                'discount_amount' => $invoice->discount_amount,
                'total' => $invoice->total,
            ]);
        } catch (ValidationException $e) {
            DB::rollBack();
            throw $e;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error al generar factura:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Hubo un problema al generar la factura.'], 500);
        }
    }

    public function storeFinal(Request $request)
    {
        $request->validate([
            'invoice_number' => 'nullable|string|max:50',
            'order_id' => 'required|exists:orders,id',
            'fiscal_name' => 'nullable|string|max:255',
            'fiscal_ruc' => 'nullable|string|max:30',
            'subtotal' => 'nullable|numeric|min:0',
            'discount_type' => 'nullable|string|in:amount,percent',
            'discount_value' => 'nullable|numeric|min:0',
            'discount_reason' => 'nullable|string|max:255',
            'total' => 'nullable|numeric|min:0',
        ]);

        DB::beginTransaction();

        try {
            $order = Order::lockForUpdate()->findOrFail($request->input('order_id'));

            $pendingItems = OrderItem::where('order_id', $order->id)
                ->where('payment_status', 'pending')
                ->lockForUpdate()
                ->get();

            if ($pendingItems->isEmpty()) {
                DB::rollBack();
                return response()->json([
                    'error' => 'No hay ítems pendientes para facturar en esta orden.',
                ], 422);
            }

            $subtotal = round((float) $pendingItems->sum(function (OrderItem $item) {
                return (float) $item->price * (int) $item->quantity;
            }), 2);

            $invoiceNumber = $this->resolveUniqueInvoiceNumber($request->input('invoice_number'));
            $discountAmount = $this->calculationService->calculateDiscount(
                $subtotal,
                $request->input('discount_type'),
                $request->input('discount_value')
            );
            $total = max(0.0, round($subtotal - $discountAmount, 2));

            $invoice = Invoice::create([
                'invoice_number' => $invoiceNumber,
                'order_id' => $order->id,
                'fiscal_name' => $request->input('fiscal_name'),
                'fiscal_ruc' => $request->input('fiscal_ruc'),
                'subtotal' => $subtotal,
                'discount_type' => $request->input('discount_type'),
                'discount_value' => $request->input('discount_value'),
                'discount_reason' => $request->input('discount_reason'),
                'discount_amount' => $discountAmount,
                'total' => $total,
            ]);

            // Marcar todos los ítems pendientes restantes como pagados y vincularlos a esta factura final
            OrderItem::where('order_id', $order->id)
                ->where('payment_status', 'pending')
                ->update([
                    'payment_status' => 'paid',
                    'invoice_id' => $invoice->id,
                ]);

            $order->status = 'cerrada';
            $order->save();

            // Liberar la mesa si aplica
            if ($order->table_id) {
                Table::where('id', $order->table_id)->update(['status' => 'libre']);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'invoice' => $invoice,
                'invoice_number' => $invoice->invoice_number,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error al generar factura:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Hubo un problema al generar la factura.'], 500);
        }
    }

    public function takeAwayInvoice(Request $request)
    {
        return $this->createFullOrderInvoice($request, 'takeaway');
    }

    public function pedidosYaInvoice(Request $request)
    {
        return $this->createFullOrderInvoice($request, 'pedidos ya');
    }

    public function deliveryInvoice(Request $request)
    {
        return $this->createFullOrderInvoice($request, 'delivery');
    }

    /**
     * Genera una factura completa recalculando subtotal, descuento y total en el servidor
     * a partir de los ítems aún no facturados de la orden (uso compartido para llevar, PedidosYa y delivery).
     */
    private function createFullOrderInvoice(Request $request, string $logContext)
    {
        $request->validate([
            'invoice_number' => 'nullable|string|max:50',
            'order_id' => 'required|exists:orders,id',
            'fiscal_name' => 'nullable|string|max:255',
            'fiscal_ruc' => 'nullable|string|max:30',
            'subtotal' => 'nullable|numeric|min:0',
            'discount_type' => 'nullable|in:amount,percent',
            'discount_value' => 'nullable|numeric|min:0',
            'discount_reason' => 'nullable|string|max:255',
            'discount_amount' => 'nullable|numeric|min:0',
            'total' => 'nullable|numeric|min:0',
        ]);

        DB::beginTransaction();

        try {
            $order = Order::lockForUpdate()->findOrFail($request->input('order_id'));

            $unpaidItems = OrderItem::where('order_id', $order->id)
                ->whereNull('invoice_id')
                ->lockForUpdate()
                ->get();

            if ($unpaidItems->isEmpty()) {
                DB::rollBack();
                return response()->json([
                    'error' => 'La orden ya fue facturada o no tiene ítems pendientes de pago.',
                ], 422);
            }

            $subtotal = round((float) $unpaidItems->sum(function (OrderItem $item) {
                return (float) $item->price * (int) $item->quantity;
            }), 2);

            $invoiceNumber = $this->resolveUniqueInvoiceNumber($request->input('invoice_number'));
            $discountAmount = $this->calculationService->calculateDiscount(
                $subtotal,
                $request->input('discount_type'),
                $request->input('discount_value')
            );
            $total = max(0.0, round($subtotal - $discountAmount, 2));

            $invoice = Invoice::create([
                'invoice_number' => $invoiceNumber,
                'order_id' => $order->id,
                'fiscal_name' => $request->input('fiscal_name'),
                'fiscal_ruc' => $request->input('fiscal_ruc'),
                'subtotal' => $subtotal,
                'discount_type' => $request->input('discount_type'),
                'discount_value' => $request->input('discount_value'),
                'discount_reason' => $request->input('discount_reason'),
                'discount_amount' => $discountAmount,
                'total' => $total,
            ]);

            OrderItem::where('order_id', $order->id)
                ->whereNull('invoice_id')
                ->update([
                    'payment_status' => 'paid',
                    'invoice_id' => $invoice->id,
                ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'invoice' => $invoice,
                'invoice_number' => $invoice->invoice_number,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Error al generar factura {$logContext}:", [
                'error' => $e->getMessage(),
                'request' => $request->all(),
            ]);

            return response()->json([
                'error' => 'Error interno del servidor.',
            ], 500);
        }
    }

    public function annul(Invoice $invoice)
    {
        if ($invoice->status === 'cancelled') {
            return response()->json(['error' => 'La factura ya ha sido anulada.'], 422);
        }

        DB::transaction(function () use ($invoice) {
            $invoice->update(['status' => 'cancelled']);
        });

        return response()->json(['message' => 'Factura anulada correctamente.']);
    }

    public function getNextInvoiceNumber()
    {
        $nextNumber = Invoice::generateInvoiceNumber();
        return response()->json(['invoice_number' => $nextNumber]);
    }
}

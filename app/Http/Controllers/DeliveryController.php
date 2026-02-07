<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Order;
use App\Models\Product;
use App\Models\Riders;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class DeliveryController extends Controller
{
    public function index()
    {
        // Pre-cargamos clientes para intentar asociar datos fiscales (no existe customer_id en orders aún)
        $customers = Customer::all();
        // traer también el phone para mostrarlo en el frontend
        $riders = Riders::where('status','active')->orderBy('name')->get(['id','name','status',]);
        $ridersById = $riders->keyBy('id');

        $customersByPhone = $customers->filter(fn($c) => !empty($c->phone))->keyBy('phone');
        $customersByName = $customers->filter(fn($c) => !empty($c->name))->keyBy('name');

    $orders = Order::with(['orderItems.product','invoice'])
            ->where('type', 'delivery')
            ->whereNotIn('status', ['entregada', 'cancelada'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($order) use ($customersByPhone, $customersByName, $ridersById) {
                // Prioridad: invoice -> teléfono -> nombre
                $invoice = $order->invoice;
                $matchedCustomer = null;
                if ($order->customer_phone && $customersByPhone->has($order->customer_phone)) {
                    $matchedCustomer = $customersByPhone->get($order->customer_phone);
                } elseif ($order->customer_name && $customersByName->has($order->customer_name)) {
                    $matchedCustomer = $customersByName->get($order->customer_name);
                }

                $fiscalName = $invoice->fiscal_name ?? ($matchedCustomer->fiscal_name ?? null);
                $fiscalRuc  = $invoice->fiscal_ruc ?? ($matchedCustomer->fiscal_ruc ?? null);

                // Calcular subtotal y monto de descuento
                $itemsSubtotal = $order->orderItems->reduce(function ($carry, $it) {
                    return $carry + ((float)$it->price * (int)$it->quantity);
                }, 0.0);

                $discountAmount = 0.0;
                if ($order->discount_type && $order->discount_value) {
                    if ($order->discount_type === 'percent') {
                        $discountAmount = round($itemsSubtotal * ((float)$order->discount_value / 100), 2);
                    } else { // amount
                        $discountAmount = (float)$order->discount_value;
                    }
                    // No permitir mayor que subtotal ni negativa
                    if ($discountAmount < 0) $discountAmount = 0.0;
                    if ($discountAmount > $itemsSubtotal) $discountAmount = $itemsSubtotal;
                }

                return [
                    'id' => $order->id,
                    'customer_name' => $order->customer_name,
                    'customer_phone' => $order->customer_phone,
                    'fiscal_name' => $fiscalName,
                    'fiscal_ruc' => $fiscalRuc,
                    'delivery_address' => $order->delivery_address,
                    // exponer assigned_to y datos básicos del rider para el frontend
                    'assigned_to' => $order->assigned_to,
                    'rider_name' => optional($ridersById->get($order->assigned_to))->name,
                    'status' => $order->status,
                    'total' => $order->total,
                    'created_at' => $order->created_at,
                    'indications' => $order->indications,
                    'payment_method' => $order->payment_method,
                    'cash_amount' => $order->cash_amount,
                    'delivery_notes' => $order->delivery_notes,
                    'discount_type' => $order->discount_type,
                    'discount_value' => $order->discount_value,
                    'discount_amount' => $discountAmount,
                    'discount_reason' => $order->discount_reason,
                    'subtotal' => $itemsSubtotal,
                    'items' => $order->orderItems->map(function ($item) {
                        return [
                            'product_id' => $item->product_id,
                            'product_name' => optional($item->product)->name,
                            'quantity' => $item->quantity,
                            'price' => $item->price,
                        ];
                    }),
                ];
            });

        $products = Product::orderBy('name')->get();

        return Inertia::render('Delivery/index', [
            'orders' => $orders,
            'products' => $products,
            'riders' => $riders,
            'customers' => $customers,
        ]);
    }

    /**
     * Actualiza solo el estado de una orden delivery (llamado vía axios.put)
     */
    public function updateStatus(Request $request, Order $order)
    {
        // Estados permitidos que puede pedir el frontend
        $allowedStatuses = ['asignada', 'en_camino', 'entregada'];

        $data = $request->validate([
            'status' => ['required', 'string', Rule::in($allowedStatuses)],
        ]);

        // Reglas de transición válidas
        $transitions = [
            'abierta'   => ['asignada'],
            'asignada'  => ['en_camino'],
            'en_camino' => ['entregada'],
            'entregada' => [],
        ];

        $current = $order->status;

        if (! isset($transitions[$current]) || ! in_array($data['status'], $transitions[$current], true)) {
            return response()->json(['message' => 'Transición de estado no permitida'], 422);
        }

        $order->status = $data['status'];
        $order->save();

        // devolver la orden actualizada
        return response()->json([
            'order' => $order,
        ]);
    }

    public function assignRider(Request $request, Order $order)
    {
        $data = $request->validate([
            'rider_id' => ['nullable', Rule::exists('riders', 'id')],
        ]);

        DB::transaction(function () use ($order, $data) {
            // Guardar asignación (campo assigned_to tal como indicaste)
            $order->assigned_to = $data['rider_id'] ?? null;

            // Si la orden no está entregada, pasarla a 'asignada'
            if ($order->status !== 'entregada') {
                $order->status = 'asignada';
            }

            $order->save();
        });

        // Recargar relaciones útiles para el frontend
        $order->load(['orderItems.product']);

        return response()->json([
            'message' => 'Rider asignado correctamente',
            'order' => $order,
        ]);
    }

    // Añadir este método al final de la clase (antes del cierre)
    public function show(Order $order)
    {
        $order->load(['orderItems.product','invoice']);

        // intentar obtener customer (por customer_id si existe o por teléfono)
        $customer = null;
        if ($order->customer_id) {
            $customer = Customer::find($order->customer_id);
        }
        if (!$customer && !empty($order->customer_phone)) {
            $customer = Customer::where('phone', $order->customer_phone)->first();
        }

        $itemsSubtotal = $order->orderItems->reduce(function ($carry, $it) {
            return $carry + ((float)$it->price * (int)$it->quantity);
        }, 0.0);

        // descuento calculado
        $discountAmount = 0.0;
        if ($order->discount_type && $order->discount_value) {
            if ($order->discount_type === 'percent') {
                $discountAmount = round($itemsSubtotal * ((float)$order->discount_value / 100), 2);
            } else {
                $discountAmount = (float)$order->discount_value;
            }
            $discountAmount = max(0.0, min($discountAmount, $itemsSubtotal));
        }

        $rider = Riders::find($order->assigned_to);

        // fiscal: preferir invoice -> order (si lo guardaste) -> customer
        $fiscal_name = $order->invoice->fiscal_name ?? ($order->fiscal_name ?? ($customer->fiscal_name ?? null));
        $fiscal_ruc  = $order->invoice->fiscal_ruc  ?? ($order->fiscal_ruc  ?? ($customer->fiscal_ruc  ?? null));

        return response()->json([
            'order' => [
                'id' => $order->id,
                'customer_name' => $order->customer_name,
                'customer_phone' => $order->customer_phone,
                'fiscal_name' => $fiscal_name,
                'fiscal_ruc' => $fiscal_ruc,
                'delivery_address' => $order->delivery_address,
                'assigned_to' => $order->assigned_to,
                'rider_name' => optional($rider)->name,
                'status' => $order->status,
                'total' => $order->total,
                'created_at' => $order->created_at,
                'indications' => $order->indications,
                'payment_method' => $order->payment_method,
                'cash_amount' => $order->cash_amount,
                'delivery_notes' => $order->delivery_notes,
                'discount_type' => $order->discount_type,
                'discount_value' => $order->discount_value,
                'discount_amount' => $discountAmount,
                'discount_reason' => $order->discount_reason,
                'subtotal' => $itemsSubtotal,
                'items' => $order->orderItems->map(function ($item) {
                    return [
                        'order_item_id' => $item->id,
                        'product_id' => $item->product_id,
                        'product_name' => optional($item->product)->name,
                        'quantity' => $item->quantity,
                        'price' => $item->price,
                    ];
                }),
            ]
        ]);
    }

    public function cancel(Order $order)
    {
        if ($order->status === 'entregada' || $order->status === 'cancelada') {
            return response()->json(['message' => 'Esta orden no puede ser cancelada.'], 422);
        }

        DB::transaction(function () use ($order) {
            // Cancelar la orden
            $order->status = 'cancelada';
            $order->save();

            // Cancelar la factura si existe
            if ($order->invoice) {
                $invoice = $order->invoice;
                $invoice->status = 'cancelled';
                $invoice->save();
            }
        });

        return response()->json(['message' => 'La orden y su factura han sido canceladas.']);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_phone' => 'required|string|max:20',
            'delivery_address' => 'required|string|max:255',
            'indications' => 'nullable|string|max:255',
            'payment_method' => 'required|string|max:50',
            'cash_amount' => 'nullable|numeric|min:0',
            'delivery_notes' => 'nullable|string|max:255',
            'discount_type' => 'nullable|string|in:none,percent,amount',
            'discount_value' => 'nullable|numeric|min:0',
            'discount_reason' => 'nullable|string|max:255',
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
        ]);

        // Crear la orden
        $order = Order::create([
            'customer_name' => $validated['customer_name'],
            'customer_phone' => $validated['customer_phone'],
            'delivery_address' => $validated['delivery_address'],
            'indications' => $validated['indications'],
            'payment_method' => $validated['payment_method'],
            'cash_amount' => $validated['cash_amount'] ?? 0,
            'delivery_notes' => $validated['delivery_notes'],
            'discount_type' => $validated['discount_type'] === 'none' ? null : $validated['discount_type'],
            'discount_value' => $validated['discount_value'] ?? null,
            'discount_reason' => $validated['discount_reason'],
            'status' => 'abierta', // Estado inicial
        ]);

        // Crear los items de la orden
        foreach ($validated['items'] as $item) {
            $order->orderItems()->create([
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }

        // Cálculo y asignación del total
        $order->total = $order->orderItems->sum(function ($item) {
            return $item->price * $item->quantity;
        });
        $order->save();

        return response()->json([
            'message' => 'Orden creada exitosamente',
            'order' => $order,
        ]);
    }
}

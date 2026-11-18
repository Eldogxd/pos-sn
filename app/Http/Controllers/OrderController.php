<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Table;
use App\Services\OrderCalculationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    public function __construct(
        protected OrderCalculationService $calculationService
    ) {}

    public function updateDeliveryOrder(Request $request, Order $order)
    {
        if ($order->type !== 'delivery') {
            return response()->json([
                'success' => false,
                'message' => 'Solo se pueden editar órdenes de delivery.'
            ], 422);
        }

        $data = $request->validate([
            'customer' => 'required|array',
            'customer.id' => 'nullable|exists:customers,id',
            'customer.name' => 'required|string|max:255',
            'customer.phone' => 'required|string|max:255',
            'customer.fiscal_name' => 'nullable|string|max:255',
            'customer.fiscal_ruc' => 'nullable|string|max:255',
            'address' => 'required|string|max:255',
            'indications' => 'nullable|string|max:255',
            'discount_type' => 'nullable|in:amount,percent',
            'discount_value' => 'nullable|numeric|min:0',
            'discount_reason' => 'nullable|string|max:255',
            'payment_method' => 'nullable|string|max:255',
            'cash_amount' => 'nullable|numeric|min:0',
            'delivery_notes' => 'nullable|string|max:255',
            'products' => 'required|array|min:1',
            'products.*.id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
            'products.*.price' => 'required|numeric|min:0',
        ]);

        $this->validateActiveProducts($data['products'], $order);

        $calculation = $this->calculationService->resolveItemsAndTotals(
            $data['products'],
            'delivery',
            $data['discount_type'] ?? null,
            $data['discount_value'] ?? null
        );

        DB::transaction(function () use ($data, $order, $calculation) {
            $customerData = $data['customer'];
            $customer = !empty($customerData['id'])
                ? Customer::find($customerData['id'])
                : null;

            if (!$customer) {
                $customer = Customer::firstOrCreate(
                    ['phone' => $customerData['phone']],
                    [
                        'name' => $customerData['name'],
                        'fiscal_name' => $customerData['fiscal_name'] ?? null,
                        'fiscal_ruc' => $customerData['fiscal_ruc'] ?? null,
                    ]
                );
            } else {
                $customer->update([
                    'name' => $customerData['name'],
                    'fiscal_name' => $customerData['fiscal_name'] ?? null,
                    'fiscal_ruc' => $customerData['fiscal_ruc'] ?? null,
                ]);
            }

            if (!empty($data['address'])) {
                $customer->addresses()->firstOrCreate(['address' => $data['address']]);
            }

            $order->update([
                'customer_id' => $customer->id,
                'customer_name' => $customer->name,
                'customer_phone' => $customer->phone,
                'delivery_address' => $data['address'],
                'indications' => $data['indications'] ?? null,
                'payment_method' => $data['payment_method'] ?? null,
                'cash_amount' => $data['cash_amount'] ?? null,
                'delivery_notes' => $data['delivery_notes'] ?? null,
                'discount_type' => $data['discount_type'] ?? null,
                'discount_value' => $data['discount_value'] ?? null,
                'discount_reason' => $data['discount_reason'] ?? null,
                'total' => $calculation['total'],
            ]);

            // Reset items
            $order->orderItems()->delete();
            foreach ($calculation['items'] as $resolvedItem) {
                $order->orderItems()->create([
                    'product_id' => $resolvedItem['product_id'],
                    'quantity' => $resolvedItem['quantity'],
                    'price' => $resolvedItem['price'],
                    'payment_status' => 'pending',
                ]);
            }
        });

        return response()->json([
            'success' => true,
            'message' => 'Orden de delivery actualizada.',
            'order' => $order->load('orderItems.product')
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'type' => 'required|in:mesa,llevar,pedidosya,delivery',
            'table_id' => 'nullable|exists:tables,id',
            'customer_name' => 'nullable|string|max:255',
            'indications' => 'nullable|string|max:255',
            'discount_type' => 'nullable|in:amount,percent',
            'discount_value' => 'nullable|numeric|min:0',
            'discount_reason' => 'nullable|string|max:255',
            'products' => 'required|array|min:1',
            'products.*.id' => 'required|integer|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
            'products.*.price' => 'required|numeric|min:0.01',
        ]);

        $this->validateActiveProducts($data['products']);

        $calculation = $this->calculationService->resolveItemsAndTotals(
            $data['products'],
            $data['type'],
            $data['discount_type'] ?? null,
            $data['discount_value'] ?? null
        );

        DB::transaction(function () use ($data, $calculation) {
            $order = Order::create([
                'type' => $data['type'],
                'table_id' => $data['table_id'] ?? null,
                'customer_name' => $data['customer_name'] ?? null,
                'indications' => $data['indications'] ?? null,
                'total' => $calculation['total'],
                'status' => 'abierta',
                'discount_type' => $data['discount_type'] ?? null,
                'discount_value' => $data['discount_value'] ?? null,
                'discount_reason' => $data['discount_reason'] ?? null,
            ]);

            foreach ($calculation['items'] as $resolvedItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $resolvedItem['product_id'],
                    'quantity' => $resolvedItem['quantity'],
                    'price' => $resolvedItem['price'],
                    'payment_status' => 'pending',
                ]);
            }

            if (!empty($data['table_id'])) {
                Table::where('id', $data['table_id'])->update(['status' => 'ocupada']);
            }
        });

        return redirect()->back()->with('success', 'Orden creada correctamente');
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'table_id' => 'nullable|exists:tables,id',
            'customer_name' => 'nullable|string|max:255',
            'indications' => 'nullable|string|max:255',
            'products' => 'nullable|array',
            'products.*.id' => 'required|integer|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
            'products.*.price' => 'required|numeric|min:0.01',
        ]);

        $order = Order::findOrFail($id);
        $this->validateActiveProducts($data['products'] ?? [], $order, true);

        $shouldCloseOrder = false;

        DB::transaction(function () use ($data, $order, &$shouldCloseOrder) {
            $calculation = $this->calculationService->resolveItemsAndTotals(
                $data['products'] ?? [],
                $order->type ?? 'mesa'
            );

            // Preservar el monto de los ítems ya pagados (facturas parciales previas)
            $paidSubtotal = (float) $order->orderItems()
                ->where('payment_status', 'paid')
                ->get()
                ->sum(fn ($item) => (float) $item->price * (int) $item->quantity);

            $combinedSubtotal = round($paidSubtotal + $calculation['subtotal'], 2);
            $discountAmount = $this->calculationService->calculateDiscount(
                $combinedSubtotal,
                $order->discount_type,
                $order->discount_value
            );
            $finalTotal = max(0.0, round($combinedSubtotal - $discountAmount, 2));

            $order->update([
                'customer_name' => $data['customer_name'] ?? null,
                'indications' => $data['indications'] ?? null,
                'total' => $finalTotal,
            ]);

            $order->orderItems()->where('payment_status', 'pending')->delete();

            foreach ($calculation['items'] as $resolvedItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $resolvedItem['product_id'],
                    'quantity' => $resolvedItem['quantity'],
                    'price' => $resolvedItem['price'],
                    'payment_status' => 'pending',
                ]);
            }

            $hasPendingItems = $order->orderItems()->where('payment_status', 'pending')->exists();

            if (!$hasPendingItems) {
                $order->update(['status' => 'cerrada']);
                $shouldCloseOrder = true;

                if ($order->table) {
                    $order->table->update(['status' => 'libre']);
                }
            }
        });

        // Solo marcar como ocupada si la orden sigue abierta
        if (!$shouldCloseOrder && isset($data['table_id'])) {
            Table::where('id', $data['table_id'])->update(['status' => 'ocupada']);
        }

        $message = 'Orden actualizada correctamente.';
        if ($shouldCloseOrder) {
            $message = 'Orden cerrada automáticamente: no quedan productos pendientes.';
        }

        return redirect()->back()->with('success', $message);
    }

    public function generateInvoiceAndClose($id)
    {
        // Buscar la orden con sus ítems y mesa relacionada
        $order = Order::with(['orderItems', 'table'])->findOrFail($id);

        DB::transaction(function () use ($order) {
            // Marcar orden como cerrada
            $order->update(['status' => 'cerrada']);

            // Si tiene mesa asociada, marcarla como libre
            if ($order->table) {
                $order->table->update(['status' => 'libre']);
            }
        });

        return redirect()->back()->with('success', 'Orden cerrada y factura generada correctamente.');
    }

    public function storeTakeAwayOrder(Request $request)
    {
        $data = $request->validate([
            'type' => ['required', 'in:llevar,pedidosya'],
            'customer_name' => ['nullable', 'string', 'max:255'],
            'indications' => ['nullable', 'string', 'max:255'],
            'discount_type' => ['nullable', 'in:amount,percent'],
            'discount_value' => ['nullable', 'numeric', 'min:0'],
            'discount_reason' => ['nullable', 'string', 'max:255'],
            'products' => ['required', 'array', 'min:1'],
            'products.*.id' => ['required', 'exists:products,id'],
            'products.*.quantity' => ['required', 'integer', 'min:1'],
            'products.*.price' => ['required', 'numeric', 'min:0'],
        ]);

        $this->validateActiveProducts($data['products']);

        $calculation = $this->calculationService->resolveItemsAndTotals(
            $data['products'],
            $data['type'],
            $data['discount_type'] ?? null,
            $data['discount_value'] ?? null
        );

        $order = DB::transaction(function () use ($data, $calculation) {
            $order = Order::create([
                'type' => $data['type'],
                'table_id' => null,
                'customer_name' => $data['customer_name'] ?? null,
                'indications' => $data['indications'] ?? null,
                'total' => $calculation['total'],
                'status' => 'cerrada',
                'discount_type' => $data['discount_type'] ?? null,
                'discount_value' => $data['discount_value'] ?? null,
                'discount_reason' => $data['discount_reason'] ?? null,
            ]);

            foreach ($calculation['items'] as $resolvedItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $resolvedItem['product_id'],
                    'quantity' => $resolvedItem['quantity'],
                    'price' => $resolvedItem['price'],
                    'payment_status' => 'paid',
                ]);
            }

            return $order;
        });

        return redirect()->back()->with([
            'order_id' => $order->id,
            'success' => 'Orden de llevar creada exitosamente.'
        ]);
    }

    public function storePedidosYaOrder(Request $request)
    {
        $data = $request->validate([
            'type' => ['required', 'in:llevar,pedidosya'],
            'customer_name' => ['nullable', 'string', 'max:255'],
            'external_number' => ['nullable', 'string', 'max:255'],
            'indications' => ['nullable', 'string', 'max:255'],
            'discount_type' => ['nullable', 'in:amount,percent'],
            'discount_value' => ['nullable', 'numeric', 'min:0'],
            'discount_reason' => ['nullable', 'string', 'max:255'],
            'products' => ['required', 'array', 'min:1'],
            'products.*.id' => ['required', 'exists:products,id'],
            'products.*.quantity' => ['required', 'integer', 'min:1'],
            'products.*.price' => ['required', 'numeric', 'min:0'],
        ]);

        $this->validateActiveProducts($data['products']);

        // Calcular subtotal y precios reales desde BD (usando py_price o price, y precio manual solo si is_generic)
        $calculation = $this->calculationService->resolveItemsAndTotals(
            $data['products'],
            'pedidosya',
            $data['discount_type'] ?? null,
            $data['discount_value'] ?? null
        );

        $order = DB::transaction(function () use ($data, $calculation) {
            $order = Order::create([
                'type' => $data['type'],
                'table_id' => null,
                'customer_name' => $data['customer_name'] ?? null,
                'external_number' => $data['external_number'] ?? null,
                'indications' => $data['indications'] ?? null,
                'total' => $calculation['total'],
                'status' => 'cerrada',
                'discount_type' => $data['discount_type'] ?? null,
                'discount_value' => $data['discount_value'] ?? null,
                'discount_reason' => $data['discount_reason'] ?? null,
            ]);

            foreach ($calculation['items'] as $resolvedItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $resolvedItem['product_id'],
                    'quantity' => $resolvedItem['quantity'],
                    'price' => $resolvedItem['price'],
                    'payment_status' => 'paid',
                ]);
            }

            return $order;
        });

        return redirect()->back()->with([
            'order_id' => $order->id,
            'success' => 'Orden de llevar creada exitosamente.'
        ]);
    }

    public function storeDeliveryOrder(Request $request)
    {
        $data = $request->validate([
            'customer' => 'required|array',
            'customer.id' => 'nullable|exists:customers,id',
            'customer.name' => 'required|string|max:255',
            'customer.phone' => 'required|string|max:255',
            'customer.fiscal_name' => 'nullable|string|max:255',
            'customer.fiscal_ruc' => 'nullable|string|max:255',
            'address' => 'required|string|max:255',
            'indications' => 'nullable|string|max:255',
            'payment_method' => 'nullable|string|max:255',
            'cash_amount' => 'nullable|numeric|min:0',
            'delivery_notes' => 'nullable|string|max:255',
            'discount_type' => 'nullable|in:amount,percent',
            'discount_value' => 'nullable|numeric|min:0',
            'discount_reason' => 'nullable|string|max:255',
            'products' => 'required|array|min:1',
            'products.*.id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
            'products.*.price' => 'required|numeric|min:0',
        ]);

        $this->validateActiveProducts($data['products']);

        $calculation = $this->calculationService->resolveItemsAndTotals(
            $data['products'],
            'delivery',
            $data['discount_type'] ?? null,
            $data['discount_value'] ?? null
        );

        DB::transaction(function () use ($data, $calculation) {
            $customerData = $data['customer'];
            $customer = !empty($customerData['id'])
                ? Customer::find($customerData['id'])
                : null;

            if (!$customer) {
                $customer = Customer::firstOrCreate(
                    ['phone' => $customerData['phone']],
                    [
                        'name' => $customerData['name'],
                        'fiscal_name' => $customerData['fiscal_name'] ?? null,
                        'fiscal_ruc' => $customerData['fiscal_ruc'] ?? null,
                    ]
                );
            } else {
                $customer->update([
                    'name' => $customerData['name'],
                    'fiscal_name' => $customerData['fiscal_name'] ?? null,
                    'fiscal_ruc' => $customerData['fiscal_ruc'] ?? null,
                ]);
            }

            if (!empty($data['address'])) {
                $customer->addresses()->firstOrCreate(['address' => $data['address']]);
            }

            $order = Order::create([
                'type' => 'delivery',
                'customer_id' => $customer->id,
                'customer_name' => $customer->name,
                'customer_phone' => $customer->phone,
                'delivery_address' => $data['address'],
                'indications' => $data['indications'] ?? null,
                'payment_method' => $data['payment_method'] ?? null,
                'cash_amount' => $data['cash_amount'] ?? null,
                'delivery_notes' => $data['delivery_notes'] ?? null,
                'discount_type' => $data['discount_type'] ?? null,
                'discount_value' => $data['discount_value'] ?? null,
                'discount_reason' => $data['discount_reason'] ?? null,
                'total' => $calculation['total'],
                'status' => 'abierta',
            ]);

            foreach ($calculation['items'] as $resolvedItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $resolvedItem['product_id'],
                    'quantity' => $resolvedItem['quantity'],
                    'price' => $resolvedItem['price'],
                    'payment_status' => 'pending',
                ]);
            }

            return $order;
        });

        return redirect()->route('delivery.index')->with('success', 'Orden de delivery creada exitosamente.');
    }

    public function cancel(Request $request)
    {
        $data = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'table_id' => 'nullable|exists:tables,id'
        ]);

        $order = Order::with('table')->findOrFail($data['order_id']);

        DB::transaction(function () use ($order) {
            // Marcar como cancelada
            $order->update(['status' => 'cancelada']);

            // Liberar mesa si aplica
            if ($order->table) {
                $order->table->update(['status' => 'libre']);
            }
        });

        return back()->with('success', 'Orden cancelada correctamente.');
    }

    public function UpdateDiscount(Request $request, $id)
    {
        $data = $request->validate([
            'discount_type' => 'nullable|in:amount,percent',
            'discount_value' => 'nullable|numeric|min:0',
            'discount_reason' => 'nullable|string|max:255'
        ]);

        $order = Order::findOrFail($id);

        DB::transaction(function () use ($order, $data) {
            $order->update([
                'discount_type' => $data['discount_type'],
                'discount_value' => $data['discount_value'],
                'discount_reason' => $data['discount_reason']
            ]);
        });

        return redirect()->back()->with('success', 'Descuento aplicado correctamente.');
    }

    public function removeDiscount(Request $request, Order $order)
    {
        $order->update([
            'discount_type' => null,
            'discount_value' => null,
            'discount_reason' => null,
        ]);

        return response()->json(['success' => true, 'message' => 'Descuento eliminado']);
    }

    public function transferTable(Request $request, $id)
    {
        $data = $request->validate([
            'new_table_id' => 'required|exists:tables,id',
        ]);

        $order = Order::with('table')->findOrFail($id);
        $oldTable = $order->table;
        $newTable = Table::findOrFail($data['new_table_id']);

        if (
            $oldTable &&
            (int) $oldTable->id !== (int) $newTable->id &&
            strtolower((string) $newTable->status) === 'ocupada'
        ) {
            return redirect()->back()->withErrors([
                'new_table_id' => 'La mesa de destino ya se encuentra ocupada.'
            ]);
        }

        DB::transaction(function () use ($order, $newTable, $oldTable) {
            // Cambiar la mesa de la orden
            $order->update(['table_id' => $newTable->id]);

            // Actualizar el estado de la nueva mesa a ocupada
            $newTable->update(['status' => 'ocupada']);

            // Liberar la mesa anterior si aplica y es distinta
            if ($oldTable && (int) $oldTable->id !== (int) $newTable->id) {
                $oldTable->update(['status' => 'libre']);
            }
        });

        return redirect()->back()->with('success', 'Orden transferida a la nueva mesa correctamente.');
    }

    /**
     * Impide agregar productos inactivos o aumentar su cantidad por encima de lo ya registrado en la orden.
     */
    private function validateActiveProducts(array $products, ?Order $existingOrder = null, bool $onlyPendingExisting = false): void
    {
        if (empty($products)) {
            return;
        }

        $requestedByProduct = [];
        foreach ($products as $item) {
            $productId = (int) ($item['id'] ?? 0);
            if ($productId > 0) {
                $requestedByProduct[$productId] = ($requestedByProduct[$productId] ?? 0) + (int) ($item['quantity'] ?? 0);
            }
        }

        if (empty($requestedByProduct)) {
            return;
        }

        $dbProducts = Product::whereIn('id', array_keys($requestedByProduct))->get()->keyBy('id');

        $existingByProduct = [];
        if ($existingOrder) {
            $query = $existingOrder->orderItems();
            if ($onlyPendingExisting) {
                $query->where('payment_status', '!=', 'paid');
            }
            foreach ($query->get() as $existingItem) {
                $pid = (int) $existingItem->product_id;
                $existingByProduct[$pid] = ($existingByProduct[$pid] ?? 0) + (int) $existingItem->quantity;
            }
        }

        foreach ($requestedByProduct as $productId => $requestedQty) {
            $product = $dbProducts->get($productId);
            if ($product && $product->is_active === false) {
                $allowedQty = (int) ($existingByProduct[$productId] ?? 0);
                if ($requestedQty > $allowedQty) {
                    throw ValidationException::withMessages([
                        'products' => "No se pueden agregar más unidades de \"{$product->name}\" porque el producto está inactivo.",
                    ]);
                }
            }
        }
    }
}

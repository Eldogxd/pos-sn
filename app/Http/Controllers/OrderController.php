<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Table;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Invoice;
use App\Models\Customer;
use App\Models\CustomerAddress;
use Illuminate\Support\Carbon;
use Svg\Tag\Rect;
use Inertia\Inertia;

class OrderController extends Controller
{
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

    DB::transaction(function () use ($data, $order) {
        $customerData = $data['customer'];
        $customer = !empty($customerData['id'])
            ? Customer::find($customerData['id'])
            : null;

        if (!$customer) {
            $customer = Customer::firstOrCreate(
                ['phone' => $customerData['phone']],
                [
                    'name' => $customerData['name'],
                    'fiscal_name' => $customerData['fiscal_name'],
                    'fiscal_ruc' => $customerData['fiscal_ruc'],
                ]
            );
        } else {
            $customer->update([
                'name' => $customerData['name'],
                'fiscal_name' => $customerData['fiscal_name'],
                'fiscal_ruc' => $customerData['fiscal_ruc'],
            ]);
        }

        if ($data['address']) {
            $customer->addresses()->firstOrCreate(['address' => $data['address']]);
        }

        // Recalcular subtotal y total
        $subtotal = collect($data['products'])->reduce(function ($carry, $productData) {
            $product = Product::findOrFail($productData['id']);
            $price = $product->is_generic ? $productData['price'] : $product->price;
            return $carry + ($price * $productData['quantity']);
        }, 0);

        $discountAmount = 0;
        $finalTotal = $subtotal;
        if (!empty($data['discount_type']) && $data['discount_value'] > 0) {
            if ($data['discount_type'] === 'percent') {
                $value = min($data['discount_value'], 100);
                $discountAmount = ($subtotal * $value) / 100;
            } elseif ($data['discount_type'] === 'amount') {
                $discountAmount = min($data['discount_value'], $subtotal);
            }
            $finalTotal = $subtotal - $discountAmount;
        }

        $order->update([
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
            'total' => $finalTotal,
        ]);

        // Reset items
        $order->orderItems()->delete();
        foreach ($data['products'] as $productData) {
            $product = Product::findOrFail($productData['id']);
            $price = $product->is_generic ? $productData['price'] : $product->price;
            $order->orderItems()->create([
                'product_id' => $product->id,
                'quantity' => $productData['quantity'],
                'price' => $price,
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
        'products' => 'required|array|min:1',
        'products.*.id' => 'required|integer',
        'products.*.quantity' => 'required|integer|min:1',
        'products.*.price' => 'required|numeric|min:0.01', // ← Importante
    ]);

    DB::transaction(function () use ($data) {
        $total = 0;

        // Primero: calcular total usando el precio del frontend
        foreach ($data['products'] as $productData) {
            $product = Product::findOrFail($productData['id']);
            $price = $product->is_generic ? $productData['price'] : $product->price;
            $total += $price * $productData['quantity'];
        }

        $order = Order::create([
            'type' => $data['type'],
            'table_id' => $data['table_id'],
            'customer_name' => $data['customer_name'],
            'indications' => $data['indications'],
            'total' => $total,
            'status' => 'abierta',
            'discount_type' => $data['discount_type'] ?? null,
            'discount_value' => $data['discount_value'] ?? null,
            'discount_reason' => $data['discount_reason'] ?? null
        ]);

        // Segundo: crear ítems con el precio correcto
        foreach ($data['products'] as $productData) {
            $product = Product::findOrFail($productData['id']);
            $price = $product->is_generic ? $productData['price'] : $product->price;


            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $productData['quantity'],
                'price' => $price, // ✅ Precio manual o de DB
                'payment_status' => 'pending',
            ]);
        }

        if ($data['table_id']) {
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
        'products.*.id' => 'required|integer',
        'products.*.quantity' => 'required|integer|min:1',
        'products.*.price' => 'required|numeric|min:0.01',
    ]);

    $shouldCloseOrder = false;

    DB::transaction(function () use ($data, $id, &$shouldCloseOrder) {
        $order = Order::findOrFail($id);

        $total = 0;

        if (!empty($data['products'])) {
            foreach ($data['products'] as $productData) {
                $product = Product::findOrFail($productData['id']);
                $price = $product->is_generic ? $productData['price'] : $product->price;
                $total += $price * $productData['quantity'];
            }
        }

        $order->update([
            'customer_name' => $data['customer_name'],
            'indications' => $data['indications'],
            'total' => $total,
        ]);

        $order->orderItems()->where('payment_status', 'pending')->delete();

        if (!empty($data['products'])) {
            foreach ($data['products'] as $productData) {
                $product = Product::findOrFail($productData['id']);
                $price = $product->is_generic ? $productData['price'] : $product->price;

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $productData['quantity'],
                    'price' => $price,
                    'payment_status' => 'pending',
                ]);
            }
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

    //  Solo marcar como ocupada si la orden sigue abierta
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

    $subtotal = 0;
    foreach ($data['products'] as $productData) {
        $product = Product::findOrFail($productData['id']);
        $price = $product->is_generic ? $productData['price'] : $product->price;
        $subtotal += $price * $productData['quantity'];
    }

    $discountAmount = 0;
    $finalTotal = $subtotal;

    if (!empty($data['discount_type']) && $data['discount_value'] > 0) {
        if ($data['discount_type'] === 'percent') {
            $value = min($data['discount_value'], 100);
            $discountAmount = ($subtotal * $value) / 100;
        } elseif ($data['discount_type'] === 'amount') {
            $discountAmount = min($data['discount_value'], $subtotal);
        }
        $finalTotal = $subtotal - $discountAmount;
    }

    $order = DB::transaction(function () use ($data, $finalTotal, $discountAmount) {
        $order = Order::create([
            'type' => $data['type'],
            'table_id' => null,
            'customer_name' => $data['customer_name'],
            'indications' => $data['indications'],
            'total' => $finalTotal,
            'status' => 'cerrada', // o 'pagada'
            'discount_type' => $data['discount_type'] ?? null,
            'discount_value' => $data['discount_value'] ?? null,
            'discount_reason' => $data['discount_reason'] ?? null,
        ]);

        foreach ($data['products'] as $productData) {
            $product = Product::findOrFail($productData['id']);
            $price = $product->is_generic ? $productData['price'] : $product->price;

            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $productData['quantity'],
                'price' => $price,
                'payment_status' => 'paid',
            ]);
        }
        return $order;
    });

    // ✅ Devolver respuesta compatible con Inertia
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
        'products.*.price' => ['required', 'numeric', 'min:0'], // 
    ]);

    // calcular subtotal usando el precio enviado desde el frontend (py_price)
    $subtotal = 0;
    foreach ($data['products'] as $productData) {
        $subtotal += $productData['price'] * $productData['quantity'];
        $product = Product::findOrFail($productData['id']);
        $price = $product->is_generic ? $productData['price'] : $product->price;
    }

    // calcular descuentos
    $discountAmount = 0;
    $finalTotal = $subtotal;

    if (!empty($data['discount_type']) && $data['discount_value'] > 0) {
        if ($data['discount_type'] === 'percent') {
            $value = min($data['discount_value'], 100);
            $discountAmount = ($subtotal * $value) / 100;
        } elseif ($data['discount_type'] === 'amount') {
            $discountAmount = min($data['discount_value'], $subtotal);
        }
        $finalTotal = $subtotal - $discountAmount;
    }

    // guardar en DB con transacción
    $order = DB::transaction(function () use ($data, $finalTotal) {
        $order = Order::create([
            'type' => $data['type'],
            'table_id' => null,
            'customer_name' => $data['customer_name'],
            'external_number' => $data['external_number'],
            'indications' => $data['indications'],
            'total' => $finalTotal,
            'status' => 'cerrada', // o 'pagada'
            'discount_type' => $data['discount_type'] ?? null,
            'discount_value' => $data['discount_value'] ?? null,
            'discount_reason' => $data['discount_reason'] ?? null,
        ]);

        foreach ($data['products'] as $productData) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $productData['id'],
                'quantity' => $productData['quantity'],
                'price' => $productData['price'], // 👈 se usa el precio enviado (py_price)
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
        // Se exige precio enviado (el frontend ya lo manda). Lo usamos solo si el producto es genérico.
        'products.*.price' => 'required|numeric|min:0',
        // 'total' ya no se confía (se recalcula); si sigue llegando no lo validamos para evitar confiar en el cliente.
    ]);

    // Calcular subtotal usando precio manual para genéricos y precio de BD para los demás
    $subtotal = 0;
    $finalTotal = 0; // pre-init para evitar warnings de variable no asignada
    foreach ($data['products'] as $productData) {
        $product = Product::findOrFail($productData['id']);
        $price = $product->is_generic ? $productData['price'] : $product->price;
        $subtotal += $price * $productData['quantity'];
    }

    // Aplicar descuento si existe
    $discountAmount = 0;
    $finalTotal = $subtotal;
    if (!empty($data['discount_type']) && $data['discount_value'] > 0) {
        if ($data['discount_type'] === 'percent') {
            $value = min($data['discount_value'], 100); // seguridad
            $discountAmount = ($subtotal * $value) / 100;
        } elseif ($data['discount_type'] === 'amount') {
            $discountAmount = min($data['discount_value'], $subtotal);
        }
        $finalTotal = $subtotal - $discountAmount;
    }

    $order = DB::transaction(function () use ($data, $finalTotal) {
        $customerData = $data['customer'];
        $customer = null;

        if (!empty($customerData['id'])) {
            $customer = Customer::find($customerData['id']);
        }

        if (!$customer) {
            $customer = Customer::firstOrCreate(
                ['phone' => $customerData['phone']],
                [
                    'name' => $customerData['name'],
                    'fiscal_name' => $customerData['fiscal_name'],
                    'fiscal_ruc' => $customerData['fiscal_ruc'],
                ]
            );
        } else {
            $customer->update([
                'name' => $customerData['name'],
                'fiscal_name' => $customerData['fiscal_name'],
                'fiscal_ruc' => $customerData['fiscal_ruc'],
            ]);
        }

        if ($data['address']) {
            $customer->addresses()->firstOrCreate(['address' => $data['address']]);
        }

        $order = Order::create([
            'type' => 'delivery',
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
            'total' => $finalTotal,
            'status' => 'abierta',
        ]);

        foreach ($data['products'] as $productData) {
            $product = Product::findOrFail($productData['id']);
            $price = $product->is_generic ? $productData['price'] : $product->price;
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $productData['quantity'],
                'price' => $price,
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
    // Opción 1: Resetear solo los campos del descuento
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

$order = Order::findOrFail($id);

// Guarda la mesa anterior antes de cambiar la orden
$oldTable = $order->table;

DB::transaction(function () use ($order, $data, $oldTable) {
    // Cambiar la mesa de la orden
    $order->update(['table_id' => $data['new_table_id']]);

    // Actualizar el estado de la nueva mesa a ocupada
    Table::where('id', $data['new_table_id'])->update(['status' => 'ocupada']);

    // Liberar la mesa anterior si aplica
    if ($oldTable) {
        $oldTable->update(['status' => 'libre']);
    }
});

return redirect()->back()->with('success', 'Orden transferida a la nueva mesa correctamente.');


}



}


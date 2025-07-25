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
use Illuminate\Support\Carbon;
use Svg\Tag\Rect;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function store(Request $request)
{
    // 1. Validar datos del request
    $data = $request->validate([
        'type' => 'required|in:mesa,llevar,pedidosya',
        'table_id' => 'nullable|exists:tables,id',
        'customer_name' => 'nullable|string|max:255',
        'indications' => 'nullable|string|max:255',
        'products' => 'required|array|min:1',
        'products.*.id' => 'required|exists:products,id',
        'products.*.quantity' => 'required|integer|min:1'
    ]);

    // 2. Iniciar transacción
    DB::transaction(function () use ($data) {
        // 3. Calcular total
        $total = 0;
        foreach ($data['products'] as $productData) {
           
            $product = Product::findOrFail($productData['id']);
            $total += $product->price * $productData['quantity'];
        }

        

        // 5. Crear orden con el número de factura asignado
        $order = Order::create([
            'type' => $data['type'],
            'table_id' => $data['table_id'],
            'customer_name' => $data['customer_name'],
            'indications' => $data['indications'],
            'total' => $total,
            'status' => 'abierta',
            
        ]);

        // 6. Agregar ítems a la orden
        foreach ($data['products'] as $productData) {
            $product = Product::findOrFail($productData['id']);

            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $productData['quantity'],
                'price' => $product->price,
                'payment_status' => 'pending', // Estado inicial de pago
            ]);
        }

   

        // 8. Cambiar estado de mesa si aplica
        if ($data['table_id']) {
            Table::where('id', $data['table_id'])->update(['status' => 'ocupada']);
        }
    });

    // 9. Redirigir
    return redirect()->back()->with('success', 'Orden creada correctamente');
}

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'table_id'=> 'nullable|exists:tables,id',
            'customer_name' => 'nullable|string|max:255',
            'indications'=> 'nullable|string|max:255',
            'products' => 'required|array|min:1',
            'products.*.id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
           
        ]);
      

        DB::transaction(function()use($data, $id) {
            $order = Order::findOrFail($id);

            $total = 0;

            foreach ($data['products'] as $productData) {
                $product = Product::findOrFail($productData['id']);
                $total += $product->price * $productData['quantity'];
            }

            $order->update([
                'customer_name' => $data['customer_name'],
                'indications'=> $data['indications'],
                'total' => $total,
                
                
            ]);

            // Eliminar los items de la orden existentes
            $order->orderItems()->where('payment_status', 'pending')->delete();

            // Crear nuevos items de la orden
            foreach ($data['products'] as $productData) {
                $product = Product::findOrFail($productData['id']);
            
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $productData['quantity'],
                    'price' => $product->price,
                    'payment_status' => 'pending', // Estado inicial de pago
                ]);
            }
        });

        // Actualizar el estado de la mesa si se proporciona un ID de mesa
        if ($data ['table_id']) {
            Table::where('id', $data['table_id'])->update(['status' => 'ocupada']);
        }

       return redirect()->back()->with('success', 'Orden actualizada correctamente.');

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


    public function generatePartialInvoice($id)
    {
        $order = Order::with(['orderItems.product'])->findOrFail($id);
        $products = $order->orderItems->map(function ($item) {
            return [
                'name' => $item->product->name,
                'price' => $item->product->price,
                'quantity' => $item->quantity,
                'total' => $item->price * $item->quantity
            ];
        });
    
        $total = $products->sum(fn ($p) => $p['total']);
    
        $pdf = Pdf::loadView('invoices.pdf', compact('products', 'total'));
    
        return response($pdf->output(), 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="factura-parcial-' . now()->format('YmdHis') . '.pdf"');
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

}


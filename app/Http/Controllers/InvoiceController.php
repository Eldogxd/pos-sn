<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Invoice;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\PartialInvoice;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Log;
use App\Models\Table;
use App\Models\Product;
use App\Models\OrderItem;
use Barryvdh\DomPDF\Facade\Pdf;

class InvoiceController extends Controller
{
    public function store(Request $request)
{
    $request->validate([
        'invoice_number' => 'required|string|unique:invoices,invoice_number',
        'order_id' => 'required|exists:orders,id',
        'fiscal_name' => 'nullable|string|max:255',
        'fiscal_ruc' => 'nullable|string|max:30',
        'subtotal' => 'required|numeric',
        'discount_type' => 'nullable|string|in:amount,percent',
        'discount_value' => 'nullable|numeric|min:0',
        'discount_reason' => 'nullable|string|max:255',
        'total' => 'required|numeric',
        'items' => 'required|array',

    ]);

    DB::beginTransaction();
    try{
        $invoice = Invoice::create($request->only([
            'invoice_number',
            'order_id',
            'fiscal_name',
            'fiscal_ruc',
            'subtotal',
            'discount_type',
            'discount_value',
            'discount_reason',
            'total'
        ]));

        foreach ($request->items as $itemsData){
            $orderItem = OrderItem::findOrFail($itemsData['order_item_id']);
            $amountPaid = intval($itemsData['pay_quantity']);

            if ($amountPaid <= 0 || $amountPaid > $orderItem->quantity) {
                continue; 
            }

            if ($amountPaid === $orderItem->quantity){
                
                $orderItem->payment_status = 'paid';
                $orderItem->invoice_id = $invoice->id;
                $orderItem->save();
            } else {
                $pending = $orderItem->quantity - $amountPaid;

                $orderItem->quantity = $pending;
                $orderItem->save();


                orderItem::create([
                    'order_id' => $orderItem->order_id,
                    'product_id' => $orderItem->product_id,
                    'quantity' => $amountPaid,
                    'price' => $orderItem->price,
                    'payment_status' => 'paid',
                    'invoice_id' => $invoice->id, 
                ]);
            }
                
        }

        $order = Order::findOrFail($request->order_id);
        $remainingItems = OrderItem::where('order_id', $order->id)
            ->where('payment_status', 'pending')
            ->exists();

            if (!$remainingItems) {
                $order->status = 'cerrada';
                $order->save();


                $table = Table::findOrFail($order->table_id);
                if ($table) {
                    $table->status = 'libre';
                    $table->save();
                }

            } 

    DB::commit();
    
    return response()->json(['success' => true, 'invoice_id' => $invoice->id]);
} catch (\Exception $e) {
        DB::rollBack();
        Log::error('Error al generar factura:', ['error' => $e->getMessage()]);
        return response()->json(['error' => 'Hubo un problema al generar la factura.'], 500);
    }



    
}


public function storeFinal(Request $request)
{
   // Validación de los datos de la factura
   $request->validate([
    'invoice_number' => 'required|string|unique:invoices,invoice_number',
    'order_id' => 'required|exists:orders,id',
    'fiscal_name' => 'nullable|string|max:255',
    'fiscal_ruc' => 'nullable|string|max:30',
    'subtotal' => 'required|numeric',
    'discount_type' => 'nullable|string|in:amount,percent',
    'discount_value' => 'nullable|numeric|min:0',
    'discount_reason' => 'nullable|string|max:255',
    'total' => 'required|numeric',
]);

DB::beginTransaction();

try {
    // Crear la factura
    $invoice = Invoice::create($request->all());

    // Obtener la orden y actualizar su estado
    $order = Order::findOrFail($request->input('order_id'));
    $order->status = 'cerrada';
    $order->save();

    // Liberar la mesa
    $table = Table::findOrFail($order->table_id);
    $table->status = 'libre';
    $table->save();

    DB::commit();

    return response()->json(['success' => true, 'invoice' => $invoice]);

} catch (\Exception $e) {
    DB::rollBack();
    Log::error('Error al generar factura:', ['error' => $e->getMessage()]);
    return response()->json(['error' => 'Hubo un problema al generar la factura.'], 500);
}


}

public function getNextInvoiceNumber()
{
    $nextNumber = Invoice::generateInvoiceNumber(); // El método que ya tienes
    return response()->json(['invoice_number' => $nextNumber]);
}

}



<?php

namespace App\Http\Controllers;


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
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function index(Request $request)
    {
        // Cargamos la factura con su orden, y dentro de la orden, sus items y el producto de cada item.
         $query = Invoice::with(['order.orderItems.product','order']);

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
        $allowedSort = ['created_at','total','subtotal','invoice_number'];
        if (!in_array($sortBy, $allowedSort)) {
            $sortBy = 'created_at';
        }
        $sortDir = $sortDir === 'asc' ? 'asc' : 'desc';

        $invoices = $query->orderBy($sortBy, $sortDir)
                          ->paginate(10)
                          ->withQueryString();

        return Inertia::render('Cashier/Invoices/Index', [
            'invoices' => $invoices,
            'filters' => $request->only(['search','date_from','date_to','min_total','max_total','order_type','status','sort_by','sort_dir']),
        ]);
    }
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

public function takeAwayInvoice(Request $request)
{
    

    $request->validate([
        'invoice_number' => 'required|string|unique:invoices,invoice_number',
        'order_id' => 'required|exists:orders,id',
        'fiscal_name' => 'nullable|string|max:255',
        'fiscal_ruc' => 'nullable|string|max:30',
        'subtotal' => 'required|numeric|min:0',
        'discount_type' => 'nullable|in:amount,percent',
        'discount_value' => 'nullable|numeric|min:0',
        'discount_reason' => 'nullable|string|max:255',
        'discount_amount' => 'required|numeric|min:0',
        'total' => 'required|numeric|min:0',
        
    ]);

    DB::beginTransaction();

    try {
        // Crear la factura, solo con referencia a la orden
        $invoice = Invoice::create([
            'invoice_number' => $request->invoice_number,
            'order_id' => $request->order_id,
            'fiscal_name' => $request->fiscal_name,
            'fiscal_ruc' => $request->fiscal_ruc,
            'subtotal' => $request->subtotal,
            'discount_type' => $request->discount_type,
            'discount_value' => $request->discount_value,
            'discount_reason' => $request->discount_reason,
            'discount_amount' => $request->discount_amount,
            'total' => $request->total,
            
        ]);

      

        DB::commit();

        return response()->json([
            'success' => true,
            'invoice' => $invoice,
            'invoice_number' => $invoice->invoice_number
        ]);

    } catch (\Exception $e) {
        DB::rollBack();
        Log::error('Error al generar factura takeaway:', [
            'error' => $e->getMessage(),
            'request' => $request->all()
        ]);

        return response()->json([
            'error' => 'Error interno del servidor.'
        ], 500);
    }
}

public function pedidosYaInvoice(Request $request)
{
    $request->validate([
        'invoice_number' => 'required|string|unique:invoices,invoice_number',
        'order_id' => 'required|exists:orders,id',
        'fiscal_name' => 'nullable|string|max:255',
        'fiscal_ruc' => 'nullable|string|max:30',
        'subtotal' => 'required|numeric|min:0',
        'discount_type' => 'nullable|in:amount,percent',
        'discount_value' => 'nullable|numeric|min:0',
        'discount_reason' => 'nullable|string|max:255',
        'discount_amount' => 'required|numeric|min:0',
        'total' => 'required|numeric|min:0',
    ]);

    DB::beginTransaction();

    try {
        // Crear la factura, solo con referencia a la orden
        $invoice = Invoice::create([
            'invoice_number' => $request->invoice_number,
            'order_id' => $request->order_id,
            'fiscal_name' => $request->fiscal_name,
            'fiscal_ruc' => $request->fiscal_ruc,
            'subtotal' => $request->subtotal,
            'discount_type' => $request->discount_type,
            'discount_value' => $request->discount_value,
            'discount_reason' => $request->discount_reason,
            'discount_amount' => $request->discount_amount,
            'total' => $request->total,
        ]);

        DB::commit();

        return response()->json([
            'success' => true,
            'invoice' => $invoice,
            'invoice_number' => $invoice->invoice_number
        ]);

    } catch (\Exception $e) {
        DB::rollBack();
        Log::error('Error al generar factura pedidos ya:', [
            'error' => $e->getMessage(),
            'request' => $request->all()
        ]);

        return response()->json([
            'error' => 'Error interno del servidor.'
        ], 500);
    }
}

    public function deliveryInvoice(Request $request)
    {
        $request->validate([
            'invoice_number' => 'required|string|unique:invoices,invoice_number',
            'order_id' => 'required|exists:orders,id',
            'fiscal_name' => 'nullable|string|max:255',
            'fiscal_ruc' => 'nullable|string|max:30',
            'subtotal' => 'required|numeric|min:0',
            'discount_type' => 'nullable|in:amount,percent',
            'discount_value' => 'nullable|numeric|min:0',
            'discount_reason' => 'nullable|string|max:255',
            'total' => 'required|numeric|min:0',
        ]);

        DB::beginTransaction();

        try {
            // Crear la factura, solo con referencia a la orden
            $invoice = Invoice::create([
                'invoice_number' => $request->invoice_number,
                'order_id' => $request->order_id,
                'fiscal_name' => $request->fiscal_name,
                'fiscal_ruc' => $request->fiscal_ruc,
                'subtotal' => $request->subtotal,
                'discount_type' => $request->discount_type,
                'discount_value' => $request->discount_value,
                'discount_reason' => $request->discount_reason,
                'discount_amount' => $request->discount_amount,
                'total' => $request->total,
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'invoice' => $invoice,
                'invoice_number' => $invoice->invoice_number
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error al generar factura de delivery:', [
                'error' => $e->getMessage(),
                'request' => $request->all()
            ]);

            return response()->json([
                'error' => 'Error interno del servidor.'
            ], 500);
        }
    }

    public function annul(Invoice $invoice)
    {
       

        // 2. Validar que la factura no esté ya anulada
        if ($invoice->status === 'cancelled') {
            return response()->json(['error' => 'La factura ya ha sido anulada.'], 422);
        }

        DB::transaction(function () use ($invoice) {
            // 3. Cambiar el estado de la factura
            $invoice->update(['status' => 'cancelled']);

            $order = $invoice->order;

            // if ($order) {
            //     // 4. Si la orden fue cerrada por esta factura, reabrirla.
            //     if ($order->status === 'cerrada') {
            //         $order->update(['status' => 'activa']);
            //     }

            //     // 5. Revertir el estado de pago de los items de la orden que esta factura pagó.
            //     foreach ($order->order_items as $item) {
            //         if ($item->payment_status === 'paid') {
            //             $item->update(['payment_status' => 'pending']);
            //         }
            //     }
            // }
        });

        return response()->json(['message' => 'Factura anulada correctamente.']);
    }

public function getNextInvoiceNumber()
{
    $nextNumber = Invoice::generateInvoiceNumber(); // El método que ya tienes
    return response()->json(['invoice_number' => $nextNumber]);
}

}



<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Order;
use App\Models\Riders; // Importa el modelo Riders
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Pasa la lista de repartidores a la vista para el filtro
      $riders = Riders::orderByDesc('created_at')->get();
        return Inertia::render('Admin/Dashboard', [
            'riders' => $riders,
        ]);
    }

    public function data(Request $request)
    {
        try {
            $from = $request->input('from');
            $to = $request->input('to');
            $type = $request->input('type');
            $riderId = $request->input('rider_id');
            $status = $request->input('status');

            // Se unifica el filtro de fecha a invoices.created_at
            $baseQuery = DB::table('orders')
                ->join('invoices', 'orders.id', '=', 'invoices.order_id')
                ->where('invoices.status', 'created') // Solo facturas pagadas
                ->when($from, fn($q) => $q->whereDate('invoices.created_at', '>=', $from))
                ->when($to, fn($q) => $q->whereDate('invoices.created_at', '<=', $to))
                ->when($type, fn($q) => $q->where('orders.type', $type))
                ->when($riderId, fn($q) => $q->where('orders.assigned_to', $riderId))
                ->when($status, fn($q) => $q->where('orders.status', $status));

            $totalRevenue = (float) (clone $baseQuery)->sum('invoices.total');

            // --- CÁLCULO CORRECTO DE DESCUENTOS ---
            $invoicesForDiscount = (clone $baseQuery)->select('invoices.subtotal', 'invoices.discount_type', 'invoices.discount_value')->get();
            $totalDiscounts = $invoicesForDiscount->reduce(function ($carry, $invoice) {
                if ($invoice->discount_type === 'percent') {
                    // Si es porcentaje, calculamos sobre el subtotal
                    $carry += ($invoice->subtotal * $invoice->discount_value) / 100;
                } else {
                    // Si es 'amount' o fijo, sumamos el valor directo
                    $carry += $invoice->discount_value;
                }
                return $carry;
            }, 0);
            // --- FIN CÁLCULO CORRECTO ---

            $invoicedOrdersByType = (clone $baseQuery)->select('orders.type', DB::raw('COUNT(invoices.id) as count'))->groupBy('orders.type')->get();
            
            $invoicedProducts = (clone $baseQuery)
                ->join('order_items', 'order_items.order_id', '=', 'orders.id')
                ->join('products', 'products.id', '=', 'order_items.product_id')
                ->select('products.name', DB::raw('SUM(order_items.quantity) as total_quantity'))
                ->groupBy('products.id', 'products.name')
                ->orderByDesc('total_quantity')
                ->get();

            $salesByHour = (clone $baseQuery)
                ->select(DB::raw('HOUR(invoices.created_at) as hour'), DB::raw('COUNT(invoices.id) as count'))
                ->groupBy('hour')->orderBy('hour')->get();

            $salesByCategory = (clone $baseQuery)
                ->join('order_items', 'order_items.order_id', '=', 'orders.id')
                ->join('products', 'products.id', '=', 'order_items.product_id')
                ->select('products.category as name', DB::raw('SUM(order_items.quantity) as count'))
                ->whereNotNull('products.category')
                ->groupBy('products.category')
                ->orderByDesc('count')
                ->get();

            // --- CONSULTA PARA FACTURAS CANCELADAS ---
            $cancelledQuery = DB::table('orders')
                ->join('invoices', 'orders.id', '=', 'invoices.order_id')
                ->whereIn('invoices.status', ['cancelled', 'voided']) // Asumiendo estos estados para anuladas
                ->when($from, fn($q) => $q->whereDate('invoices.created_at', '>=', $from))
                ->when($to, fn($q) => $q->whereDate('invoices.created_at', '<=', $to))
                ->when($type, fn($q) => $q->where('orders.type', $type))
                ->when($riderId, fn($q) => $q->where('orders.assigned_to', $riderId))
                ->when($status, fn($q) => $q->where('orders.status', $status));

            $totalCancelledCount = (clone $cancelledQuery)->count();
            $totalCancelledRevenue = (float) (clone $cancelledQuery)->sum('invoices.total');


            // --- INICIO: CÁLCULO DE COBROS DE DELIVERY (CORREGIDO) ---
            $deliveryFeesQuery = DB::table('orders')
                ->join('invoices', 'orders.id', '=', 'invoices.order_id')
                ->join('order_items', 'orders.id', '=', 'order_items.order_id')
                ->join('products', 'order_items.product_id', '=', 'products.id')
                ->where('invoices.status', 'created')
                ->where('orders.type', 'delivery')
                ->where('products.name', 'Delivery') // Busca el producto por su nombre
                ->when($from, fn($q) => $q->whereDate('invoices.created_at', '>=', $from))
                ->when($to, fn($q) => $q->whereDate('invoices.created_at', '<=', $to))
                ->when($riderId, fn($q) => $q->where('orders.assigned_to', $riderId));

            $totalDeliveryFees = (float) (clone $deliveryFeesQuery)->sum(DB::raw('order_items.price * order_items.quantity'));
            // --- FIN: CÁLCULO DE COBROS DE DELIVERY ---


            // --- CONSULTA CORREGIDA ---
            // Ahora la consulta de rendimiento también aplica el filtro de repartidor y de facturas pagadas.
            $riderPerformance = DB::table('orders')
                ->join('riders', 'riders.id', '=', 'orders.assigned_to')
                ->join('invoices', 'orders.id', '=', 'invoices.order_id') // Join para filtrar por estado de factura
                ->where('invoices.status', 'created') // Solo facturas pagadas
                ->where('orders.type', 'delivery')
                ->when($from, fn($q) => $q->whereDate('invoices.created_at', '>=', $from)) // Fecha de factura
                ->when($to, fn($q) => $q->whereDate('invoices.created_at', '<=', $to)) // Fecha de factura
                ->when($riderId, fn($q) => $q->where('orders.assigned_to', $riderId)) // Filtro añadido
                ->select('riders.id', 'riders.name', DB::raw('COUNT(orders.id) as delivery_count'))
                ->groupBy('riders.id', 'riders.name')->orderByDesc('delivery_count')->get();

            return response()->json([
                'total_revenue' => $totalRevenue,
                'total_discounts' => $totalDiscounts,
                'total_delivery_fees' => $totalDeliveryFees, // Dato añadido
                'invoiced_products' => $invoicedProducts,
                'invoiced_orders_by_type' => $invoicedOrdersByType,
                'sales_by_hour' => $salesByHour,
                'sales_by_category' => $salesByCategory,
                'rider_performance' => $riderPerformance,
                'total_cancelled_count' => $totalCancelledCount,
                'total_cancelled_revenue' => $totalCancelledRevenue,
            ]);

        } catch (\Throwable $e) {
            Log::error('Dashboard Data Error: ' . $e->getMessage());
            $errorMessage = config('app.debug') ? $e->getMessage() : 'Error al procesar la solicitud.';
            return response()->json(['error' => $errorMessage], 500);
        }
    }

    public function riderProducts(Request $request)
    {
        try {
            $request->validate(['rider_id' => 'required|integer']);

            $from = $request->input('from');
            $to = $request->input('to');
            $riderId = $request->input('rider_id');

            $products = DB::table('order_items')
                ->join('orders', 'order_items.order_id', '=', 'orders.id')
                ->join('invoices', 'orders.id', '=', 'invoices.order_id')
                ->join('products', 'order_items.product_id', '=', 'products.id')
                ->where('orders.assigned_to', $riderId)
                ->where('invoices.status', 'created')
                ->when($from, fn($q) => $q->whereDate('invoices.created_at', '>=', $from))
                ->when($to, fn($q) => $q->whereDate('invoices.created_at', '<=', $to))
                ->select('products.name', DB::raw('SUM(order_items.quantity) as total_quantity'))
                ->groupBy('products.id', 'products.name')
                ->orderByDesc('total_quantity')
                ->get();

            return response()->json($products);

        } catch (\Throwable $e) {
            Log::error('Rider Products Error: ' . $e->getMessage());
            return response()->json(['error' => 'Error al obtener los productos del repartidor.'], 500);
        }
    }

    public function getRiderDeliveryFees(Request $request)
    {
        try {
            $from = $request->input('from');
            $to = $request->input('to');
            $riderId = $request->input('rider_id');

            $query = DB::table('orders')
                ->join('invoices', 'orders.id', '=', 'invoices.order_id')
                ->join('riders', 'orders.assigned_to', '=', 'riders.id')
                ->join('order_items', 'orders.id', '=', 'order_items.order_id')
                ->join('products', 'order_items.product_id', '=', 'products.id')
                ->where('invoices.status', 'created')
                ->where('orders.type', 'delivery')
                ->where('products.name', 'Delivery') // Busca el producto por su nombre
                ->when($from, fn($q) => $q->whereDate('invoices.created_at', '>=', $from))
                ->when($to, fn($q) => $q->whereDate('invoices.created_at', '<=', $to))
                ->when($riderId, fn($q) => $q->where('orders.assigned_to', $riderId))
                ->select(
                    'riders.id',
                    'riders.name',
                    // Suma el precio del item 'Delivery'
                    DB::raw('SUM(order_items.price * order_items.quantity) as total_delivery_fees'),
                    // Contamos las órdenes únicas que tienen un producto 'Delivery'
                    DB::raw('COUNT(DISTINCT orders.id) as delivery_count')
                )
                ->groupBy('riders.id', 'riders.name')
                ->orderByDesc('total_delivery_fees')
                ->get();

            return response()->json($query);

        } catch (\Throwable $e) {
            Log::error('Rider Delivery Fees Error: ' . $e->getMessage());
            return response()->json(['error' => 'Error al obtener los cobros de delivery por repartidor.'], 500);
        }
    }

    public function getDiscountedOrders(Request $request)
    {
        // La consulta ahora busca donde el valor del descuento sea mayor a 0
        $query = Invoice::where('discount_value', '>', 0)
                        ->where('status', 'created') // Filtrar solo facturas pagadas/creadas
                        ->with('order:id,type') // Corregido: usa 'type'
                        // Seleccionamos los campos necesarios para el cálculo
                        ->select('id', 'order_id', 'created_at', 'subtotal', 'discount_type', 'discount_value', 'discount_reason')
                        ->orderBy('created_at', 'desc');

        // Aplicar filtros de fecha
        if ($request->filled('from')) {
            $query->whereDate('created_at', '>=', $request->from);
        }
        if ($request->filled('to')) {
            $query->whereDate('created_at', '<=', $request->to);
        }

        // Aplicar filtro de tipo de orden
        if ($request->filled('type')) {
            $query->whereHas('order', function ($q) use ($request) {
                $q->where('type', $request->type); // Corregido: usa 'type'
            });
        }

        $invoices = $query->get();

        // Mapear los resultados y CALCULAR el 'discount_amount'
        $results = $invoices->map(function ($invoice) {
            $discountAmount = 0;
            if ($invoice->discount_type === 'percent') {
                // Si es porcentaje, calculamos sobre el subtotal
                $discountAmount = ($invoice->subtotal * $invoice->discount_value) / 100;
            } else {
                // Si es 'amount' o fijo, el valor es el monto directo
                $discountAmount = $invoice->discount_value;
            }

            return [
                'id' => $invoice->order_id,
                'created_at' => $invoice->created_at,
                'order_type' => $invoice->order ? $invoice->order->type : 'N/A', // Corregido: usa 'type' y la clave 'order_type'
                'discount_amount' => $discountAmount, // Usamos el monto calculado
                'discount_reason' => $invoice->discount_reason,
            ];
        });

        return response()->json($results);
    }
}

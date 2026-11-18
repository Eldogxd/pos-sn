<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Riders;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $riders = Riders::orderByDesc('created_at')->get();
        return Inertia::render('Admin/Dashboard', [
            'riders' => $riders,
        ]);
    }

    /**
     * Aplica el join entre orders/invoices y order_items evitando duplicar ítems
     * cuando una orden tiene múltiples facturas parciales o datos históricos sin invoice_id.
     */
    protected function joinInvoiceOrderItems($query)
    {
        return $query->join('order_items', function (JoinClause $join) {
            $join->on('order_items.order_id', '=', 'orders.id')
                ->where(function ($q) {
                    $q->whereColumn('order_items.invoice_id', 'invoices.id')
                        ->orWhere(function ($sub) {
                            $sub->whereNull('order_items.invoice_id')
                                ->whereRaw(
                                    'invoices.id = (SELECT MAX(i2.id) FROM invoices i2 WHERE i2.order_id = orders.id AND i2.status = ?)',
                                    ['created']
                                );
                        });
                });
        });
    }

    public function data(Request $request)
    {
        try {
            $from = $request->input('from');
            $to = $request->input('to');
            $type = $request->input('type');
            $riderId = $request->input('rider_id');
            $status = $request->input('status');

            $baseQuery = DB::table('orders')
                ->join('invoices', 'orders.id', '=', 'invoices.order_id')
                ->where('invoices.status', 'created')
                ->when($from, fn ($q) => $q->whereDate('invoices.created_at', '>=', $from))
                ->when($to, fn ($q) => $q->whereDate('invoices.created_at', '<=', $to))
                ->when($type, fn ($q) => $q->where('orders.type', $type))
                ->when($riderId, fn ($q) => $q->where('orders.assigned_to', $riderId))
                ->when($status, fn ($q) => $q->where('orders.status', $status));

            $totalRevenue = (float) (clone $baseQuery)->sum('invoices.total');

            $invoicesForDiscount = (clone $baseQuery)
                ->select('invoices.subtotal', 'invoices.discount_type', 'invoices.discount_value', 'invoices.discount_amount')
                ->get();

            $totalDiscounts = $invoicesForDiscount->reduce(function ($carry, $invoice) {
                if ($invoice->discount_amount !== null && (float) $invoice->discount_amount > 0) {
                    return $carry + (float) $invoice->discount_amount;
                }
                if ($invoice->discount_type === 'percent') {
                    $carry += ((float) $invoice->subtotal * (float) $invoice->discount_value) / 100;
                } elseif (!empty($invoice->discount_type)) {
                    $carry += (float) $invoice->discount_value;
                }
                return $carry;
            }, 0.0);

            $invoicedOrdersByType = (clone $baseQuery)
                ->select('orders.type', DB::raw('COUNT(invoices.id) as count'))
                ->groupBy('orders.type')
                ->get();

            $invoicedProducts = $this->joinInvoiceOrderItems(clone $baseQuery)
                ->join('products', 'products.id', '=', 'order_items.product_id')
                ->select('products.name', DB::raw('SUM(order_items.quantity) as total_quantity'))
                ->groupBy('products.id', 'products.name')
                ->orderByDesc('total_quantity')
                ->get();

            $driver = DB::connection()->getDriverName();
            $hourExpression = $driver === 'sqlite'
                ? "CAST(strftime('%H', invoices.created_at) AS INTEGER)"
                : 'HOUR(invoices.created_at)';

            $salesByHour = (clone $baseQuery)
                ->select(DB::raw("{$hourExpression} as hour"), DB::raw('COUNT(invoices.id) as count'))
                ->groupBy('hour')
                ->orderBy('hour')
                ->get();

            $salesByCategory = $this->joinInvoiceOrderItems(clone $baseQuery)
                ->join('products', 'products.id', '=', 'order_items.product_id')
                ->select('products.category as name', DB::raw('SUM(order_items.quantity) as count'))
                ->whereNotNull('products.category')
                ->groupBy('products.category')
                ->orderByDesc('count')
                ->get();

            $cancelledQuery = DB::table('orders')
                ->join('invoices', 'orders.id', '=', 'invoices.order_id')
                ->whereIn('invoices.status', ['cancelled', 'voided'])
                ->when($from, fn ($q) => $q->whereDate('invoices.created_at', '>=', $from))
                ->when($to, fn ($q) => $q->whereDate('invoices.created_at', '<=', $to))
                ->when($type, fn ($q) => $q->where('orders.type', $type))
                ->when($riderId, fn ($q) => $q->where('orders.assigned_to', $riderId))
                ->when($status, fn ($q) => $q->where('orders.status', $status));

            $totalCancelledCount = (clone $cancelledQuery)->count();
            $totalCancelledRevenue = (float) (clone $cancelledQuery)->sum('invoices.total');

            $deliveryFeesBase = DB::table('orders')
                ->join('invoices', 'orders.id', '=', 'invoices.order_id')
                ->where('invoices.status', 'created')
                ->where('orders.type', 'delivery')
                ->when($from, fn ($q) => $q->whereDate('invoices.created_at', '>=', $from))
                ->when($to, fn ($q) => $q->whereDate('invoices.created_at', '<=', $to))
                ->when($riderId, fn ($q) => $q->where('orders.assigned_to', $riderId));

            $deliveryFeesQuery = $this->joinInvoiceOrderItems($deliveryFeesBase)
                ->join('products', 'order_items.product_id', '=', 'products.id')
                ->where('products.name', 'Delivery');

            $totalDeliveryFees = (float) (clone $deliveryFeesQuery)->sum(DB::raw('order_items.price * order_items.quantity'));

            $riderPerformance = DB::table('orders')
                ->join('riders', 'riders.id', '=', 'orders.assigned_to')
                ->join('invoices', 'orders.id', '=', 'invoices.order_id')
                ->where('invoices.status', 'created')
                ->where('orders.type', 'delivery')
                ->when($from, fn ($q) => $q->whereDate('invoices.created_at', '>=', $from))
                ->when($to, fn ($q) => $q->whereDate('invoices.created_at', '<=', $to))
                ->when($riderId, fn ($q) => $q->where('orders.assigned_to', $riderId))
                ->select('riders.id', 'riders.name', DB::raw('COUNT(DISTINCT orders.id) as delivery_count'))
                ->groupBy('riders.id', 'riders.name')
                ->orderByDesc('delivery_count')
                ->get();

            return response()->json([
                'total_revenue' => $totalRevenue,
                'total_discounts' => $totalDiscounts,
                'total_delivery_fees' => $totalDeliveryFees,
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

            $base = DB::table('orders')
                ->join('invoices', 'orders.id', '=', 'invoices.order_id')
                ->where('orders.assigned_to', $riderId)
                ->where('invoices.status', 'created')
                ->when($from, fn ($q) => $q->whereDate('invoices.created_at', '>=', $from))
                ->when($to, fn ($q) => $q->whereDate('invoices.created_at', '<=', $to));

            $products = $this->joinInvoiceOrderItems($base)
                ->join('products', 'order_items.product_id', '=', 'products.id')
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

            $base = DB::table('orders')
                ->join('invoices', 'orders.id', '=', 'invoices.order_id')
                ->join('riders', 'orders.assigned_to', '=', 'riders.id')
                ->where('invoices.status', 'created')
                ->where('orders.type', 'delivery')
                ->when($from, fn ($q) => $q->whereDate('invoices.created_at', '>=', $from))
                ->when($to, fn ($q) => $q->whereDate('invoices.created_at', '<=', $to))
                ->when($riderId, fn ($q) => $q->where('orders.assigned_to', $riderId));

            $query = $this->joinInvoiceOrderItems($base)
                ->join('products', 'order_items.product_id', '=', 'products.id')
                ->where('products.name', 'Delivery')
                ->select(
                    'riders.id',
                    'riders.name',
                    DB::raw('SUM(order_items.price * order_items.quantity) as total_delivery_fees'),
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
        $query = Invoice::where('discount_value', '>', 0)
            ->where('status', 'created')
            ->with('order:id,type')
            ->select('id', 'order_id', 'created_at', 'subtotal', 'discount_type', 'discount_value', 'discount_amount', 'discount_reason')
            ->orderBy('created_at', 'desc');

        if ($request->filled('from')) {
            $query->whereDate('created_at', '>=', $request->from);
        }
        if ($request->filled('to')) {
            $query->whereDate('created_at', '<=', $request->to);
        }

        if ($request->filled('type')) {
            $query->whereHas('order', function ($q) use ($request) {
                $q->where('type', $request->type);
            });
        }

        $invoices = $query->get();

        $results = $invoices->map(function ($invoice) {
            if ($invoice->discount_amount !== null && (float) $invoice->discount_amount > 0) {
                $discountAmount = (float) $invoice->discount_amount;
            } elseif ($invoice->discount_type === 'percent') {
                $discountAmount = ((float) $invoice->subtotal * (float) $invoice->discount_value) / 100;
            } else {
                $discountAmount = (float) $invoice->discount_value;
            }

            return [
                'id' => $invoice->order_id,
                'created_at' => $invoice->created_at,
                'order_type' => $invoice->order ? $invoice->order->type : 'N/A',
                'discount_amount' => $discountAmount,
                'discount_reason' => $invoice->discount_reason,
            ];
        });

        return response()->json($results);
    }
}

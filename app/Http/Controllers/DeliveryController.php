<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Order;
use App\Models\Product;
use App\Models\Riders;
use App\Services\OrderCalculationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class DeliveryController extends Controller
{
    public function __construct(
        protected OrderCalculationService $calculationService
    ) {}

    public function index()
    {
        $riders = Riders::where('status', 'active')
            ->orderBy('name')
            ->get(['id', 'name', 'status']);
        $ridersById = $riders->keyBy('id');

        $rawOrders = Order::with(['orderItems.product', 'invoice', 'customer', 'rider'])
            ->where('type', 'delivery')
            ->whereNotIn('status', ['entregada', 'cancelada'])
            ->orderBy('created_at', 'desc')
            ->get();

        // Respaldo para órdenes históricas sin customer_id: cargar únicamente los clientes que coincidan en teléfono o nombre
        $missingCustomerOrders = $rawOrders->filter(fn ($o) => !$o->customer);
        $phones = $missingCustomerOrders->pluck('customer_phone')->filter()->unique()->values()->all();
        $names = $missingCustomerOrders->pluck('customer_name')->filter()->unique()->values()->all();

        $fallbackCustomers = collect();
        if (!empty($phones) || !empty($names)) {
            $fallbackCustomers = Customer::query()
                ->when(!empty($phones), fn ($q) => $q->whereIn('phone', $phones))
                ->when(!empty($names), function ($q) use ($names, $phones) {
                    return !empty($phones)
                        ? $q->orWhereIn('name', $names)
                        : $q->whereIn('name', $names);
                })
                ->get();
        }

        $customersByPhone = $fallbackCustomers->filter(fn ($c) => !empty($c->phone))->keyBy('phone');
        $customersByName = $fallbackCustomers->filter(fn ($c) => !empty($c->name))->keyBy('name');

        $orders = $rawOrders->map(function ($order) use ($customersByPhone, $customersByName, $ridersById) {
            $invoice = $order->invoice;
            $matchedCustomer = $order->customer;

            if (!$matchedCustomer) {
                if ($order->customer_phone && $customersByPhone->has($order->customer_phone)) {
                    $matchedCustomer = $customersByPhone->get($order->customer_phone);
                } elseif ($order->customer_name && $customersByName->has($order->customer_name)) {
                    $matchedCustomer = $customersByName->get($order->customer_name);
                }
            }

            $fiscalName = $invoice->fiscal_name ?? ($matchedCustomer->fiscal_name ?? null);
            $fiscalRuc  = $invoice->fiscal_ruc ?? ($matchedCustomer->fiscal_ruc ?? null);

            $itemsSubtotal = (float) $order->orderItems->reduce(function ($carry, $it) {
                return $carry + ((float) $it->price * (int) $it->quantity);
            }, 0.0);

            $discountAmount = $this->calculationService->calculateDiscount(
                $itemsSubtotal,
                $order->discount_type,
                $order->discount_value
            );

            $riderName = optional($order->rider)->name
                ?? optional($ridersById->get($order->assigned_to))->name;

            return [
                'id' => $order->id,
                'customer_id' => $order->customer_id ?? optional($matchedCustomer)->id,
                'customer_name' => $order->customer_name,
                'customer_phone' => $order->customer_phone,
                'fiscal_name' => $fiscalName,
                'fiscal_ruc' => $fiscalRuc,
                'delivery_address' => $order->delivery_address,
                'assigned_to' => $order->assigned_to,
                'rider_name' => $riderName,
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
                        'is_active' => optional($item->product)->is_active ?? true,
                    ];
                }),
            ];
        });

        $products = Product::where('is_active', true)->orderBy('name')->get();

        return Inertia::render('Delivery/index', [
            'orders' => $orders,
            'products' => $products,
            'riders' => $riders,
        ]);
    }

    /**
     * Actualiza solo el estado de una orden delivery (llamado vía axios.put)
     */
    public function updateStatus(Request $request, Order $order)
    {
        $allowedStatuses = ['asignada', 'en_camino', 'entregada'];

        $data = $request->validate([
            'status' => ['required', 'string', Rule::in($allowedStatuses)],
        ]);

        $transitions = [
            'abierta'   => ['asignada'],
            'asignada'  => ['en_camino'],
            'en_camino' => ['entregada'],
            'entregada' => [],
        ];

        $current = $order->status;

        if (!isset($transitions[$current]) || !in_array($data['status'], $transitions[$current], true)) {
            return response()->json(['message' => 'Transición de estado no permitida'], 422);
        }

        $order->status = $data['status'];
        $order->save();

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
            $order->assigned_to = $data['rider_id'] ?? null;

            if ($order->status !== 'entregada') {
                $order->status = 'asignada';
            }

            $order->save();
        });

        $order->load(['orderItems.product']);

        return response()->json([
            'message' => 'Rider asignado correctamente',
            'order' => $order,
        ]);
    }

    public function show(Order $order)
    {
        $order->load(['orderItems.product', 'invoice', 'customer', 'rider']);

        $customer = $order->customer;
        if (!$customer && !empty($order->customer_phone)) {
            $customer = Customer::where('phone', $order->customer_phone)->first();
        }

        $itemsSubtotal = (float) $order->orderItems->reduce(function ($carry, $it) {
            return $carry + ((float) $it->price * (int) $it->quantity);
        }, 0.0);

        $discountAmount = $this->calculationService->calculateDiscount(
            $itemsSubtotal,
            $order->discount_type,
            $order->discount_value
        );

        $rider = $order->rider ?? ($order->assigned_to ? Riders::find($order->assigned_to) : null);

        $fiscal_name = $order->invoice->fiscal_name ?? ($order->fiscal_name ?? ($customer->fiscal_name ?? null));
        $fiscal_ruc  = $order->invoice->fiscal_ruc  ?? ($order->fiscal_ruc  ?? ($customer->fiscal_ruc  ?? null));

        return response()->json([
            'order' => [
                'id' => $order->id,
                'customer_id' => $order->customer_id ?? optional($customer)->id,
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
                        'is_active' => optional($item->product)->is_active ?? true,
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
            $order->status = 'cancelada';
            $order->save();

            if ($order->invoice) {
                $invoice = $order->invoice;
                $invoice->status = 'cancelled';
                $invoice->save();
            }
        });

        return response()->json(['message' => 'La orden y su factura han sido canceladas.']);
    }
}

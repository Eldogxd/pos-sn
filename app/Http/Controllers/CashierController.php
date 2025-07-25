<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Table;
use App\Models\Order;
use Inertia\Inertia;

class CashierController extends Controller
{
    public function index()
    {
        $tables = Table::with('activeOrder.orderItems.product')->get();

        $products = Product::all();
        $orders = Order::all();

        return Inertia::render('Cashier/Index', [
            'products'=> $products,
            'tables'=> $tables,
            'orders'=> $orders,
            'csrf_token' => csrf_token(),
            ]);

    }
}

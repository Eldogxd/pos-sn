<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Table;
use Inertia\Inertia;

class CashierController extends Controller
{
    public function index()
    {
        $tables = Table::with('activeOrder.orderItems.product')->get();
        $products = Product::where('is_active', true)->get();

        // Comparte los flashes con Inertia
        if (session()->has('order_id')) {
            Inertia::share('flash.order_id', session('order_id'));
        }

        if (session()->has('success')) {
            Inertia::share('flash.success', session('success'));
        }

        return Inertia::render('Cashier/Index', [
            'products' => $products,
            'tables' => $tables,
            'csrf_token' => csrf_token(),
        ]);
    }
}

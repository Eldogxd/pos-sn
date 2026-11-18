<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
        ]);
    }

    


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'category' => 'required|string|max:255',
            'is_py' => 'nullable|boolean',
            'py_price' => 'nullable|numeric',
            'is_active' => 'nullable|boolean',
        ]);

        Product::create([
            'name' => $request->name,
            'price' => $request->price,
            'category' => $request->category,
            'is_py' => $request->boolean('is_py'),
            'py_price' => $request->py_price,
            'is_active' => $request->boolean('is_active', true),
        ]);

        return redirect()->back();
    }
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'nullable|string|max:255',
            'price' => 'nullable|numeric',
            'category' => 'nullable|string|max:255',
            'is_py' => 'nullable|boolean',
            'py_price' => 'nullable|numeric',
            'is_active' => 'nullable|boolean',
        ]);

        $product->update($request->only('name', 'price', 'category', 'is_py', 'py_price', 'is_active'));

        return redirect()->back();
    }

    public function toggleActive(Product $product)
    {
        $product->update([
            'is_active' => ! $product->is_active,
        ]);

        return redirect()->back();
    }

    public function destroy(Product $product)
    {
        if ($product->is_generic) {
            return redirect()->back()->withErrors(['error' => 'No se puede eliminar un producto genérico.']);
        }
        $product->delete();
        return redirect()->back();
    }
}


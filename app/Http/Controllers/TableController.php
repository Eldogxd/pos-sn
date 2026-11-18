<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Table;

class TableController extends Controller
{
    public function index()
    {
        $tables = Table::all();
        return Inertia::render('Admin/Tables/Index', [
            'tables' => $tables,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'number' => 'required|string|max:50',
            'status' => 'required|in:libre,ocupada,Libre,Ocupada',
        ]);

        Table::create([
            'number' => $request->number,
            'status' => strtolower($request->status),
        ]);

        return redirect()->back();
    }

    public function update(Request $request, Table $table)
    {
        $request->validate([
            'number' => 'nullable|string|max:50',
            'status' => 'nullable|in:libre,ocupada,Libre,Ocupada',
        ]);

        $data = array_filter([
            'number' => $request->number,
            'status' => $request->filled('status') ? strtolower($request->status) : null,
        ], fn ($v) => !is_null($v));

        $table->update($data);
        return redirect()->back();
    }

    public function destroy(Table $table)
    {
        $table->delete();
        return redirect()->back();
    }
}

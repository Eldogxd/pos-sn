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



    public function create()
    {
        // Logic to show form for creating a new table
    }

    public function store(Request $request)
    {
        $request->validate([
            'number' => 'required|integer',
            'status' => 'required|in:Libre,Ocupada',
        ]);

        Table::create([
            'number' => $request->number,
            'status' => $request->status,
        ]);

        return redirect()->back();
    }
    
    public function update(Request $request, Table $table)
    {
        $request->validate([
            'number' => 'nullable|integer',
            'status' => 'nullable|in:Libre,Ocupada',
        ]);

        $table->update($request->only('number', 'status'));
        return redirect()->back();
    }

    public function destroy(Table $table)
    {
        $table->delete();
        return redirect()->back();
    }
   
}

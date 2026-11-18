<?php

namespace App\Http\Controllers;

use App\Models\Riders;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RiderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $riders = Riders::orderByDesc('created_at')->get();
        return Inertia::render('Admin/Riders/Index', [
            'riders' => $riders,
        ]);
    }

    /**
     * Store a newly created rider.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'status' => ['required', 'in:active,inactive'],
        ]);

        Riders::create($validated);

        return redirect()->route('riders.index')->with('success', 'Motorizado creado correctamente.');
    }

    /**
     * Update the specified rider.
     */
    public function update(Request $request, Riders $rider)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'status' => ['required', 'in:active,inactive'],
        ]);

        $rider->update($validated);

        return redirect()->route('riders.index')->with('success', 'Motorizado actualizado.');
    }

    /**
     * Remove the specified rider.
     */
    public function destroy(Riders $rider)
    {
        $rider->delete();
        return redirect()->route('riders.index')->with('success', 'Motorizado eliminado.');
    }
}

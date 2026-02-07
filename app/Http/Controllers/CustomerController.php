<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $filter = $request->input('filter', 'any');

        $query = Customer::with('addresses');

        if ($search) {
            if ($filter === 'any') {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('fiscal_ruc', 'like', "%{$search}%")
                      ->orWhere('phone', 'like', "%{$search}%");
                });
            } else {
                $allowed = ['name', 'fiscal_ruc', 'phone'];
                if (in_array($filter, $allowed)) {
                    $query->where($filter, 'like', "%{$search}%");
                }
            }
        }

        $customers = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Delivery/customers/index', [
            'customers' => $customers,
            'filters' => $request->only(['search', 'filter']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'fiscal_name' => 'nullable|string|max:255',
            'fiscal_ruc' => 'nullable| string|max:20|unique:customers,fiscal_ruc',
            'addresses' => 'required|array|min:1',
            'addresses.*' => 'required|string|max:255',
        ]);

        DB::transaction(function () use ($validated) {
            $customer = Customer::create([
                'name' => $validated['name'],
                'phone' => $validated['phone'],
                'fiscal_name' => $validated['fiscal_name'],
                'fiscal_ruc' => $validated['fiscal_ruc'],
            ]);

            foreach ($validated['addresses'] as $address) {
                $customer->addresses()->create(['address' => $address]);
            }
        });

        return back()->with('success', 'Cliente creado.');
    }

    public function update(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'fiscal_name' => 'nullable|string|max:255',
            'fiscal_ruc' => ['nullable', 'string', 'max:20', Rule::unique('customers')->ignore($customer->id)],
            'addresses' => 'required|array|min:1',
            'addresses.*' => 'required|string|max:255',
        ]);

        DB::transaction(function () use ($validated, $customer) {
            $customer->update([
                'name' => $validated['name'],
                'phone' => $validated['phone'],
                'fiscal_name' => $validated['fiscal_name'],
                'fiscal_ruc' => $validated['fiscal_ruc'],
            ]);

            $customer->addresses()->delete();
            foreach ($validated['addresses'] as $address) {
                $customer->addresses()->create(['address' => $address]);
            }
        });

        return Redirect::back()->with('success', 'Cliente actualizado.');
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();
        return Redirect::back()->with('success', 'Cliente eliminado.');
    }

    public function search(Request $request)
    {
        $term = $request->input('term');
        $customers = Customer::search($term)
            ->select('id', 'name', 'phone', 'fiscal_name', 'fiscal_ruc')
            ->with('addresses')
            ->get();

        return response()->json($customers);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    public function store (Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'role' => 'required|string|in:cajero,admin,cocina,delivery', 
        ]);

        User::create([
            'name'=> $request->name,
            'email'=> $request->email,
            'password'=> Hash::make($request->password),
            'role'=> $request->role,
        ]);

        return redirect()->back();
    }

    public function update (Request $request, User $user)
    {
        $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6|confirmed',
            'role' => 'required|string|in:cajero,admin,cocina,delivery', 
        ]);
      $data = $request->only('name','email','role');

      if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return redirect()->back();
    }

    public function destroy(Request $request, User $user)
    {
        if ($request->user() && $request->user()->id === $user->id) {
            return redirect()->back()->withErrors(['error' => 'No puedes eliminar tu propio usuario en sesión.']);
        }

        $user->delete();
        return redirect()->back();
    }
}

<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\Rolemiddleware;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Models\User;
use App\Http\Controllers\ProductController;
use App\Models\Table;
use App\Http\Controllers\TableController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CashierController;
use App\Http\Controllers\InvoiceController;


Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});




// Rutas para el Administrador
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/Admin', function () {
        return Inertia::render('Admin/Dashboard');
    });
    
    //rutas de usuarios
    Route::get('/usuarios', [UserController::class, 'index'])->name('usuarios.index');
    Route::post('/usuarios', [UserController::class, 'store'])->name('usuarios.store');
    Route::put('/usuarios/{user}', [UserController::class, 'update'])->name('usuarios.update');
    Route::delete('/usuarios/{user}', [UserController::class, 'destroy'])->name('usuarios.destroy');


    //rutas de productos
    Route::get('/productos', [ProductController::class, 'index'])->name('productos.index');
    Route::post('/productos', [ProductController::class, 'store'])->name('productos.store');
    Route::put('/productos/{product}', [ProductController::class, 'update'])->name('productos.update');
    Route::delete('/productos/{product}', [ProductController::class, 'destroy'])->name('productos.destroy');


    //rutas de mesas
    Route::get('/mesas', [TableController::class,'index'])->name('mesas.index');
    Route::post('/mesas', [TableController::class,'store'])->name('mesas.store');
    Route::put('/mesas/{table}', [TableController::class,'update'])->name('mesas.update');
    Route::delete('/mesas/{table}', [TableController::class,'destroy'])->name('mesas.destroy');



});



Route::get('/Cashier', [CashierController::class, 'index'])->name('cashier.index');

Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
Route::put('/orders/{order}', [OrderController::class, 'update'])->name('orders.update');
Route::post('/orders/{order}/discount', [OrderController::class, 'UpdateDiscount'])->name('orders.updateDiscount');
Route::post('/orders/{order}/remove-discount', [OrderController::class, 'removeDiscount'])->name('orders.removeDiscount');
Route::get('/orders/{id}/pdf', [OrderController::class, 'generateInvoiceAndClose'])->name('orders.generate-pdf-and-close');
Route::get('/orders/{id}/partial', [OrderController::class, 'generatePartialInvoice'])->name('orders.generate-partial-invoice');
Route::post('/orders/cancel', [OrderController::class, 'cancel'])->name('orders.cancel');
Route::get('/next-invoice-number', [InvoiceController::class, 'getNextInvoiceNumber']);
Route::post('/partial-invoices', [InvoiceController::class, 'store']);
Route::post('/invoices/Final', [InvoiceController::class, 'storeFinal']);











// Route::get('/Kitchen', function () {
//     return Inertia::render('Kitchen/index');
// });

Route::get('/Delivery', function () {
    return Inertia::render('Delivery/index');
});

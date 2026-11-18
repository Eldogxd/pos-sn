<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TableController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CashierController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\DeliveryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\RiderController;
use App\Http\Controllers\Admin\DashboardController;

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
    Route::get('/Admin', [DashboardController::class, 'index'])->name('admin.index');

    // rutas de usuarios
    Route::get('/usuarios', [UserController::class, 'index'])->name('usuarios.index');
    Route::post('/usuarios', [UserController::class, 'store'])->name('usuarios.store');
    Route::put('/usuarios/{user}', [UserController::class, 'update'])->name('usuarios.update');
    Route::delete('/usuarios/{user}', [UserController::class, 'destroy'])->name('usuarios.destroy');

    // rutas de productos
    Route::get('/productos', [ProductController::class, 'index'])->name('productos.index');
    Route::post('/productos', [ProductController::class, 'store'])->name('productos.store');
    Route::put('/productos/{product}', [ProductController::class, 'update'])->name('productos.update');
    Route::patch('/productos/{product}/toggle-active', [ProductController::class, 'toggleActive'])->name('productos.toggleActive');
    Route::delete('/productos/{product}', [ProductController::class, 'destroy'])->name('productos.destroy');

    // rutas de mesas
    Route::get('/mesas', [TableController::class, 'index'])->name('mesas.index');
    Route::post('/mesas', [TableController::class, 'store'])->name('mesas.store');
    Route::put('/mesas/{table}', [TableController::class, 'update'])->name('mesas.update');
    Route::delete('/mesas/{table}', [TableController::class, 'destroy'])->name('mesas.destroy');

    // rutas de motorizados
    Route::get('/riders', [RiderController::class, 'index'])->name('riders.index');
    Route::post('/riders', [RiderController::class, 'store'])->name('riders.store');
    Route::put('/riders/{rider}', [RiderController::class, 'update'])->name('riders.update');
    Route::delete('/riders/{rider}', [RiderController::class, 'destroy'])->name('riders.destroy');

    Route::post('/invoices/{invoice}/annul', [InvoiceController::class, 'annul'])->name('invoices.annul');

    Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard.index');
    Route::get('/admin/dashboard/data', [DashboardController::class, 'data'])->name('admin.dashboard.data');
    Route::get('/admin/dashboard/rider-products', [DashboardController::class, 'riderProducts'])->name('admin.dashboard.rider-products');
    Route::get('/admin/dashboard/discounted-orders', [DashboardController::class, 'getDiscountedOrders'])->name('admin.dashboard.discounted-orders');
    Route::get('/admin/dashboard/rider-delivery-fees', [DashboardController::class, 'getRiderDeliveryFees'])->name('admin.dashboard.rider-delivery-fees');
});

// Rutas compartidas para consulta de correlativo e historial de facturas (Caja, Delivery y Admin)
Route::middleware(['auth', 'role:cajero,delivery,admin'])->group(function () {
    Route::get('/invoices', [InvoiceController::class, 'index'])->name('invoices.index');
    Route::get('/next-invoice-number', [InvoiceController::class, 'getNextInvoiceNumber'])->name('invoices.next-number');
});

// Rutas para el Cajero
Route::middleware(['auth', 'role:cajero,admin'])->group(function () {
    Route::get('/Cashier', [CashierController::class, 'index'])->name('cashier.index');

    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
    Route::put('/orders/{order}', [OrderController::class, 'update'])->name('orders.update');
    Route::post('/orders/{order}/discount', [OrderController::class, 'UpdateDiscount'])->name('orders.updateDiscount');
    Route::post('/orders/{order}/remove-discount', [OrderController::class, 'removeDiscount'])->name('orders.removeDiscount');
    Route::get('/orders/{id}/pdf', [OrderController::class, 'generateInvoiceAndClose'])->name('orders.generate-pdf-and-close');
    Route::post('/orders/cancel', [OrderController::class, 'cancel'])->name('orders.cancel');
    Route::post('/partial-invoices', [InvoiceController::class, 'store'])->name('invoices.partial.store');
    Route::post('/invoices/Final', [InvoiceController::class, 'storeFinal'])->name('invoices.final.store');
    Route::post('/invoices/takeaway', [InvoiceController::class, 'takeAwayInvoice'])->name('invoices.takeAway');
    Route::post('/invoices/pedidosya', [InvoiceController::class, 'pedidosYaInvoice'])->name('invoices.pedidosYa');
    Route::post('/orders/{order}/transferTable', [OrderController::class, 'transferTable'])->name('orders.transfertable');
    Route::post('/takeaway-orders', [OrderController::class, 'storeTakeAwayOrder'])->name('orders.storeTakeAway');
    Route::post('/pedidosya-orders', [OrderController::class, 'storePedidosYaOrder'])->name('orders.storePedidosYa');
});

// Delivery Routes
Route::middleware(['auth', 'role:delivery,admin'])->group(function () {
    Route::get('/delivery', [DeliveryController::class, 'index'])->name('delivery.index');
    Route::get('/delivery/{order}', [DeliveryController::class, 'show'])->name('delivery.show');
    Route::post('/delivery', [OrderController::class, 'storeDeliveryOrder'])->name('delivery.store');
    Route::put('/delivery/{order}', [OrderController::class, 'updateDeliveryOrder'])->name('delivery.update');
    Route::get('/customers', [CustomerController::class, 'index'])->name('customers.index');
    Route::post('/customers', [CustomerController::class, 'store'])->name('customers.store');
    Route::put('/customers/{customer}', [CustomerController::class, 'update'])->name('customers.update');
    Route::delete('/customers/{customer}', [CustomerController::class, 'destroy'])->name('customers.destroy');
    Route::get('/search-customers', [CustomerController::class, 'search'])->name('customers.search');
    Route::put('/delivery/{order}/assign-rider', [DeliveryController::class, 'assignRider'])->name('delivery.assignRider');
    Route::put('/delivery/{order}/status', [DeliveryController::class, 'updateStatus'])->name('delivery.updateStatus');
    Route::post('/invoices/delivery', [InvoiceController::class, 'deliveryInvoice'])->name('invoices.delivery.store');
    Route::post('/delivery/{order}/cancel', [DeliveryController::class, 'cancel'])->name('delivery.cancel');
});

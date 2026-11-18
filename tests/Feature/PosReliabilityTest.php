<?php

namespace Tests\Feature;

use App\Models\Invoice;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Table;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PosReliabilityTest extends TestCase
{
    use RefreshDatabase;

    private function createCashierUser(): User
    {
        return User::factory()->create([
            'role' => 'cajero',
        ]);
    }

    public function test_partial_and_final_invoices_recalculate_totals_server_side_and_free_table(): void
    {
        $user = $this->createCashierUser();
        $table = Table::create(['number' => '1', 'status' => 'ocupada']);
        $product = Product::create([
            'name' => 'Sopa de Res',
            'category' => 'Sopas',
            'price' => 150.00,
            'is_active' => true,
        ]);

        $order = Order::create([
            'table_id' => $table->id,
            'type' => 'mesa',
            'status' => 'abierta',
            'total' => 450.00,
        ]);

        $item = OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $product->id,
            'quantity' => 3,
            'price' => 150.00,
            'payment_status' => 'pending',
        ]);

        // Intentar enviar subtotal/total manipulados desde el cliente: el servidor debe ignorarlos
        $partialResponse = $this->actingAs($user)->postJson('/partial-invoices', [
            'order_id' => $order->id,
            'subtotal' => 1.00,
            'total' => 1.00,
            'items' => [
                [
                    'order_item_id' => $item->id,
                    'pay_quantity' => 1,
                ],
            ],
        ]);

        $partialResponse->assertOk()
            ->assertJson([
                'success' => true,
                'subtotal' => 150.0,
                'discount_amount' => 0.0,
                'total' => 150.0,
            ]);

        $this->assertEquals('abierta', $order->fresh()->status);
        $this->assertEquals('ocupada', $table->fresh()->status);

        // Factura final por los 2 ítems pendientes restantes (300.00) con 10% descuento -> 270.00
        $finalResponse = $this->actingAs($user)->postJson('/invoices/Final', [
            'order_id' => $order->id,
            'subtotal' => 5.00,
            'discount_type' => 'percent',
            'discount_value' => 10,
            'total' => 5.00,
        ]);

        $finalResponse->assertOk()
            ->assertJson([
                'success' => true,
                'invoice' => [
                    'subtotal' => 300.0,
                    'discount_amount' => 30.0,
                    'total' => 270.0,
                ],
            ]);

        $this->assertEquals('cerrada', $order->fresh()->status);
        $this->assertEquals('libre', $table->fresh()->status);
        $this->assertEquals(0, OrderItem::where('order_id', $order->id)->where('payment_status', 'pending')->count());
    }

    public function test_takeaway_invoice_prevents_double_invoicing_and_resolves_duplicate_number(): void
    {
        $user = $this->createCashierUser();
        $product = Product::create([
            'name' => 'Gaseosa',
            'category' => 'Bebidas',
            'price' => 45.00,
            'is_active' => true,
        ]);

        $order = Order::create([
            'type' => 'llevar',
            'status' => 'abierta',
            'total' => 90.00,
        ]);

        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $product->id,
            'quantity' => 2,
            'price' => 45.00,
            'payment_status' => 'pending',
        ]);

        Invoice::create([
            'invoice_number' => 'FAC-000001',
            'order_id' => $order->id,
            'subtotal' => 0,
            'total' => 0,
        ]);

        // Enviar número ya ocupado ('FAC-000001') y total manipulado (10)
        $response = $this->actingAs($user)->postJson('/invoices/takeaway', [
            'invoice_number' => 'FAC-000001',
            'order_id' => $order->id,
            'subtotal' => 10,
            'total' => 10,
        ]);

        $response->assertOk()
            ->assertJson([
                'success' => true,
                'invoice_number' => 'FAC-000002',
                'invoice' => [
                    'subtotal' => 90.0,
                    'total' => 90.0,
                ],
            ]);

        // Segundo intento sobre la misma orden debe ser rechazado con 422
        $duplicateAttempt = $this->actingAs($user)->postJson('/invoices/takeaway', [
            'order_id' => $order->id,
            'subtotal' => 90,
            'total' => 90,
        ]);

        $duplicateAttempt->assertStatus(422);
    }

    public function test_inactive_product_cannot_be_added_or_increased_in_existing_order(): void
    {
        $user = $this->createCashierUser();
        $table = Table::create(['number' => '2', 'status' => 'ocupada']);
        $seasonal = Product::create([
            'name' => 'Sopa de Cuaresma',
            'category' => 'Sopas',
            'price' => 180.00,
            'is_active' => true,
        ]);

        $order = Order::create([
            'table_id' => $table->id,
            'type' => 'mesa',
            'status' => 'abierta',
            'total' => 360.00,
        ]);

        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $seasonal->id,
            'quantity' => 2,
            'price' => 180.00,
            'payment_status' => 'pending',
        ]);

        // Desactivar producto de temporada después de creada la orden
        $seasonal->update(['is_active' => false]);

        // Intentar aumentar cantidad de 2 -> 3 debe fallar validación
        $increaseResponse = $this->actingAs($user)->put("/orders/{$order->id}", [
            'table_id' => $table->id,
            'products' => [
                ['id' => $seasonal->id, 'quantity' => 3, 'price' => 180.00],
            ],
        ]);
        $increaseResponse->assertSessionHasErrors('products');

        // Disminuir de 2 -> 1 sí debe permitirse
        $decreaseResponse = $this->actingAs($user)->put("/orders/{$order->id}", [
            'table_id' => $table->id,
            'products' => [
                ['id' => $seasonal->id, 'quantity' => 1, 'price' => 180.00],
            ],
        ]);
        $decreaseResponse->assertSessionHasNoErrors();
        $this->assertEquals(180.00, (float) $order->fresh()->total);
    }

    public function test_transfer_table_rejects_occupied_destination(): void
    {
        $user = $this->createCashierUser();
        $tableA = Table::create(['number' => '1', 'status' => 'ocupada']);
        $tableB = Table::create(['number' => '2', 'status' => 'ocupada']);

        $order = Order::create([
            'table_id' => $tableA->id,
            'type' => 'mesa',
            'status' => 'abierta',
            'total' => 100.00,
        ]);

        $response = $this->actingAs($user)->post("/orders/{$order->id}/transferTable", [
            'new_table_id' => $tableB->id,
        ]);

        $response->assertSessionHasErrors('new_table_id');
        $this->assertEquals($tableA->id, $order->fresh()->table_id);
    }
}

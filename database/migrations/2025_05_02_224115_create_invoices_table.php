<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->string('invoice_number')->unique(); // FAC-000001
            $table->string('fiscal_name')->nullable();  // Nombre legal
            $table->string('fiscal_ruc')->nullable();   // RUC / NIT
            $table->decimal('subtotal', 10, 2);
            $table->string('discount_type')->nullable(); // 'amount' o 'percent'
            $table->decimal('discount_value', 10, 2)->default(0)->nullable(); // Monto o porcentaje
            $table->string('discount_reason')->nullable(); // Razón del descuento
            $table->decimal('total', 10, 2); // Total después del descuento
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};

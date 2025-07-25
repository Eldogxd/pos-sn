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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('table_id')->nullable()->constrained()->onDelete('set null');
            $table->string('type');
            $table->string('customer_name')->nullable();
            $table->enum('status',['abierta','cerrada','cancelada'])->default('abierta');
            $table->text('indications')->nullable();
            $table->string('discount_type', 10)->nullable(); // 'amount' o 'percent'
            $table->decimal('discount_value', 10, 2)->nullable();
            $table->text('discount_reason')->nullable();
            $table->decimal('total', 10, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};

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
        Schema::table('orders', function (Blueprint $table) {
            $table->enum('payment_method', ['card', 'cash', 'bank_transfer'] )->nullable()-> after('discount_reason')->default('cash');
            $table->decimal('cash_amount', 10, 2)->nullable()->after('payment_method');
            $table->text('delivery_notes')->nullable()->after('cash_amount');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['payment_method', 'cash_amount', 'delivery_notes']);
        });
    }
};

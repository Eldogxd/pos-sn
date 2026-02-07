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
             $table->string('customer_phone', 20)->nullable()->after('customer_name');
             $table->text('delivery_address')->nullable()->after('customer_phone');
             $table->unsignedBigInteger('assigned_to')->nullable()->after('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('customer_phone');
            $table->dropColumn('delivery_address');
            $table->dropColumn('assigned_to');
        });
    }
};

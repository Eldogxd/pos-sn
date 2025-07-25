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
        schema::table('order_items', function (Blueprint $table) {
            $table->string('payment_status')->default('pending')->after('price'); // Adding the payment_status column with default value 'pending'
            $table->integer('invoice_id')->nullable()->after('payment_status'); // Adding the invoice_id column to link to the invoice
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

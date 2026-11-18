<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('tables')) {
            Schema::table('tables', function (Blueprint $table) {
                $table->string('status', 30)->default('libre')->change();
            });
            DB::table('tables')->update([
                'status' => DB::raw('LOWER(status)'),
            ]);
        }

        if (Schema::hasTable('orders') && !Schema::hasColumn('orders', 'customer_id')) {
            Schema::table('orders', function (Blueprint $table) {
                $table->foreignId('customer_id')
                    ->nullable()
                    ->after('table_id')
                    ->constrained('customers')
                    ->nullOnDelete();
            });
        }

        if (Schema::hasTable('invoices') && !Schema::hasColumn('invoices', 'discount_amount')) {
            Schema::table('invoices', function (Blueprint $table) {
                $table->decimal('discount_amount', 10, 2)->default(0)->nullable()->after('discount_reason');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('invoices') && Schema::hasColumn('invoices', 'discount_amount')) {
            Schema::table('invoices', function (Blueprint $table) {
                $table->dropColumn('discount_amount');
            });
        }

        if (Schema::hasTable('orders') && Schema::hasColumn('orders', 'customer_id')) {
            Schema::table('orders', function (Blueprint $table) {
                $table->dropConstrainedForeignId('customer_id');
            });
        }
    }
};

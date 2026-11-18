<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Invoice extends Model
{
    protected $fillable = [
        'order_id',
        'invoice_number',
        'fiscal_name',
        'fiscal_ruc',
        'subtotal',
        'discount_type',
        'discount_value',
        'discount_reason',
        'discount_amount',
        'total',
        'status',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'invoice_id');
    }

    public static function generateInvoiceNumber(): string
    {
        $generateLogic = function () {
            $lastInvoice = self::lockForUpdate()
                ->whereNotNull('invoice_number')
                ->orderByDesc('id')
                ->first();

            if ($lastInvoice && preg_match('/(\d+)/', $lastInvoice->invoice_number, $matches)) {
                $newNumber = ((int) $matches[1]) + 1;
            } else {
                $newNumber = 1;
            }

            return 'FAC-' . str_pad((string) $newNumber, 6, '0', STR_PAD_LEFT);
        };

        if (DB::transactionLevel() > 0) {
            return $generateLogic();
        }

        return DB::transaction($generateLogic);
    }
}

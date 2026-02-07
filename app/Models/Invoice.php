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
        'total',
        'status',
    ];

    public function order()
{
    return $this->belongsTo(Order::class);
}


public static function generateInvoiceNumber()
{
    return DB::transaction(function () {
        $lastInvoice = self::lockForUpdate()
                          ->whereNotNull('invoice_number')
                          ->orderByDesc('id')
                          ->first();

        if ($lastInvoice) {
            preg_match('/\d+/', $lastInvoice->invoice_number, $matches);
            $lastNumber = (int)$matches[0];
            $newNumber = $lastNumber + 1;
        } else {
            $newNumber = 1;
        }

        return 'FAC-' . str_pad($newNumber, 6, '0', STR_PAD_LEFT);
    });
}


}
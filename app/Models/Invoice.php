<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
    ];

    public function order()
{
    return $this->belongsTo(Order::class);
}
public static function generateInvoiceNumber()
{
    // Bloquear consulta para evitar problemas en concurrencia
    $lastInvoice = self::lockForUpdate()
                      ->whereNotNull('invoice_number')
                      ->orderByDesc('id')
                      ->first();

    if ($lastInvoice) {
        // Extraer solo el número del código actual (ej: FAC-000005 -> 5)
        preg_match('/\d+/', $lastInvoice->invoice_number, $matches);
        $lastNumber = (int)$matches[0];
        $newNumber = $lastNumber + 1;
    } else {
        // Si no hay facturas aún, comenzar desde 1
        $newNumber = 1;
    }

    return 'FAC-' . str_pad($newNumber, 6, '0', STR_PAD_LEFT);
}

}
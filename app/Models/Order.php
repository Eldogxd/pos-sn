<?php

namespace App\Models;
use App\Models\OrderItem;
use App\Models\Riders;




use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'table_id',
        'type',
        'customer_name',
        'customer_phone',
        'delivery_address',
        'status',
        'assigned_to',
        'indications',
        'discount_type',
        'discount_value',
        'discount_reason',
        'payment_method',
        'cash_amount',
        'delivery_notes',
        'total',
        'external_number',
    ];

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class); 
    }
    
    public function table()
    {
        return $this->belongsTo(Table::class);
    }

    public function invoice()
{
    return $this->hasOne(Invoice::class);
}

    public function rider()
{
    return $this->belongsTo(Riders::class);
}
}
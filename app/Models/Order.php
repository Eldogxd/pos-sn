<?php

namespace App\Models;
use App\Models\OrderItem;


use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'table_id',
        'type',
        'customer_name',
        'status',
        'indications',
        'discount_type',
        'discount_value',
        'discount_reason',
        'total',
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
}

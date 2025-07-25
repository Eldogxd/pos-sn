<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    protected $fillable = [
        'number',
        'status',
    ];

    public function activeOrder()
    {
        return $this->hasOne(Order::class)->where('status', 'abierta');
    }
}

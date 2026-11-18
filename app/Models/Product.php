<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'price',
        'category',
        'is_generic',
        'is_py',
        'py_price',
        'is_active',
    ];

    protected $casts = [
        'is_generic' => 'boolean',
        'is_py' => 'boolean',
        'is_active' => 'boolean',
    ];
}

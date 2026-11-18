<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Riders extends Model
{
    protected $fillable = ['name', 'status'];

    public function orders()
    {
        return $this->hasMany(Order::class, 'assigned_to');
    }
}

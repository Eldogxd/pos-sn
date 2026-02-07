<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Customer extends Model
{
    use HasFactory;
    
    protected $fillable = ['name', 'phone', 'fiscal_name', 'fiscal_ruc'];

    public function addresses()
    {
        return $this->hasMany(CustomerAddress::class);
    }

    public function scopeSearch($query, $term)
    {
        $term = "%{$term}%";
        $query->where(function ($query) use ($term) {
            $query->where('name', 'like', $term)
                  ->orWhere('phone', 'like', $term)
                  ->orWhere('fiscal_ruc', 'like', $term);
        });
    }
}

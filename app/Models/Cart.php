<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'variant_id',
        'quantity',
        'user_id'
    ];

    public function variant()
    {
        return $this->belongsTo(Variant::class);
    }

    public function User()
    {
        return $this->belongsTo(User::class);
    }
}

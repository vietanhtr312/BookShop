<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category_id',
        'original_price',
        'price',
        'sold_quantity',
        'avatar',
        'intro',
        'detail',
        'hot',
        'new',
        'sale',
        'sale_type'
    ];  
    
    public function variants() 
    {   
        return $this->hasMany(Variant::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
} 

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'parent_id'
    ];

    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function childrenId()
    {
        $childrenId = [];
        foreach ($this->children as $child) {
            $childrenId[] = $child->id;
            if ($child->children) {
                foreach ($child->children as $childChild) {
                    $childrenId[] = $childChild->id;
                }
            }
        }
        return $childrenId;
    }
}

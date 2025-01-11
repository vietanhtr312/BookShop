<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
        'id' => $this->id,
        'name' => $this->name,
        'category_id' => $this->category_id,
        'original_price' => $this->original_price,
        'price' => $this->price,
        'sold_quantity' => $this->sold_quantity,
        'avatar' => $this->avatar,
        'intro' => $this->intro ?? "",
        'detail' => $this->detail ?? "",
        'hot' => $this->hot,
        'new' => $this->new,
        'sale' => $this->sale,
        'sale_type' => $this->sale_type,
        'created_at' => $this->created_at,
        'category_name' => $this->category->name ?? null,
        ];
    }


}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VariantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'quantity' => $this->quantity,
            'images' => json_decode($this->images, true),
            'sold_quantity' => $this->sold_quantity,
            'copy_id' => $this->copy_id,
            'product_id' => $this->product_id,
            'created_at' => $this->created_at,
            'copy_name' => $this->copy->name ?? null,
            'copy_code' => $this->copy->code ?? null,
            'product' => new ProductResource($this->product)
        ];
    }
}

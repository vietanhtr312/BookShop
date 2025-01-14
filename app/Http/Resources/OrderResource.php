<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            'user_id' => $this->user_id,
            'user_name' => $this->user_name,
            'status' => $this->status,
            'payment_method' => $this->payment_method,
            'payment_status' => $this->payment_status,
            'shipping_status' => $this->shipping_status,
            'shipping_address' => $this->shipping_address,
            'shipping_phone' => $this->shipping_phone,
            'total_price' => $this->total_price,
            'total_quantity' => $this->total_quantity,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'carts' => CartResource::collection($this->cart)
        ];
    }
}

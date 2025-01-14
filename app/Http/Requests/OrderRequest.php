<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
            'user_id' => 'required|exists:users,id',
            'user_name' => 'required|string',
            'payment_method' => 'required|string',
            'shipping_address' => 'required|string',
            'shipping_phone' => 'required|string',
            'total_price' => 'required|numeric',
            'total_quantity' => 'required|numeric',
            'cart_ids' => 'required|array',
            'cart_ids.*' => 'exists:carts,id'
        ];
    }
}

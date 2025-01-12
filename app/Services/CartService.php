<?php

namespace App\Services;

use App\Http\Resources\CartResource;
use App\Models\Cart;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Hash;

class CartService
{
    public function addToCart(array $data) 
    {
        try {
            $cart = Cart::where('variant_id', $data['variant_id'])
                        ->where('user_id', $data['user_id'])
                        ->where('size', $data['size'])
                        ->first();
            if ($cart) {
                $cart->quantity += $data['quantity'];
            } else {
                $cart = new Cart();
                $cart->fill($data);
            }
            $cart->save();
            return $cart;
        } catch (QueryException $e) {
            throw new \Exception('Lỗi tạo cart: ' . $e->getMessage());
        }
    }

    public function updateCart(Cart $cart, $quantity)
    {
        try {
            if ($quantity === 0) {
                $this->deleteCart($cart->id);
                return null;
            } else {
                $cart->quantity = $quantity;
                $cart->save();
                return $cart;
            }
        } catch (QueryException $e) {
            throw new \Exception('Lỗi update cart: ' . $e->getMessage());
        }
    }

    public function deleteCart($id)
    {
        $cart = Cart::find($id);
        if ($cart) {
            $cart->delete();
            return 'Đã xóa thành công giỏ hàng';
        } 

        return 'Không tìm thấy giỏ hàng';
    }




    public function getCarts($userId)
    {
        $carts = Cart::where('user_id', $userId)->get();
        $total = $carts->sum(function ($cart) {
            $price = floatval($cart->variant->product->price);
            return $cart->quantity * $price;
        });
        $total = strval($total);

        return [
            'carts' => CartResource::collection($carts),
            'count' => $carts->count(),
            'total' => $total
        ];
    }


}
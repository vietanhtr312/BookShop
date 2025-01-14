<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\CartRequest;
use App\Http\Resources\CartResource;
use App\Models\Cart;
use App\Models\Variant;
use App\Services\CartService;
use Illuminate\Http\Request;

class CartController extends Controller
{
    //
    private $cartService;
    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    public function addToCart(CartRequest $request)
    {
        $validatedData = $request->validated();

        $cart = $this->cartService->addToCart($validatedData);

        return response()->json([
            'message' => 'Đã được thêm vào giỏ hàng',
            'cart' => $cart,
        ], 200);
    }

    public function updateCart(Request $request, $id)
    {
        $quantity = $request->input('quantity');
        $cart = Cart::find($id);
        if (!$cart) {
            return response()->json([
                'message' => 'Không tìm thấy giỏ hàng'
            ], 404);
        }
        $updatedCart = $this->cartService->updateCart($cart, $quantity);
        if ($updatedCart === null) {
            return response()->json([
                'message' => 'Giỏ hàng đã bị xóa',
            ], 410);  
        }

        return response()->json([
            'message' => 'Đã cập nhật giỏ hàng',
            'cart' => $updatedCart,
        ], 200);
    }

    public function deleteCart($id)
    {
      $message = $this->cartService->deleteCart($id);

      return response()->json([
        'message' => $message
      ], 200);
    }

    public function deleteCarts(Request $request)
    {
        $userId = $request->query('user_id');
        $message = $this->cartService->deleteCarts($userId);

        return response()->json([
            'message' => $message
        ], 200);
    }






    public function getCarts(Request $request)
    {
        $userId = $request->query('user_id');
        $data = $this->cartService->getCarts($userId);
    
        return response()->json([
            'message' => "Lấy thành công giỏ hàng",
            'data' => $data
        ], 200);
    }

}

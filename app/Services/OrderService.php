<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Cart;
use App\Http\Resources\OrderResource;
use Illuminate\Database\QueryException;

class OrderService
{
    public function createOrder(array $data)
    {
        try {
            $order = new Order();
            $order->fill($data);
            $order->save();
            $cartids = $data['cart_ids'];
            foreach ($cartids as $cartid) {
                $cart = Cart::find($cartid);
                $cart->order_id = $order->id;
                $cart->status = 1;
                $cart->save();
            }
            return $order;
        } catch (QueryException $e) {
            throw new \Exception('Lỗi tạo order: ' . $e->getMessage());
        }
    }

    public function updateOrder(Order $order, array $data)
    {
        try {
            $order->fill($data);
            $order->save();
            return $order;
        } catch (QueryException $e) {
            throw new \Exception('Lỗi cập nhật order: ' . $e->getMessage());
        }
    }

    public function getOrders($perPage)
    {
        $orders = Order::query();
        $orders = $orders->paginate($perPage);
        return [
            'data' => OrderResource::collection($orders),
            'meta' => [
                'current_page' => $orders->currentPage(),
                'last_page' => $orders->lastPage(),
                'total' => $orders->total(),
                'per_page' => $orders->perPage(),
            ],
        ];
    }

    public function getUserOrders($userId)
    {
        $orders = Order::where('user_id', $userId)->get();
        return OrderResource::collection($orders);
    }

    public function getOrderById($id)
    {
        return new OrderResource(Order::find($id));
    }

    public function confirmOrder($id)
    {
        $order = Order::find($id);
        $order->status = 'confirmed';
        $order->shipping_status = 'shipping';
        $order->save();
        return new OrderResource($order);
    }
}

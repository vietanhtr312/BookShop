<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    //
    private $orderService;
    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function createOrder(OrderRequest $request)
    {
        $validatedData = $request->validated();

        $order = $this->orderService->createOrder($validatedData);

        return response()->json([
            'message' => 'Tạo order thành công',
            'order' => $order,
        ], 200);
    }

    public function getOrders()
    {
        $perPage = request()->get('per_page', 10);
        $orders = $this->orderService->getOrders($perPage);

        return response()->json([
            'message' => 'Lấy danh sách order thành công',
            'orders' => $orders,
        ], 200);
    }

    public function getUserOrders() {
        $userId = request()->user_id;
        $orders = $this->orderService->getUserOrders($userId);

        return response()->json([
            'message' => 'Lấy danh sách order thành công',
            'orders' => $orders,
        ], 200);
    }

    public function getOrderById($id)
    {
        $order = $this->orderService->getOrderById($id);

        return response()->json([
            'message' => 'Lấy order thành công',
            'order' => $order,
        ], 200);
    }

    public function confirmOrder($id)
    {
        $order = $this->orderService->confirmOrder($id);

        return response()->json([
            'message' => 'Xác nhận order thành công',
            'order' => $order,
        ], 200);
    }
}

?>
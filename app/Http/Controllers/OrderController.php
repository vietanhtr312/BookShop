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
        $orders = $this->orderService->getOrders();

        return response()->json([
            'message' => 'Lấy danh sách order thành công',
            'orders' => $orders,
        ], 200);
    }
}

?>
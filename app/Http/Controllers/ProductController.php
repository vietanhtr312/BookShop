<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    private $productService;
    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function getProducts(Request $request) {
        $categoryId = $request->query('category_id') ?? null;
        $type = $request->query('type') ?? 'new';
        $variants = $request->query('variants') ?? false;
        $perPage = $request->query('per_page') ?? 10;
        $start = $request->query('start') ?? null;
        $end = $request->query('end') ?? null;
        $products = $this->productService->getProducts( $categoryId, $type, $variants, $perPage, $start, $end);

        
        return response()->json([
            'message' => 'Lấy thành công danh sách sản phẩm',
            'products' => $products
        ], 200);
    }

    public function getProduct(Request $request) {
        $id = $request->query('id');
        $variants = $request->query('variants') ?? false;
        $product = $this->productService->getProduct( $id, $variants );

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json([
            'message' => 'Lấy thành công sản phẩm',
            'product' => $product,
        ], 200);
    }
}

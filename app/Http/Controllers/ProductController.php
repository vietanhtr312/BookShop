<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ProductController extends Controller
{
    private $productService;
    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function createProduct(ProductRequest $request)
    {
        $validatedData = $request->validated();

        $product = $this->productService->createProduct($validatedData);

        return response()->json([
            'message' => 'Sản phẩm đã được tạo thành công!',
            'product' => $product,
        ], 201);
    }

    public function updateProduct(ProductRequest $request, $id)
    {
        $product = Product::find($id);
        try {
            $validatedData = $request->validated();
        } catch (ValidationException $e) {
            return response()->json(['message' => $e->errors()], 422);
        }
        

        $updatedProduct = $this->productService->updateProduct( $product, $validatedData );
        
        return response()->json([
            'message' => 'Đã cập nhật thành công sản phẩm',
            'product' => $updatedProduct
        ], 200);
    }

    public function deleteProduct($id)
    {
      $this->productService->deleteProduct($id);

      return response()->json([
        'message' => 'Đã xóa thành công sản phẩm'
      ], 200);
    }

    public function getProducts(Request $request) {
        $categoryId = $request->query('category_id') ?? null;
        $type = $request->query('type') ?? 'new';
        $variants = $request->query('variants') ?? false;
        $perPage = $request->query('per_page') ?? 10;
        $start = $request->query('start') ?? null;
        $end = $request->query('end') ?? null;
        $name = $request->query('name') ?? null;
        $products = $this->productService->getProducts( $categoryId, $type, $variants, $perPage, $start, $end, $name );

        
        return response()->json([
            'message' => 'Lấy thành công danh sách sản phẩm',
            'products' => $products
        ], 200);
    }

    public function getHomeProducts(Request $request) {
        $products = $this->productService->getHomeProducts();

        return response()->json([
            'message' => 'Lấy thành công danh sách sản phẩm',
            'products' => $products
        ], 200);
    }

    public function getSimilarProducts(Request $request) {
        $id = $request->query('id');
        $products = $this->productService->getSimilarProducts( $id );

        return response()->json([
            'message' => 'Lấy thành công danh sách sản phẩm tương tự',
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

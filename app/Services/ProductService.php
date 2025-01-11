<?php

namespace App\Services;

use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\QueryException;

class ProductService
{
    private $uploadService;

    public function __construct(UploadService $uploadService) 
    {
        $this->uploadService = $uploadService;
    }

    public function createProduct(array $data)
    {   
        $image = null;
        if (isset($data['image_file']) && $data['image_file']) {       
            $image = $this->uploadService->uploadImage($data['image_file']);
        }

        $saleType = null;
        $sale = null;
        if (!$data['sale']) {
            $saleType = 'not';
        } else {
            if ($data['sale_type'] === 'percent') {
                $sale = $data['sale'] . '%';
            } else if ($data['sale_type'] === 'value') {
                $sale = $data['sale'] . 'đ';
            }
        }

        try {
            $product = new Product();
            $product->fill($data);
            $product->avatar = $image ?? $product->avatar;
            $product->sale_type = $saleType ?? $product->sale_type;
            $product->sale = $sale ?? $product->sale;
            $product->save();   
            return $product;
        } catch (QueryException $e) {
            throw new \Exception('Lỗi tạo sản phẩm: ' . $e->getMessage());
        }
    }

    public function updateProduct(Product $product, array $data)
    {
        $image = null;
        if (isset($data['image_file']) && $data['image_file']) {       
            $image = $this->uploadService->uploadImage($data['image_file']);
            if ($product->avatar !== null) {
                $this->uploadService->deleteImage($product->avatar);
            }
        }

        try {
            $product->fill($data);
            $product->avatar = $image ?? $product->avatar;
            $product->save(); 
            return $product;        
        } catch (QueryException $e) {
            throw new \Exception('Lỗi update sản phẩm: ' . $e->getMessage());
        }
    }

    public function deleteProduct(int $id)
    {
        $product = Product::find($id);
        if ($product) {
            if ($product->avatar !== null) {
                $this->uploadService->deleteImage($product->avatar);
            }
            $product->delete();
        }
    }

    public function getProduct($id, $variants)
    {
        $product = $variants === 'true' ? Product::with('variants')->find($id) : Product::find($id);
        if ($product) {
            $category = Category::find($product->category_id);
            $product->category_name = $category ? $category->name : null;
        }
        return new ProductResource($product);
    }

    public function getProducts($categoryId, $type, $variants, $perPage, $start, $end)
    {
        $products = Product::query();
        if ($variants) {
            $products = $products->with('variants');
        }
        if ($categoryId) {
            $category = Category::find($categoryId);
            $categoryIds = $category->childrenId();
            if ($categoryIds) {
                $products->whereIn('category_id', $categoryIds);
            } else {
                $products->where('category_id', $categoryId);
            }
        }
        if ($type) {
            $products = match ($type) {
                'old' => $products->orderBy('created_at', 'asc'),
                'new' => $products->orderBy('created_at', 'desc'),
                'hot' => $products->orderBy('sold_quantity', 'desc'),
                'price_asc' => $products->orderBy('price', 'asc'),
                'price_desc' => $products->orderBy('price', 'desc'),
                default => $products,
            };
        }

        if ($start && $end) {
            $products = $products->whereRaw('(price <= ? AND price >= ?)', [$end, $start]);
        } else if ($start) {
            $products = $products->where('price', '>=', $start);
        } else if ($end) {
            $products = $products->where('price', '<=', $end);
        }


        $products = $products->paginate($perPage);
        return [
            'data' => ProductResource::collection($products),
            'meta' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'total' => $products->total(),
                'per_page' => $products->perPage(),
            ],
        ];
    }
}

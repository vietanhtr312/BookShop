<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\VariantRequest;
use App\Models\Product;
use App\Models\Variant;
use App\Services\VariantService;
use Illuminate\Http\Request;

class VariantController extends Controller
{
    private $variantService;
    public function __construct(VariantService $variantService)
    {
        $this->variantService = $variantService;
    }

    public function createVariant(VariantRequest $request)
    {
        $productId = $request->input("product_id");
        $product = Product::find($productId);
        if (!$product) {
            return response()->json([
                'message' => 'Không tìm thấy sản phẩm',
            ], 404);
        }

        $validatedData = $request->validated();

        $variant = $this->variantService->createVariant($validatedData);

        return response()->json([
            'message' => 'Biến thể sản phẩm đã được tạo thành công!',
            'variant' => $variant
        ], 201);

    }

    public function updateVariant(VariantRequest $request, $id)
    {
        $variant = Variant::find($id);    
        
        $validatedData = $request->validated();

        $updatedVariant = $this->variantService->updateVariant($variant, $validatedData);

        return response()->json([
            'message' => 'Update biến thể thành công',
            'variant' => $updatedVariant,
        ], 200);
    }

    public function getVariants (Request $request)
    {
        $productId = $request->query('product_id');
        $variants = $this->variantService->getVariants($productId);

        if(!$variants) return response()->json(['message' => 'Không tìm thấy biến thể'], 404);

        return response()->json([
            'variants' => $variants,
            'message' => 'Đã lấy thành công danh sách biến thể'
        ], 200);
    }

    public function getVariant(Request $request)
    {
        $id = $request->query('id');
        $variant = $this->variantService->getVariant($id);

        return response()->json([
            'message' => 'Lấy thành công biến thể',
            'variant'=> $variant
        ]);
    }

    public function deleteVariant($id)
    {
        $this->variantService->deleteVariant($id);

        return response()->json([
            'message'=> 'Xóa thành công biến thể'
        ], 200);
    }
}

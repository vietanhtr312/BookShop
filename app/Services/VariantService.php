<?php

namespace App\Services;

use App\Http\Controllers\UploadController;
use App\Http\Resources\VariantResource;
use App\Models\Variant;
use Illuminate\Database\QueryException;

class VariantService
{
    private $uploadService;

    public function __construct(UploadService $uploadService)
    {
        $this->uploadService = $uploadService;
    }

    public function createVariant(array $data) 
    {
        $images = null;
        if (isset($data['image_files']) && $data['image_files']) {
            $images = $this->uploadService->uploadImages($data['image_files']);
        }

        try {
            $variant = new Variant();
            $variant->fill([
                'quantity' => $data['quantity'] ?? 0,
                'images' => $images !== null ? json_encode($images) : null,
                'copy_id' => $data['copy_id'],
                'product_id' => $data['product_id']
            ]);
            $variant->save();

            $variant->images = json_decode($variant->images, true);
            return $variant;
        } catch (QueryException $e) {
            throw new \Exception('Lỗi tạo biến thể: ' . $e->getMessage());
        }

    }

    public function updateVariant(Variant $variant, array $data) 
    {
        $images = null;
        if (isset($data['image_files']) && $data['image_files']) {
            $images = $this->uploadService->uploadImages($data['image_files']);
            if ($variant->images !== null) {
                $this->uploadService->deleteImages(json_decode($variant->images));
            }
        }

        try {
            $variant->fill([
                'quantity' => $data['s'] ?? $variant->quantity,
                'images' => $images !== null ? json_encode($images) : $variant->images,
                'copy_id' => $data['copy_id'] ?? $variant->copy_id,
                'product_id' => $data['product_id'] ?? $variant->product_id
            ]);
            $variant->save();

            $variant->images = json_decode($variant->images, true);
            return $variant;
        } catch (QueryException $e) {
            throw new \Exception('Lỗi update biến thể: ' . $e->getMessage());
        }
    }

    public function deleteVariant($id)
    {
        $variant = Variant::find($id);
        if ($variant) {
            if ($variant->images !== null) {
                $this->uploadService->deleteImages(json_decode($variant->images));
            }
            $variant->delete();
        }
    }

    public function getVariant($id) {
        $variant = Variant::find($id);
        return new VariantResource($variant);
    }

    public function getVariants($productId)
    {
        $variants = Variant::where('product_id', $productId)->get();
        return VariantResource::collection($variants);
    }


}
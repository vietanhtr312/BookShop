<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UploadService
{
    public function uploadImage($image)
    {
        if ($image instanceof UploadedFile) { 
            $imageName = time() . '_' . uniqid() . '.' . $image->extension();
            $image->storeAs('images', $imageName, 'public');
            $imageName = "/storage/images/$imageName";
            return $imageName;
        } else {
            return null;
        }
    }

    public function uploadImages($images)
    {
        $imageNames = [];
        foreach ($images as $image) {
            if ($image instanceof UploadedFile) { 
                $imageName = time() . '_' . uniqid() . '.' . $image->extension();
                $image->storeAs('images', $imageName, 'public');
                $imageNames[] = "/storage/images/$imageName";
            }
        }
        return $imageNames;
    }

    public function deleteImage($image)
    {
        $imageName = basename($image);
        Storage::delete("public/images/$imageName");
    }

    public function deleteImages($images)
    {
        foreach ($images as $image) {
            $imageName = basename($image);
            Storage::delete("public/images/$imageName");
        }
    }

}
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\ProductController; 
use App\Models\Product;

class CategoryController extends Controller
{
    // get all categories
    public function index () {
        $categories = Category::whereNull('parent_id')->get();

        return response()->json([
            'message' => 'Lấy thành công danh mục sản phẩm',
            'categories' => CategoryResource::collection($categories),
        ], 200);
    }

    public function getCategory(Request $request)
    {
        $id = $request->query('id');
        $category = Category::find($id);
        $total = $request->query('total');

        if (!$category) {
            return response()->json(['message' => "Không tìm thấy loại sản phẩm với id là $id"], 404);
        }

        return response()->json([
            'category'=>$category,
            'message'=>"Đã tìm thấy loại sản phẩm"
        ], 200);
    }
}

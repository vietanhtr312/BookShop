<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Copy;
use Illuminate\Http\Request;

class CopyController extends Controller
{
    //
    public function index() 
    {
        $copies = Copy::all();

        return response()->json([
            'message' => 'Lấy thành công danh sách bản',
            'copies' => $copies
        ], 200);
    } 

    public function getCopy(Request $request)
    {
        $id = $request->query('id');
        $copy = Copy::find($id);

        if (!$copy) {
            return response()->json(['message'=>'Không tìm thấy bản nào'], 404);
        }

        return response()->json([
            'copy' => $copy,
            'message' => 'Lấy thành công bản'
        ], 200);
    }
}

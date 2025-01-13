<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileRequest;
use App\Models\Profile;
use App\Models\User;
use App\Services\ProfileService;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    //
    private $profileService;
    public function __construct(ProfileService $profileService)
    {
        $this->profileService = $profileService;
    }

    public function createProfile(ProfileRequest $request)
    {
        $validatedData = $request->validated();

        $profile = $this->profileService->createProfile($validatedData);

        return response()->json([
            'message' => 'Thông tin cá nhân đã được tạo',
            'profile' => $profile,
        ], 201);
    }


    public function getProfile(Request $request) {
        $userId = $request->query("user_id");
        $profile = Profile::where("user_id", $userId)->first();

        if (!$profile) {
            return response()->json([
                'message' => "Không tìm thấy thông tin tài khoản",
            ], 404);
        }

        return response()->json([
            'message' => "Lấy thành công thông tin tài khoản",
            'profile' => $profile,
        ], 200);
    }
}

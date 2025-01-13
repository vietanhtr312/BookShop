<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\QueryException;

class UserController extends Controller
{
    //
    public function register(Request $request)
    {
        // $messageValidation = '';

        // if (!$request->input('name')) {
        //     $messageValidation = 'Please enter your name.';
        // } else if (!$request->input('email')) {
        //     $messageValidation = 'Please enter your email.';
        // } else if (!$request->input('password')) {
        //     $messageValidation = 'Please enter your password.';
        // } else {
        //     $user = User::where('email', $request->input('email'))->first();
        //     if ($user) {
        //         $messageValidation = 'This email is already in use.';
        //     }
        // }
        
        // if ($messageValidation) {
        //     return response()->json([
        //         'message' => $messageValidation,
        //     ], 422);
        // }

        // $user = User::where('email', $request->input('email'))->first();
        // if ($user) {
        //     return response()->json([
        //         'message' => 'This email is already in use.',
        //     ], 422);
        // }


        try {
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);
            $user->save();
        } catch (QueryException $e) {
            return response()->json([
                'message' =>  $e->getMessage(),
            ], 500);
            // throw new \Exception('Error create profile:' . $e->getMessage());
        }

        return response()->json([
            'message' => 'Account created successfully.',
            'user' => $user,
        ], 201);
    }

    public function login(Request $request)
    {
        $messageValidation = '';

        if (!$request->input('email')) {
            $messageValidation = 'Please enter your email.';
        } else if (!$request->input('password')) {
            $messageValidation = 'Please enter your password.';
        }

        if ($messageValidation) {
            return response()->json([
                'message' => $messageValidation,
            ], 422);
        }


        $email = $request->input("email");
        $user = User::where('email', $email)->first();
        try {
            if (!Auth::attempt($request->only('email', 'password'))) {
                if (!$user) {
                    return response()->json([
                        'type' => 'email',
                        'message' => 'The email address is incorrect!',
                    ], 422);
                } else {
                    return response()->json([
                        'type' => 'password',
                        'message' => 'The password is incorrect!',
                    ], 422);
                }
            }

            $token = $user->createToken('token_name')->plainTextToken;

            return response()->json([
                'token' => $token,
                'role' => $user->role,
                'user_id' => $user->id,
                'user' => $user,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Login error: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getUser(Request $request) {
        $userId = $request->query("user_id");
        $user = User::where("user_id", $userId)->first();

        if (!$user) {
            return response()->json([
                'message' => "Không tìm thấy thông tin tài khoản",
            ], 404);
        }

        return response()->json([
            'message' => "Lấy thành công thông tin tài khoản",
            'user' => $user,
        ], 200);
    }
}

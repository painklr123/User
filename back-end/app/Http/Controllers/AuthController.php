<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $email = $request->email;
        $password = $request->password;
        if (!$email || !$password) {
            return response()->json([
                'success' => false,
                'message' => 'Email or password is required'
            ], 400);
        }
        $status = Auth::attempt(['email' => $email, 'password' => $password]);
        if ($status) {
            $token = $request->user()->createToken('auth');
            return response()->json([
                'success' => true,
                'token' => $token->plainTextToken,
                'message' => 'Đăng nhập thành công'
            ]);
        }
        return response()->json([
            'success' => false,
            'message' => 'Email hoặc mật khẩu không đúng'
        ], 401);
    }

    public function profile(Request $request)
    {
        return response()->json([
            'success' => true,
            'user' => $request->user()
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'success' => true,
        ]);
    }
}
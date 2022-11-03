<?php

namespace App\Http\Controllers\Auth;

use App\Models\User; 
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Requests\Auth\RegisterRequest;

class RegisterController extends Controller
{
    public function store(RegisterRequest $request)
    {
        $user = User::registerUser($request);
        $user_id = $user->id;

        $token = $user->createToken('access-token')->plainTextToken;

        return response()->json([
            'user' => new UserResource(User::findOrFail($user_id)),
            'message' => "We have sent an email verification link to your registered email, please check the spam folder if you did not receive any emails from us.",
            'token' => $token
        ]);
    }
}

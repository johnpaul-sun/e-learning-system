<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;

class RegisterController extends Controller
{
    public function store(RegisterRequest $request)
    {
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'is_active' => true,
            'is_admin' => false,
        ]);
        $token = $user->createToken('access-token')->plainTextToken;

        return response()->json([
            'user' => new UserResource(User::findOrFail($user->id)),
            'token' => $token
        ]);
    }
}

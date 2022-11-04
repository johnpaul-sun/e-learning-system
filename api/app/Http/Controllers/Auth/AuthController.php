<?php

namespace App\Http\Controllers\Auth;
 
use App\Models\User;
use Illuminate\Http\Request; 
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;

class AuthController extends Controller
{
  public function index(Request $request)
  {
    return User::findOrFail($request->user()->id);
  }

  public function store(LoginRequest $request)
  {
    $request->authenticate();
    $user = User::where('email', $request->email)->first(); 
    $token = $user->createToken('access-token')->plainTextToken;
    User::setActiveStatus(1);
    return response()->json([
      'token' => $token
    ]);
  }

  public function destroy()
  {
    User::setActiveStatus(0);
    auth()->user()->currentAccessToken()->delete();
    return response()->json(["message" => "Signed out successfully!"]);
  }
}

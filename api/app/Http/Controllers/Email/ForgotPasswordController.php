<?php

namespace App\Http\Controllers\Email;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use App\Http\Requests\Email\ForgotPasswordRequest;
use App\Http\Resources\Email\ForgotPasswordResource;

class ForgotPasswordController extends Controller
{
    public function forgot()
    {
        $credentials = request()->validate(['email' => 'required|email']);
        $res = Password::sendResetLink($credentials);
        return response()->json(["message" => __($res)], 201);
    }

    public function redirect(Request $request)
    {
        $client = env('APP_FRONTEND_URL');
        $encrypted_email = base64_encode(urldecode($request->email));
        $encrypted_token = base64_encode($request->token); 
        return redirect("$client/forgot-password?token=$encrypted_token&email=$encrypted_email");
    }

    public function reset(ForgotPasswordRequest $request)
    {  
        $decoded_data = ForgotPasswordResource::decodeData($request);
        $reset_password_status = Password::reset($decoded_data, function ($user, $password) {
            $user->password = Hash::make($password);
            $user->save();
        });
        if ($reset_password_status == Password::INVALID_TOKEN) {
            return response()->json(["message" => __(Password::INVALID_TOKEN)], 400);
        }
        return response()->json(["message" => "Reset password successfully!"], 201);
    }
}

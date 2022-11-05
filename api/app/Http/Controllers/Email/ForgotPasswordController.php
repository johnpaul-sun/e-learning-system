<?php

namespace App\Http\Controllers\Email;

use App\Models\User;
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
        $user = User::where('email', $credentials)->first();
        return response()->json([
            "message" => __($res),
            "status" => $user === null ? 404 : 201
        ]);
    }

    public function redirect(Request $request)
    {
        $client = env('APP_FRONTEND_URL');
        $encrypted_token = base64_encode($request->token);
        $encrypted_email = base64_encode(urldecode($request->email));
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

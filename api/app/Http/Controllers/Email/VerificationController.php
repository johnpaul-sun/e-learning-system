<?php

namespace App\Http\Controllers\Email;

use App\Models\User; 
use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Request;

class VerificationController extends Controller
{
    public function verify(Request $request)
    { 
        $client = env('APP_FRONTEND_URL');
        $user_id = $request->id;
        $user = User::findOrFail($user_id);

        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
            return redirect("$client/verify-email?user=$user_id&verified=true");
        }
        return redirect("$client/");
    } 

    public function resend()
    {
        $user = auth('sanctum')->user();

        if ($user->hasVerifiedEmail())
            return response()->json(["message" => "Email already verified."], 400);

        $user->sendEmailVerificationNotification();
        return response()->json(["message" => "Email verification link sent on your Email address"], 201);
    }
}

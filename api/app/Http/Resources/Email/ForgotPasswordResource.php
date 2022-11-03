<?php

namespace App\Http\Resources\Email;

use Illuminate\Http\Resources\Json\JsonResource;

class ForgotPasswordResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static function decodeData($request)
    {
        return [
            'email' => base64_decode($request->email),
            'token' => base64_decode($request->token),
            'password' => $request->password
        ];
    }
}

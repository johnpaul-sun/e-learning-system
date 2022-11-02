<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Routing\Controller;
use App\Http\Resources\UserResource; 


class UserController extends Controller
{
    public function index()
    {
        return UserResource::collection(User::get());
    }

    public function show(User $user)
    {
        return response()->json($user);
    } 
}

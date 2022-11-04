<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\RegisterController;


Route::group(['prefix' => '/v1'], function () {
  Route::post('/login', [AuthController::class, 'store']);
  Route::post('/register', [RegisterController::class, 'store']);
});

Route::group(['middleware' => 'auth:sanctum', 'prefix' => '/v1'], function () {
  Route::get('/auth', [AuthController::class, 'index']);
  Route::post('/logout', [AuthController::class, 'destroy']);
});

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Email\VerificationController;
use App\Http\Controllers\Email\ForgotPasswordController;

Route::group(['prefix' => '/v1'], function () {
  Route::group(['prefix' => '/user'], function () { 
    Route::post('/forgot-password', [ForgotPasswordController::class, 'forgot'])->name('password.forgot');
    Route::get('/redirect', [ForgotPasswordController::class, 'redirect'])->name('password.reset');
    Route::post('/reset-password', [ForgotPasswordController::class, 'reset']);
  });
});

Route::group(['middleware' => 'auth:sanctum','prefix' => '/v1'], function () {
  Route::group(['prefix' => '/user'], function () {
    Route::get('/', [UserController::class, 'index']);
    Route::get('/{user}', [UserController::class, 'show']);
    
    Route::get('/email/verify', [VerificationController::class, 'verify'])->name('verification.verify');
    Route::get('/email/resend', [VerificationController::class, 'resend'])->name('verification.resend');
  });
});

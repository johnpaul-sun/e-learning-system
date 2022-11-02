<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => '/'], function () {
    Route::get('/', function () {
        return response()->json([
            "message" => "You are at the root of this api",
            "version" => ["/v1"]
        ]);
    });
    Route::get('/v1', function () {
        return response()->json([
            "message" => "You are at the version 1 of this api",
            "more" => "api documentation"
        ]);
    });
});

Route::group(['middleware' => 'auth:sanctum', 'prefix' => '/v1'], function () {
    Route::group(['prefix' => 'user'], function () {
        Route::get('/', [UserController::class, 'index']);
        Route::get('/{user}', [UserController::class, 'show']);
    });
});

require __DIR__ . '/auth.php';

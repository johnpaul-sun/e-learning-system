<?php

use Illuminate\Support\Facades\Route; 

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

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'cors'], function(){
    Route::apiResource('post', Api\PostController::class)->except(['create','edit']);
    Route::apiResource('user', Api\UserController::class)->except(['create','edit','show']);
    Route::apiResource('product', Api\ProductController::class)->except(['create','edit','show']);
});

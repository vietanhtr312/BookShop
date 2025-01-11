<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/register', [UserController::class, 'register']);
Route::post('/login', 'App\Http\Controllers\UserController@login');


Route::get('/products', [ProductController::class, 'getProducts']);
Route::get('/product', [ProductController::class, 'getProduct']);

//Category
Route::get('/category', [CategoryController::class, 'getCategory']);
Route::get('/categories', [CategoryController::class, 'index']);
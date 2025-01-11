<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CopyController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\VariantController;
use App\Models\Copy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/register', [UserController::class, 'register']);
Route::post('/login', 'App\Http\Controllers\UserController@login');

Route::post('/upload/images', [UploadController::class, 'uploadImages']);
Route::post('/upload/image', [UploadController::class, 'uploadImage']);

// Product
Route::post('/product/create', [ProductController::class, 'createProduct']);
Route::post('/product/update/{id}', [ProductController::class, 'updateProduct']);
Route::delete('/product/delete/{id}', [ProductController::class, 'deleteProduct']);

Route::get('/products', [ProductController::class, 'getProducts']);
Route::get('/product', [ProductController::class, 'getProduct']);

//Variant
Route::post('/variant/create', [VariantController::class, 'createVariant']);
Route::post('variant/update/{id}', [VariantController::class,'updateVariant']);
Route::delete('/variant/delete/{id}', [VariantController::class,'deleteVariant']);
Route::get('/variants', [VariantController::class, 'getVariants']);
Route::get('/variant', [VariantController::class,'getVariant']);

//Category
Route::get('/category', [CategoryController::class, 'getCategory']);
Route::get('/categories', [CategoryController::class, 'index']);

//Copy
Route::get('/copy', [CopyController::class, 'getCopy']);
Route::get('/copies', [CopyController::class, 'index']);

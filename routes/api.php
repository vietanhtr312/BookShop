<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CopyController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\VariantController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::post('/profile/create', [ProfileController::class, 'createProfile']);
Route::get('/profile', [ProfileController::class, 'getProfile']);

Route::post('/upload/images', [UploadController::class, 'uploadImages']);
Route::post('/upload/image', [UploadController::class, 'uploadImage']);

// Product
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::post('/product/create', [ProductController::class, 'createProduct']);
    Route::post('/product/update/{id}', [ProductController::class, 'updateProduct']);
    Route::delete('/product/delete/{id}', [ProductController::class, 'deleteProduct']);
});

Route::get('/products', [ProductController::class, 'getProducts']);
Route::get('/products/home', [ProductController::class, 'getHomeProducts']);
Route::get('/product', [ProductController::class, 'getProduct']);

//Variant
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::post('/variant/create', [VariantController::class, 'createVariant']);
    Route::post('variant/update/{id}', [VariantController::class, 'updateVariant']);
    Route::delete('/variant/delete/{id}', [VariantController::class, 'deleteVariant']);
});
Route::get('/variants', [VariantController::class, 'getVariants']);
Route::get('/variant', [VariantController::class, 'getVariant']);

//Category
Route::get('/category', [CategoryController::class, 'getCategory']);
Route::get('/categories', [CategoryController::class, 'index']);

//Copy
Route::get('/copy', [CopyController::class, 'getCopy']);
Route::get('/copies', [CopyController::class, 'index']);

//Cart
Route::get('/carts', [CartController::class, 'getCarts']);
Route::post('/cart/add', [CartController::class, 'addToCart']);
Route::post('cart/update/{id}', [CartController::class, 'updateCart']);
Route::delete('/cart/delete/{id}', [CartController::class, 'deleteCart']);
Route::delete('/cart/deleteAll', [CartController::class, 'deleteCarts']);

//Order
Route::post('/order/create', [OrderController::class, 'createOrder']);
Route::get('/order/{id}', [OrderController::class, 'getOrderById']);
Route::get('/userOrders', [OrderController::class, 'getUserOrders']);

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/orders', [OrderController::class, 'getOrders']);
    Route::put('/order/confirm/{id}', [OrderController::class, 'confirmOrder']);
});

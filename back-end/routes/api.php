<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('users', UserController ::class );
Route::post('/auth/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/auth/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/auth/profile', [AuthController::class, 'profile']);
<?php

use App\Http\Controllers\ComingSoonController;
use App\Http\Controllers\ComingSoonProductsController;
use App\Http\Controllers\ComingSoonSettingsController;
use Illuminate\Support\Facades\Route;

/**
 * Coming Soon API Routes
 * 1. Activation
 * 2. Product List
 * 3. Colors and Text
 * 4. Set Coming Soon Schedule
 * 5. Set Display Message on Coming Soon Product page
 * 6. Coming Soon badge Design
 * 7. Custom CSS and Js
 */

 Route::group([
    'prefix' => 'api/coming-soon/',
    'middleware' => 'shopify.auth',
], function () {
    Route::get('init', [ComingSoonController::class, 'init']);
    Route::post('save', [ComingSoonController::class, 'save']);

    Route::get('products', [ComingSoonProductsController::class, 'index']);
    Route::post('products/store', [ComingSoonProductsController::class, 'store']);
    Route::post('products/update', [ComingSoonProductsController::class, 'update']);
    Route::post('products/destroy', [ComingSoonProductsController::class, 'destroy']);

    Route::get('colorntext', [ComingSoonSettingsController::class, 'getColorNTextSettings']);
    Route::post('colorntext', [ComingSoonSettingsController::class, 'colorNText']);

    // Schedule
    Route::get('schedule', [ComingSoonSettingsController::class, 'getComingSoonSchedule']);
    Route::post('schedule', [ComingSoonSettingsController::class, 'storeComingSoonSchedule']);

    // Display Message
    Route::get('display-message', [ComingSoonSettingsController::class, 'getDisplayMessage']);
    Route::post('display-message', [ComingSoonSettingsController::class, 'storeDisplayMessage']);

    // Badge Design
    Route::get('badge-design', [ComingSoonSettingsController::class, 'getBadgeDesign']);
    Route::post('badge-design', [ComingSoonSettingsController::class, 'storeBadgeDesign']);
});
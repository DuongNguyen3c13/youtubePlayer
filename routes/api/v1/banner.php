<?php

use App\Http\Controllers\API\v1\BannerController;

Route::prefix('banners')->group(['middleware' => ['auth:ghost']], function () {
    //other route here
    Route::get('/', [BannerController::class, 'list']);
    Route::post('/', [BannerController::class, 'store']);
    Route::get('/{banner}', [BannerController::class, 'show']);
    Route::put('/{banner}', [BannerController::class, 'update']);
    Route::delete('/{banner}', [BannerController::class, 'delete']);
});

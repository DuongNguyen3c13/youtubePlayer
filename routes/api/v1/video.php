<?php

use App\Http\Controllers\API\v1\VideoController;

Route::prefix('videos')->group(function () {
    //other route here
    Route::get('/', [VideoController::class, 'list']);
    Route::post('/', [VideoController::class, 'store']);
});

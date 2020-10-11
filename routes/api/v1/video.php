<?php

use App\Http\Controllers\API\v1\VideoController;

Route::prefix('videos')->group(['middleware' => ['auth:ghost']], function () {
    //other route here
    Route::get('/', [VideoController::class, 'list']);
    Route::post('/', [VideoController::class, 'store']);
    Route::get('/{video}', [VideoController::class, 'show']);
    Route::put('/{video}', [VideoController::class, 'update']);
    Route::delete('/{video}', [VideoController::class, 'delete']);
});

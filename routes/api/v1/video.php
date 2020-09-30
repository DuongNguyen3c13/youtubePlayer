<?php

Route::prefix('videos')->group(function () {
    //other route here
    Route::post('/', [\App\Http\Controllers\API\v1\VideoController::class, 'store']);
});

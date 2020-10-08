<?php

require __DIR__ . '/v1/video.php';
require __DIR__ . '/v1/banner.php';


use App\Http\Controllers\API\v1\StartupController;

Route::get('/startup', [StartupController::class, 'index']);

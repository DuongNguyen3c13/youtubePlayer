<?php

use App\Utilities\ResponseFormatter;

if (! function_exists('success')) {
    function success($data, $message = '')
    {
        return ResponseFormatter::success($data, $message);
    }
}

if (! function_exists('fail')) {
    function fail($code, $message = '', $errors = [])
    {
        return ResponseFormatter::fail($code, $message, $errors);
    }
}

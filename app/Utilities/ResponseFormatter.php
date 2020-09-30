<?php

namespace App\Utilities;

class ResponseFormatter
{
    public static function success($data, $message = '')
    {
        return response()->json([
            'success' => true,
            'code' => 200,
            'message' => $message,
            'payload' => $data
        ]);
    }

    public static function fail($code, $message = '', $errors = [])
    {
        return response()->json([
            'success' => false,
            'code' => $code,
            'message' => $message,
            'errors' => $errors
        ]);
    }
}

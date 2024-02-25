<?php

namespace App\Helpers;

use Illuminate\Http\JsonResponse;

class ResponseHelper
{
    public static function success($response = null, $status = 200): JsonResponse
    {
        return response()->json($response, $status);
    }

    public static function error($response = null, $statusCode = 400): JsonResponse
    {
        return response()->json($response, $statusCode);
    }
}
<?php

namespace App\Helpers;

use Illuminate\Http\JsonResponse;

class ResponseHelper
{
    public static function success($data = null, $statusCode = 200): JsonResponse
    {
        $response = [
            'success' => true,
            'data' => $data,
        ];

        return response()->json($response, $statusCode);
    }

    public static function error($data = null, $statusCode = 400): JsonResponse
    {
        $response = [
            'success' => false,
            'data' => $data,
        ];

        return response()->json($response, $statusCode);
    }
}

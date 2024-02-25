<?php

namespace App\Http\Services;

use Illuminate\Http\Request;
use Kreait\Firebase\Exception\Auth\FailedToVerifyToken;

class AuthServices
{
    private $firebaseService;

    public function __construct()
    {
        $this->firebaseService = app()->make(FirebaseServices::class);
    }
    public function validateToken(Request $request)
    {
        $token = $request->bearerToken();
        try {
            return $this->firebaseService->getAuth()->verifyIdToken($token);
        } catch (FailedToVerifyToken $e) {
            echo 'The token is invalid: ' . $e->getMessage();
        }
    }
}
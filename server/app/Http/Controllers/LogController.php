<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LogController extends Controller
{
    public function loginSubmit(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return ResponseHelper::error($validator->errors());
        }

        try {
            $user = User::where('username', $request->username)
                ->where(
                    'password', $request->password
                )
                ->first(
                );

            if ($user) {
                $details = null;
                if ($user->roleInfo->role_name === "STUDENT")
                    $details = $user->studentInfo;
                else
                    $details = $user->creatorInfo;

                return ResponseHelper::success([
                    'token' => $user->generateToken($user->roleInfo->role_name),
                    'userInfo' => [
                        'name' => $user->username,
                        'email' => $user->email,
                        'details' => $details
                    ],
                    'role' => $user->roleInfo->role_name

                ]);
            }
            return ResponseHelper::error("Invalid username or password");

        } catch (\Throwable $th) {
            ResponseHelper::error([
                'message' => 'User could not be logged in',
                'error' => $th->getMessage()
            ]);
        }

    }
}
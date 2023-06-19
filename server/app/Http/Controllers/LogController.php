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


            if ($user)
                return ResponseHelper::success([
                    'token' => $user->generateToken($user->roleInfo->role_name),
                    'message' => "User logged in successfully",
                ]);

            return ResponseHelper::error("Invalid username or password");

        } catch (\Throwable $th) {
            ResponseHelper::error([
                'message' => 'User could not be logged in',
                'error' => $th->getMessage()
            ]);
        }

    }
}
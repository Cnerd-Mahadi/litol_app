<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Http\Services\AuthServices;
use App\Http\Services\LogServices;
use App\Http\Services\SignUpServices;
use App\Mail\ResetMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class LogController extends Controller
{
    private $logService;
    private $authService;
    public function __construct(LogServices $logService, AuthServices $authService)
    {
        $this->logService = $logService;
        $this->authService = $authService;
    }

    public function loginSubmit(Request $request, SignUpServices $service)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return ResponseHelper::error($validator->errors());
        }

        try {
            $user = $this->logService->checkUser($request->username, $request->password);
        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'User could not be checked',
                'error' => $th->getMessage()
            ]);
        }

        if (!$user) {
            return ResponseHelper::error([
                'message' => 'Invalid username or password'
            ], 401);
        }

        try {
            return ResponseHelper::success([
                'token' => $this->authService->generateAuthToken($user->id),
                'userInfo' => [
                    'id' => $user->id,
                    'name' => $user->data->username,
                    'email' => $user->data->email,
                    'dob' => $user->data->dob
                ],
            ]);

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'User could not be logged in',
                'error' => $th->getMessage()
            ]);
        }
    }

    public function resetPasswordMail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'url' => ['required', 'string'],
            'email' => ['required', 'string', 'email'],
        ]);

        if ($validator->fails()) {
            return ResponseHelper::error($validator->errors());
        }

        try {
            Mail::to($request->email)
                ->queue(new ResetMail($request->url));

            return ResponseHelper::success("Password reset mail sent successfully");

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => "Password reset mail sent failed",
                'error' => $th->getMessage()
            ]);
        }
    }
}
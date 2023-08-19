<?php

namespace App\Http\Services;

use App\Rules\BeUniqueEmail;
use App\Rules\BeUniqueUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class SignUpServices
{
    private $firebaseService;
    private $userServices;

    public function __construct()
    {
        $this->firebaseService = app()->make(FirebaseServices::class);
        $this->userServices = app()->make(UserServices::class);
    }

    public function createStudent(Request $request)
    {
        $user = [
            'username' => $request->username,
            'password' => Hash::make($request->password, ['rounds' => 5]),
            'email' => $request->email,
            'dob' => $request->dob,
        ];
        return $this->userServices->saveUser($user);
    }

    public function checkValidation($request)
    {
        return Validator::make($request->all(), [
            "username" => ['required', 'string', 'max:255', new BeUniqueUser],
            "password" => 'required|string',
            "confirmPassword" => 'required|string|same:password',
            "dob" => 'required|string',
            "email" => ['required', 'email', new BeUniqueEmail],
        ]);
    }

}
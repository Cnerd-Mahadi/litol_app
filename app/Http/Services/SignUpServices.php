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
            'role' => $request->role,
            'basic' => [
                'address' => $request->address,
                'age' => $request->age,
                'dob' => $request->dob,
                'gender' => $request->gender,
                'phone' => $request->phone
            ]
        ];
        return $this->userServices->saveUser($user);
    }

    public function createCreator(Request $request)
    {
        $user = [
            'username' => $request->username,
            'password' => Hash::make($request->password, ['rounds' => 5]),
            'email' => $request->email,
            'role' => $request->role,
            'basic' => [
                'bio' => $request->bio,
                'age' => $request->age,
                'dob' => $request->dob,
                'gender' => $request->gender,
                'phone' => $request->phone
            ]
        ];
        return $this->userServices->saveUser($user);
    }


    public function checkValidation($request, $role)
    {
        if ($role === "student") {
            return Validator::make($request->all(), [
                "username" => ['required', 'string', 'max:255', new BeUniqueUser],
                "password" => 'required|string',
                'gender' => 'required|string',
                "age" => 'required|integer',
                "dob" => 'required|string',
                "email" => ['required', 'email', new BeUniqueEmail],
                "phone" => 'required|string',
                "address" => 'required|string',
            ]);

        } else if ($role === "creator") {
            return Validator::make($request->all(), [
                "username" => ['required', 'string', 'max:255', new BeUniqueUser],
                "password" => 'required|string',
                'gender' => 'required|string',
                "age" => 'required|integer',
                "dob" => 'required|string',
                "email" => ['required', 'email', new BeUniqueEmail],
                "phone" => 'required|string',
                "bio" => 'required|string',
            ]);
        }
    }

}
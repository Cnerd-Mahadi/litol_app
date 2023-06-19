<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Models\Creator;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SignUpController extends Controller
{

    public function signUpSubmit(Request $request)
    {

        $validation = $this->checkValidation($request, $request->role);

        if ($validation->fails()) {
            return ResponseHelper::error($validation->errors());
        }

        try {
            $user = new User();
            $user->username = $request->username;
            $user->password = $request->password;
            $user->email = $request->email;

            if ($request->role === "STUDENT")
                return $this->saveStudent($user, $request);
            else if ($request->role === "CREATOR")
                return $this->saveCreator($user, $request);

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'User could not be created',
                'error' => $th->getMessage()
            ]);
        }

    }

    public function checkValidation($request, $role)
    {
        if ($role === "STUDENT") {
            return Validator::make($request->all(), [
                "username" => 'required|string|max:255|unique:users',
                "password" => 'required|string',
                'gender' => 'required',
                "age" => 'required|integer',
                "dob" => 'required',
                "email" => 'required|email',
                "phone" => 'required',
                "address" => 'required',
            ]);
        } else if ($role === "CREATOR") {
            return Validator::make($request->all(), [
                "username" => 'required|string|max:255|unique:users',
                "password" => 'required|string',
                'gender' => 'required',
                "age" => 'required|integer',
                "dob" => 'required',
                "email" => 'required|email',
                "phone" => 'required',
                "bio" => 'required',
            ]);
        }
    }

    public function saveStudent($user, $request)
    {
        $user->role_id = 1;
        $user->save();

        try {
            $user = User::where('username', $request->username)->first();

            $student = new Student();
            $student->user_id = $user->user_id;
            $student->gender = $request->gender;
            $student->age = $request->age;
            $student->address = $request->address;
            $student->dob = $request->dob;
            $student->phone = $request->phone;
            $student->save();

            return ResponseHelper::success([
                'token' => $user->generateToken("STUDENT"),
                'message' => "Student created successfully"
            ]);

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'Student could not be created',
                'error' => $th->getMessage()
            ]);
        }
    }

    public function saveCreator($user, $request)
    {
        $user->role_id = 1;
        $user->save();

        try {
            $user = User::where('username', $request->username)->first();

            $creator = new Creator();
            $creator->user_id = $user->user_id;
            $creator->gender = $request->gender;
            $creator->age = $request->age;
            $creator->dob = $request->dob;
            $creator->phone = $request->phone;
            $creator->bio = $request->bio;
            $creator->save();

            return ResponseHelper::success([
                'token' => $user->generateToken("CREATOR"),
                'message' => "Creator created successfully"
            ]);

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'Creator could not be created',
                'error' => $th->getMessage()
            ]);
        }
    }
}
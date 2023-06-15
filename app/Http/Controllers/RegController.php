<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Mail\ConfirmationMail;
use App\Models\Creator;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class RegController extends Controller
{

        /**
     * Validates and creates a new user and student record with the given request data.
     *
     * @param Request $request The HTTP request containing the user and student data.
     * @throws \Illuminate\Validation\ValidationException if the request data fails the validation rules.
     * @return \Illuminate\Http\JsonResponse Returns a JSON response with a success message and token upon successful user and student creation. 
     * @throws \Illuminate\Http\Exceptions\HttpResponseException if errors occurred during user and student creation.
     */
    public function signUpSubmit(Request $request)
    {

        $validateRequest = Validator::make($request->all(), [
            "username" => 'required|string|max:255',
            "password" => 'required|string|regex:regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/',
            'gender' => 'required',
            "age" => 'required|integer',
            "dob" => 'required',
            "email" => 'required|email|unique:users',
            "phone" => 'required',
        ]);

        if ($validateRequest->fails()) {
            return ResponseHelper::error($validateRequest->errors(), 400);
        }

        try {
            $user = new User();
            $user->username = $request->username;
            $user->password = $request->password;
            $user->role_id = 1;
            $user->save();

            $user = User::where('username', $request->username)->first();

            $student = new  Student();
            $student->gender = $request->gender;
            $student->age = $request->age;
            $student->address = $request->address;
            $student->dob = $request->dob;
            $student->email = $request->email;
            $student->phone = $request->phone;
            $student->user_id = $user->user_id;


            if ($request->emailCheck == "on") {

                $body = "Hey {$request->username}, Congratulations for opening an account with LITOL successfully. Start your journey with us today!";
                Mail::to($request->email)->send(new ConfirmationMail($body));
                return ResponseHelper::success(["message" => "Please Activate Your Account Via Email"], 200);
            }

            if (!$student->save())
                return ResponseHelper::error($student->errors(), 400);

            $token = $student->generateToken();

            return ResponseHelper::success(["token"=>$token,"message" => "User Created Successfully"], 200);
        } catch (\Exception $e) {
            return ResponseHelper::error($e->getMessage(), 500);
        }
    }

/**
 * Handles the form submission of the sign-up form by creating a new user and creator if validation passes.
 *
 * @param  Request  $request  The HTTP request object containing the form data.
 * @return array               Returns an array with a token and a success message if the account was created successfully,
 *                             otherwise an error response with a message describing the validation errors or the exception.
 */
public function signUpSubmitCreator(Request $request)
{
    // Validate request data
    $validateRequest = Validator::make($request->all(), [
        "username" => 'required|string|max:255|unique:users',
        "password" => 'required|string|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/',
        'gender' => 'required',
        "age" => 'required|integer',
        "dob" => 'required',
        "email" => 'required|email',
        "phone" => 'required',
        "bio" => 'required'
    ]);

    // Return error response with validation errors if validation fails
    if ($validateRequest->fails()) {
        return ResponseHelper::error($validateRequest->errors(), 400);
    }

    try {
        // Create new user
        $user = new User();
        $user->username = $request->username;
        $user->password = $request->password;
        $user->role_id = 2;
        $user->save();

        // Get created user
        $user = User::where('username', $request->username)->first();

        // Create new creator
        $creator = new  Creator();
        $creator->gender = $request->gender;
        $creator->age = $request->age;
        $creator->dob = $request->dob;
        $creator->email = $request->email;
        $creator->phone = $request->phone;
        $creator->bio = $request->bio;
        $creator->user_id = $user->user_id;

        // Return error response with creator errors if creator not saved
        if (!$creator->save()) {
            return ResponseHelper::error(['message' => $creator->errors()], 400);
        }

        // Return success response with token and success message
        return ResponseHelper::success([
            'token' => $creator->generateToken(),
            'message' => 'Account created successfully'
        ], 200);
    } catch (\Exception $e) {
        // Return error response with exception message
        return ResponseHelper::error($e->getMessage(), 500);
    }
}
}

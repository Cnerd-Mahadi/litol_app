<?php

namespace App\Http\Controllers;

use App\Mail\ConfirmationMail;
use App\Models\Creator;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class RegController extends Controller
{

    public function signUpSubmit(Request $request){

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


        if($request->emailCheck == "on"){

            $body = "Hey {$request->username}, Congratulations for opening an account with LITOL successfully. Start your journey with us today!";
            Mail::to($request->email)->send(new ConfirmationMail($body));
            return "MAIL SENT!";
        }

        if($student->save())
            return response()->json(null, 200);

    }

    public function signUpSubmitCreator(Request $request){

        $user = new User();
        $user->username = $request->username;
        $user->password = $request->password;
        $user->role_id = 2;
        $user->save();

        $user = User::where('username', $request->username)->first();


        $creator = new  Creator();
        $creator->gender = $request->gender;
        $creator->age = $request->age;
        $creator->dob = $request->dob;
        $creator->email = $request->email;
        $creator->phone = $request->phone;
        $creator->bio = $request->bio;
        $creator->user_id = $user->user_id;

        if($creator->save())
            return response()->json(null, 200);

    }
}

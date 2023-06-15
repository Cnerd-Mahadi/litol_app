<?php

namespace App\Http\Controllers;

use App\Models\Creator;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use stdClass;

class LoginController extends Controller
{
    public function loginSubmit(Request $request)
    {
        $user = User::where('username', $request->username)
            ->where(
                'password', $request->password
            )
            ->first(
            );


        if ($user) {
            if ($user->role->role_name == "STUDENT") {
                $student = Student::where('user_id', $user->user_id)->first();
                $object = new stdClass();
                $object->user = $student;
                $object->role = "STUDENT";
                $object->name = $user->username;
                return response()->json($object, 200);
            }


            $creator = Creator::where('user_id', $user->user_id)->first();
            $object = new stdClass();
            $object->user = $creator;
            $object->role = "CREATOR";
            $object->name = $user->username;
            return response()->json($object, 200);



        }
        return response()->json(null, 400);

    }
}

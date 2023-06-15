<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Models\Creator;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use stdClass;

class LoginController extends Controller
{
    public function loginSubmit(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return ResponseHelper::error($validator->errors(), 400);
        }

        $user = User::where('username', $request->username)
            ->where(
                'password',
                $request->password
            )
            ->first();

        if ($user) {
            if ($user->role->role_name == "STUDENT") {
                $student = Student::where('user_id', $user->user_id)->first();
                $token = $student->generateToken();
                $object = new stdClass();
                $object->token = $token;
                $object->user = $student;
                $object->user->role = "STUDENT";
                $object->user->name = $user->username;
                return ResponseHelper::success($object, 200);
            }


            $creator = Creator::where('user_id', $user->user_id)->first();
            $token = $creator->generateToken();
            $object = new stdClass();
            $object->token = $token;
            $object->user = $creator;
            $object->user->role = "CREATOR";
            $object->user->name = $user->username;
            return ResponseHelper::success($object, 200);
        }
        return ResponseHelper::error(['message' => 'Invalid Credentials'],404);
    }
}

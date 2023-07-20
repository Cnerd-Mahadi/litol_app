<?php

namespace App\Http\Services;

use Illuminate\Support\Facades\Hash;





class LogServices
{
    private $userServices;
    public function __construct()
    {
        $this->userServices = app()->make(UserServices::class);
    }
    public function checkUser($username, $password)
    {
        $user = $this->userServices->getUser($username);
        if (!$user)
            return false;
        if (!Hash::check($password, $user->data->password))
            return false;

        return $user;
    }
}
<?php

namespace App\Http\Services;

class UserServices
{
    private $firebaseService;

    public function __construct()
    {
        $this->firebaseService = app()->make(FirebaseServices::class);
    }

    public function checkUniqueEmail($email)
    {
        $uniqueValue = $this->firebaseService->getCollection('users')->where('email', '=', $email)->documents();
        return sizeof($this->firebaseService->getData($uniqueValue)) > 0 ? false : true;
    }

    public function checkUniqueUser($username)
    {
        $uniqueValue = $this->firebaseService->getCollection('users')->where('username', '=', $username)->documents();
        return sizeof($this->firebaseService->getData($uniqueValue)) > 0 ? false : true;
    }

    public function saveUser($user)
    {
        return $this->firebaseService->getCollection('users')->add($user);
    }

    public function getUserbyId($documentId)
    {
        return $this->firebaseService->getDocument($documentId, 'users');
    }

    public function getUser($username)
    {
        $userSnap = $this->firebaseService->getCollection('users')
            ->where('username', '===', $username)->documents();
        $value = $this->firebaseService->getData($userSnap);
        return sizeof($value) > 0 ? $value[0] : false;
    }
}
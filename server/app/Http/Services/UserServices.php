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
        return $this->firebaseService->getData($uniqueValue) === null ? true : false;
    }

    public function checkUniqueUser($username)
    {
        $uniqueValue = $this->firebaseService->getCollection('users')->where('username', '=', $username)->documents();
        return $this->firebaseService->getData($uniqueValue) === null ? true : false;
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

        return $this->firebaseService->getData($userSnap);
    }
}
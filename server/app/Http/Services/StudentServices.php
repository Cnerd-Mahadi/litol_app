<?php

namespace App\Http\Services;

class StudentServices
{
    private $userService;
    private $firebaseService;
    private $contentService;
    private $commonService;

    public function __construct()
    {
        $this->userService = app()->make(UserServices::class);
        $this->firebaseService = app()->make(FirebaseServices::class);
        $this->contentService = app()->make(ContentServices::class);
        $this->commonService = app()->make(CommonServices::class);
    }
    public function getStudent($user_id)
    {
        return $this->userService->getUserbyId($user_id);
    }

    public function getContentsbySubject($subject)
    {
        $contentsSnap = $this->firebaseService->getCollection('contents')->where('subject', '==', $subject)->documents();
        return $this->firebaseService->getDataWithImage($contentsSnap);
    }

    public function getContent($content_id)
    {
        return $this->firebaseService->getDocumentWithImage($content_id, 'contents');
    }
}
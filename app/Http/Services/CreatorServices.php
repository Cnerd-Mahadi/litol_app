<?php

namespace App\Http\Services;

class CreatorServices
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

    public function getCreator($user_id)
    {
        return $this->userService->getUserbyId($user_id);
    }

    public function getContentbyCreator($creatorId)
    {
        return $this->commonService->getContentsfromAuthor($creatorId, 'contents');
    }
}
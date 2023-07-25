<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Http\Services\CommonServices;
use App\Http\Services\ContentServices;
use App\Http\Services\CreatorServices;
use App\Http\Services\UserServices;

class CreatorController extends Controller
{
    private $creatorService;
    private $userService;
    private $contentService;
    private $commonService;

    public function __construct(CreatorServices $creatorService, UserServices $userService, ContentServices $contentService, CommonServices $commonService)
    {
        $this->creatorService = $creatorService;
        $this->userService = $userService;
        $this->contentService = $contentService;
        $this->commonService = $commonService;
    }
    public function dashboard($user_id)
    {
        try {
            $subjects = $this->commonService->getSubjects();
            $contents = $this->creatorService->getContentbyCreator($user_id);
            return ResponseHelper::success([
                'subjects' => $subjects,
                'contents' => $contents
            ]);

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'Dashboard info could not be fetched',
                'error' => $th->getMessage()
            ]);
        }
    }
}
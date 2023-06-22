<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Models\Creator;
use Illuminate\Http\Request;

class CreatorController extends Controller
{
    public static function getCreator($user_id)
    {
        return Creator::where('user_id', $user_id)->first();
    }

    public function dashboard($user_id)
    {
        $creator = $this->getCreator($user_id);
        $subjects = LearnController::getSubjects();
        $contents = ContentController::getContentsByUserId($user_id);

        if ($contents)
            $contents->map(function ($content) {
                return [
                    'subjectInfo' => $content->subjectInfo,
                    'content' => $content
                ];
            });

        if ($creator)
            return ResponseHelper::success([
                'name' => $creator->userInfo->username,
                'email' => $creator->userInfo->email,
                'details' => $creator,
                'subjects' => $subjects,
                'contents' => $contents
            ]);

        return ResponseHelper::error("Creator not found");

    }

    public function creatorContentSubmit(Request $request)
    {
        return ContentController::saveContent($request);
    }

    public function contentDetails($content_id, Request $request)
    {
        $content = ContentController::getContent($content_id);

        if ($content)
            return ResponseHelper::success([
                'content' => $content,
                'contents' => ContentController::getContentsByUserId($request->user_id)
            ]);

        return ResponseHelper::error("Content not found");
    }


}
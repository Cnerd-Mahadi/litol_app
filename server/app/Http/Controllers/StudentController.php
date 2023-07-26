<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Http\Services\CommonServices;
use App\Http\Services\StudentServices;
use App\Http\Services\UserServices;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    private $commonService;
    private $studentService;
    private $userService;
    public function __construct(CommonServices $commonService, StudentServices $studentService, UserServices $userService)
    {
        $this->commonService = $commonService;
        $this->studentService = $studentService;
        $this->userService = $userService;
    }

    public function usernameCheck(Request $request)
    {
        return $this->userService->checkUniqueUser($request->username);
    }

    public function emailCheck(Request $request)
    {
        return $this->userService->checkUniqueEmail($request->email);
    }

    public function subjects()
    {
        try {
            $subjects = $this->commonService->getSubjects();
            if ($subjects)
                return ResponseHelper::success(
                    $subjects
                );

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'Subject could not be fetched',
                'error' => $th->getMessage()
            ]);
        }
    }

    public function contentsBySubject(Request $request, $subject)
    {
        try {
            $contents = $this->studentService->getContentsbySubject($subject);
            if ($contents)
                return ResponseHelper::success(
                    $contents
                );
            else {
                return ResponseHelper::success("Content not found");
            }

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'Content could not be fetched',
                'error' => $th->getMessage()
            ]);
        }
    }

    public function contentDetails($content_id)
    {
        try {
            $content = $this->studentService->getContent($content_id);
            $contents = $this->studentService->getContentsbySubject($content->data->subject);
            if ($content)
                return ResponseHelper::success([
                    'content' => $content,
                    'contents' => $contents
                ]);

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'Content could not be fetched',
                'error' => $th->getMessage()
            ]);
        }
    }
}
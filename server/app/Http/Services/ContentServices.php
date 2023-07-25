<?php

namespace App\Http\Services;

use App\Helpers\ResponseHelper;
use App\Rules\BeUniqueTitle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContentServices
{
    private $firebaseService;
    private $commonService;

    public function __construct()
    {
        $this->firebaseService = app()->make(FirebaseServices::class);
        $this->commonService = app()->make(CommonServices::class);
    }

    public function saveContent(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255', new BeUniqueTitle('contents')],
            'image' => 'required|image',
            'details' => 'required|string',
        ]);

        if ($validator->fails()) {
            return ResponseHelper::error($validator->errors());
        }

        $content = [
            'updated' => date("F j, Y, g:i a"),
            'subject' => $request->subject,
            'title' => $request->title,
            'details' => $request->details,
            'authorId' => $request->authorId,
        ];

        try {
            $this->commonService->saveImageWithData($content, $request, 'CONTENT', 'contents');
            return ResponseHelper::success('Content created successfully');

        } catch (\Throwable $th) {
            return ResponseHelper::error($th->getMessage());
        }
    }
    public function getContent($content_id)
    {
        return $this->firebaseService->getDocumentWithImage($content_id, 'contents');
    }

}
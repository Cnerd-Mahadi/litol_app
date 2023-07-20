<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Http\Services\ContentServices;
use App\Http\Services\CreatorServices;
use App\Rules\BeUniqueTitle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContentController extends Controller
{
    private $contentService;
    private $creatorService;

    public function __construct(CreatorServices $creatorService, ContentServices $contentService)
    {
        $this->contentService = $contentService;
        $this->creatorService = $creatorService;
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

        try {
            $this->contentService->saveContent($request);
            return ResponseHelper::success('Content created successfully');

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'Content could not be created',
                'error' => $th->getMessage()
            ]);
        }
    }

    public function contentDetails($content_id, Request $request)
    {
        try {
            $content = $this->contentService->getContent($content_id);
            $contents = $this->creatorService->getContentbyCreator($request->user_id);

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
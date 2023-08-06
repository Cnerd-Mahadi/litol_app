<?php

namespace App\Http\Services;

use App\Helpers\ResponseHelper;
use App\Rules\BeUniqueTitle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SummaryServices
{
    private $firebaseService;
    private $commonService;
    public function __construct()
    {
        $this->firebaseService = app()->make(FirebaseServices::class);
        $this->commonService = app()->make(CommonServices::class);
    }

    public function saveSummary(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255', new BeUniqueTitle('summaries', $request->user_id)],
            'image' => 'required|image',
            'details' => 'required|string',
            'keywords' => 'required|array',
            'keywords.*' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return ResponseHelper::error($validator->errors());
        }

        $summary = [
            'title' => $request->title,
            'updated' => date("F j, Y, g:i a"),
            'details' => $request->details,
            'keywords' => $request->keywords,
            'authorId' => $request->user_id
        ];
        try {
            $this->commonService->saveImageWithData($summary, $request, 'SUMMARY', 'summaries');
            return ResponseHelper::success('Summary created successfully');

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'Summary could not be created',
                'error' => $th->getMessage()
            ]);
        }
    }
    public function getSummariesByUserId($creatorId)
    {
        return $this->commonService->getContentsfromAuthor($creatorId, 'summaries');
    }

    public function getSummary($summary_id)
    {
        return $this->firebaseService->getDocumentWithImage($summary_id, 'summaries');
    }
}
<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Http\Services\SummaryServices;
use Illuminate\Http\Request;

class SummaryController extends Controller
{
    private $summaryService;

    public function __construct(SummaryServices $summaryService)
    {
        $this->summaryService = $summaryService;
    }

    public function submitSummary(Request $request)
    {
        return $this->summaryService->saveSummary($request);
    }

    public function summaries($user_id)
    {
        try {
            $summaries = $this->summaryService->getSummariesByUserId($user_id);
            return ResponseHelper::success([
                'summaries' => $summaries
            ]);

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'Summaries could not be fetched',
                'error' => $th->getMessage()
            ]);
        }
    }

    public function summaryDetails($summary_id)
    {
        try {
            $summary = $this->summaryService->getSummary($summary_id);
            $summaries = $this->summaryService->getSummariesByUserId($summary->data->authorId);

            if ($summary)
                return ResponseHelper::success([
                    'summary' => $summary,
                    'summaries' => $summaries
                ]);

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'Summary could not be fetched',
                'error' => $th->getMessage()
            ]);
        }
    }
}
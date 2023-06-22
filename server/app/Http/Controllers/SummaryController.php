<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Models\Keyword;
use App\Models\Summary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SummaryController extends Controller
{

    public static function getSummariesByUserId($user_id)
    {
        return Summary::where('user_id', $user_id)->get();
    }

    public static function getSummary($summary_id)
    {
        return Summary::where('summary_id', $summary_id)->first();
    }

    public static function saveSummary(Request $request)
    {

        $data = [
            'title' => $request->title,
            'image' => $request->image,
            'details' => $request->details,
            'keywords' => json_decode($request->keywords)->keys
        ];

        $validator = Validator::make($data, [
            'title' => 'required|string|max:255|unique:contents',
            'image' => 'required|image',
            'details' => 'required|string',
            'keywords' => 'required|array',
            'keywords.*' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return ResponseHelper::error($validator->errors());
        }

        try {
            $summary = new Summary();
            $summary->updated = date("F j, Y, g:i a");
            $summary->title = $request->title;
            $summary->image = "blank-init";
            $summary->details = $request->details;
            $summary->user_id = $request->user_id;
            $summary->save();
            $summary_id = $summary->id;

            try {
                foreach ($data['keywords'] as $item) {
                    $keyword = new Keyword();
                    $keyword->summary_id = $summary_id;
                    $keyword->keyword = $item;
                    $keyword->save();
                }

                self::saveSummaryImage($summary_id, $request);

                return ResponseHelper::success('Summary created successfully');

            } catch (\Throwable $th) {
                return ResponseHelper::error("Keywords could not be created");
            }

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'Summary could not be created',
                'error' => $th->getMessage()
            ]);
        }

    }

    public static function saveSummaryImage($summary_id, $request)
    {
        try {
            $imageName = "IMG_SUMMARY_ID_" . $summary_id . "." . $request->file('image')->getClientOriginalExtension();
            Summary::where('summary_id', $summary_id)
                ->update(['image' => $imageName]);
            $request->file('image')->storeAs('public/summary', $imageName);

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'Image was not saved',
                'error' => $th->getMessage()
            ]);
        }
    }
}
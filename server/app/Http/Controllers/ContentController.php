<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Models\Content;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContentController extends Controller
{

    public static function getContentsByUserId($user_id)
    {
        return Content::where('user_id', $user_id)->get();
    }

    public static function getContent($content_id)
    {
        return Content::where('content_id', $content_id)->first();
    }

    public static function saveContent(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255|unique:contents',
            'image' => 'required|image',
            'details' => 'required|string',
        ]);

        if ($validator->fails()) {
            return ResponseHelper::error($validator->errors());
        }

        try {
            $content = new Content();
            $content->updated = date("F j, Y, g:i a");
            $content->subject_id = $request->subject_id;
            $content->title = $request->title;
            $content->image = "blank-init";
            $content->details = $request->details;
            $content->user_id = $request->user_id;
            $content->save();

            $content_id = $content->id;
            self::saveContentImage($content_id, $request);

            return ResponseHelper::success('Content created successfully');

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'Content could not be created',
                'error' => $th->getMessage()
            ]);
        }
    }

    public static function saveContentImage($content_id, $request)
    {
        try {
            $imageName = "IMG_CONTENT_ID_" . $content_id . "." . $request->file('image')->getClientOriginalExtension();
            Content::where('content_id', $content_id)
                ->update(['image' => $imageName]);
            $request->file('image')->storeAs('public/content', $imageName);

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'Image was not saved',
                'error' => $th->getMessage()
            ]);
        }
    }


}
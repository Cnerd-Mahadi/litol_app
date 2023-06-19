<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Models\MindMap;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MindMapController extends Controller
{

    public static function getMindMapsByUserId($user_id)
    {
        return MindMap::where('user_id', $user_id)->get();
    }

    public static function getMindMap($mindmap_id)
    {
        return MindMap::where('mindmap_id', $mindmap_id)->first();
    }

    public static function saveMindMap(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255|unique:contents',
            'image' => 'required|image',
        ]);

        if ($validator->fails()) {
            return ResponseHelper::error($validator->errors());
        }

        try {
            $mindmap = new MindMap();
            $mindmap->updated = date("F j, Y, g:i a");
            $mindmap->title = $request->title;
            $mindmap->image = "blank-init";
            $mindmap->user_id = $request->user_id;
            $mindmap->save();

            $mindmap_id = $mindmap->id;
            self::saveMindMapImage($mindmap_id, $request);

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'MindMap could not be created',
                'error' => $th->getMessage()
            ]);
        }
    }

    public static function saveMindMapImage($mindmap_id, $request)
    {
        try {
            $imageName = "IMG_MINDMAP_ID_" . $mindmap_id . "." . $request->file('image')->getClientOriginalExtension();
            MindMap::where('mindmap_id', $mindmap_id)
                ->update(['image' => $imageName]);
            $request->file('image')->storeAs('public/mindmap', $imageName);

            return ResponseHelper::success('MindMap created successfully');

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'Image was not saved',
                'error' => $th->getMessage()
            ]);
        }
    }

}
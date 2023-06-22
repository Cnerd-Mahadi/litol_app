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

        $data = [
            'title' => $request->title,
            'nodes' => json_decode($request->nodes),
            'edges' => json_decode($request->edges)
        ];

        $validator = Validator::make($data, [
            'title' => 'required|string|max:255|unique:contents',
            'nodes' => 'required|array',
            'edges' => 'required|array',
        ]);

        if ($validator->fails()) {
            return ResponseHelper::error($validator->errors());
        }

        try {
            $mindmap = new MindMap();
            $mindmap->title = $request->title;
            $mindmap->updated = date("F j, Y, g:i a");
            $mindmap->nodes = json_encode($data['nodes']);
            $mindmap->edges = json_encode($data['edges']);
            $mindmap->user_id = $request->user_id;
            $mindmap->save();

            return ResponseHelper::success('MindMap created successfully');

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'MindMap could not be created',
                'error' => $th->getMessage()
            ]);
        }
    }

    public static function updateMindMap(Request $request)
    {

        $data = [
            'title' => $request->title,
            'nodes' => json_decode($request->nodes),
            'edges' => json_decode($request->edges)
        ];

        $validator = Validator::make($data, [
            'title' => 'required|string|max:255|unique:contents',
            'nodes' => 'required|array',
            'edges' => 'required|array',
        ]);

        if ($validator->fails()) {
            return ResponseHelper::error($validator->errors());
        }

        try {
            MindMap::where('mindmap_id', $request->mindmap_id)
                ->update([
                    'title' => $request->title,
                    'updated' => date("F j, Y, g:i a"),
                    'nodes' => json_encode($data['nodes']),
                    'edges' => json_encode($data['edges']),
                    'user_id' => $request->user_id
                ]);

            return ResponseHelper::success('MindMap updated successfully');

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'MindMap could not be updated',
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
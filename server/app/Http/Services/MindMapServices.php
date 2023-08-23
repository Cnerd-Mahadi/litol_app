<?php

namespace App\Http\Services;

use App\Helpers\ResponseHelper;
use App\Rules\BeUniqueTitle;
use App\Rules\BeUniqueTitleUpdated;
use App\Rules\CheckJson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MindMapServices
{
    private $firebaseService;
    public function __construct()
    {
        $this->firebaseService = app()->make(FirebaseServices::class);
    }
    public function getMindMapsByUserId($creatorId)
    {
        $mindmapsSnap = $this->firebaseService->getCollection('mindmaps')->where('authorId', '==', $creatorId)->documents();
        return $this->firebaseService->getData($mindmapsSnap);
    }

    public function getMindMap($mindmap_id)
    {
        return $this->firebaseService->getDocument($mindmap_id, 'mindmaps');
    }

    public function saveMindMap(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255', new BeUniqueTitle('mindmaps', $request->user_id)],
            'nodes' => ['required', new CheckJson()],
            'edges' => ['required', new CheckJson()],
        ]);

        if ($validator->fails()) {
            return ResponseHelper::error($validator->errors());
        }

        $mindmap = [
            'title' => $request->title,
            'updated' => date("F j, Y, g:i a"),
            'nodes' => $request->nodes,
            'edges' => $request->edges,
            'authorId' => $request->user_id
        ];

        try {
            $this->firebaseService->getCollection('mindmaps')->add($mindmap);
            return ResponseHelper::success('MindMap created successfully');

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'MindMap could not be created',
                'error' => $th->getMessage()
            ]);
        }
    }

    public function updateMindMap(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255', new BeUniqueTitleUpdated('mindmaps', $request->user_id, $request->id)],
            'nodes' => ['required', new CheckJson()],
            'edges' => ['required', new CheckJson()],
        ]);

        if ($validator->fails()) {
            return ResponseHelper::error($validator->errors());
        }

        $mindmap = [
            'title' => $request->title,
            'updated' => date("F j, Y, g:i a"),
            'nodes' => $request->nodes,
            'edges' => $request->edges,
            'authorId' => $request->user_id
        ];

        try {
            $this->firebaseService->getCollection('mindmaps')->document($request->mindmap_id)->set($mindmap);
            return ResponseHelper::success('MindMap updated successfully');

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'MindMap could not be updated',
                'error' => $th->getMessage()
            ]);
        }
    }
}
<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Http\Services\MindMapServices;
use Illuminate\Http\Request;

class MindMapController extends Controller
{
    private $mindmapService;

    public function __construct(MindMapServices $mindmapService)
    {
        $this->mindmapService = $mindmapService;
    }

    public function submitMindMap(Request $request)
    {
        return $this->mindmapService->saveMindMap($request);
    }

    public function mindmaps($user_id)
    {
        try {
            $mindmaps = $this->mindmapService->getMindMapsByUserId($user_id);
            return ResponseHelper::success([
                'mindmaps' => $mindmaps
            ]);

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'Mindmaps could not be fetched',
                'error' => $th->getMessage()
            ]);
        }
    }

    public function mindmapDetails($mindmap_id)
    {
        try {
            $mindmap = $this->mindmapService->getMindMap($mindmap_id);
            $mindmaps = $this->mindmapService->getMindMapsByUserId($mindmap->data->authorId);

            if ($mindmap)
                return ResponseHelper::success([
                    'mindmap' => $mindmap,
                    'mindmaps' => $mindmaps
                ]);

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'MindMap could not be fetched',
                'error' => $th->getMessage()
            ]);
        }
    }

    public function updateMindMap(Request $request)
    {
        return $this->mindmapService->updateMindMap($request);
    }
}
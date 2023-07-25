<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Http\Services\FeynmanServices;
use Illuminate\Http\Request;

class FeynmanController extends Controller
{
    private $feynmanService;

    public function __construct(FeynmanServices $feynmanService)
    {
        $this->feynmanService = $feynmanService;
    }

    public function requestFeynman(Request $request)
    {
        return $this->feynmanService->requestFeynman($request);
    }

    public function feynmen()
    {
        try {
            $feynmen = $this->feynmanService->getFeynmen();
            if ($feynmen)
                return ResponseHelper::success(
                    $feynmen
                );
            else {
                return ResponseHelper::success("Request empty");
            }

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'Feynmen could not be fetched',
                'error' => $th->getMessage()
            ]);
        }
    }

    public function resolveFeynman(Request $request)
    {
        return $this->feynmanService->resolveFeynman($request);
    }
}
<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Models\Feynman;
use App\Models\FeynTicket;
use Illuminate\Http\Request;

class FeynmanController extends Controller
{
    public static function getFeynmen()
    {
        return Feynman::all();
    }

    public static function getFeynmanByContentId($content_id)
    {
        return Feynman::where('content_id', $content_id)->first();
    }

    public static function requestFeynman(Request $request)
    {
        try {
            $positionStatus = self::checkFeynmanPosition($request->content_id, (int) ($request->user_id));
            $feynman_id = -1;

            if ($positionStatus['code'] === 0) {
                try {
                    $feynman = new Feynman();
                    $feynman->updated = date("F j, Y, g:i a");
                    $feynman->content_id = $request->content_id;
                    $feynman->status = 1;
                    $feynman->save();
                    $feynman_id = $feynman->id;
                } catch (\Throwable $th) {
                    return ResponseHelper::error([
                        'message' => 'Feynman could not be created',
                        'error' => $th->getMessage()
                    ]);
                }

                try {
                    $feynTicket = new FeynTicket();
                    $feynTicket->feynman_id = $feynman_id;
                    $feynTicket->slot_A = $request->user_id;
                    $feynTicket->save();

                    return ResponseHelper::success("Slot A was booked successfully");

                } catch (\Throwable $th) {
                    return ResponseHelper::error([
                        'message' => "Ticket slot A was not booked",
                        'error' => $th->getMessage()
                    ]);
                }


            } elseif ($positionStatus['code'] === 2) {

                try {
                    $feynTicket = $positionStatus['item'];
                    FeynTicket::where('feynman_id', $feynTicket->feynman_id)
                        ->update(['slot_B' => $request->user_id]);

                    return ResponseHelper::success("Slot B was booked successfully");

                } catch (\Throwable $th) {
                    return ResponseHelper::error([
                        'message' => "Ticket slot B was not booked",
                        'error' => $th->getMessage()
                    ]);
                }

            } elseif ($positionStatus['code'] === 3) {

                try {
                    $feynTicket = $positionStatus['item'];
                    FeynTicket::where('feynman_id', $feynTicket->feynman_id)
                        ->update(['slot_C' => $request->user_id]);

                    return ResponseHelper::success("Slot C was booked successfully");

                } catch (\Throwable $th) {
                    return ResponseHelper::error([
                        'message' => "Ticket slot C was not booked",
                        'error' => $th->getMessage()
                    ]);
                }

            } elseif ($positionStatus['code'] === 4) {

                try {
                    $feynTicket = $positionStatus['item'];
                    FeynTicket::where('feynman_id', $feynTicket->feynman_id)
                        ->update(['slot_D' => $request->user_id]);

                    Feynman::where('feynman_id', $feynTicket->feynman_id)
                        ->update(['status' => 0]);

                    return ResponseHelper::success("Slot D was booked successfully");

                } catch (\Throwable $th) {
                    return ResponseHelper::error([
                        'message' => "Ticket slot D was not booked",
                        'error' => $th->getMessage()
                    ]);
                }

            } else {
                return ResponseHelper::error("Already requested from this id");
            }

        } catch (\Throwable $th) {
            return ResponseHelper::error($th->getMessage());
        }
    }

    public static function resolveFeynman(Request $request)
    {

        try {
            // Resolve the mail part

            Feynman::where('feynman_id', $request->feynman_id)->delete();
            return ResponseHelper::success("Feynman request resolved successfully");

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => "Feynman request could not be resolved",
                'error' => $th->getMessage()
            ]);
        }
    }

    public static function checkFeynmanPosition($content_id, $user_id)
    {
        $isExistingContent = Feynman::where('content_id', $content_id)
            ->where('status', 1)->first();

        if ($isExistingContent) {

            $feyTicket = FeynTicket::where('feynman_id', $isExistingContent->feynman_id)->first();

            if (!$feyTicket->slot_B && $feyTicket->slot_A !== $user_id)
                return [
                    "code" => 2,
                    "item" => $feyTicket,
                ];
            elseif (!$feyTicket->slot_C && $feyTicket->slot_A !== $user_id && $feyTicket->slot_B !== $user_id)
                return [
                    "code" => 3,
                    "item" => $feyTicket
                ];
            elseif (!$feyTicket->slot_D && $feyTicket->slot_A !== $user_id && $feyTicket->slot_B !== $user_id && $feyTicket->slot_C !== $user_id)
                return [
                    "code" => 4,
                    "item" => $feyTicket
                ];
            else
                return [
                    "code" => -1,
                    "item" => null
                ];
        }

        return [
            "code" => 0,
            "item" => null
        ];

    }
}
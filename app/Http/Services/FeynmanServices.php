<?php

namespace App\Http\Services;

use App\Helpers\ResponseHelper;
use App\Mail\ConfirmationMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class FeynmanServices
{
    private $firebaseService;
    public function __construct()
    {
        $this->firebaseService = app()->make(FirebaseServices::class);
    }
    public function getFeynmen()
    {
        $feynmenSnap = $this->firebaseService->getCollection('feynmen')->documents();
        return $this->firebaseService->getData($feynmenSnap);
    }

    public function getFeynmanByContentId($content_id)
    {
        return $this->firebaseService->getDocument($content_id, 'feynmen');
    }

    public function requestFeynman($request)
    {
        $feynmanSnap = $this->firebaseService->getCollection('feynmen')
            ->where('contentId', '==', $request->content_id)
            ->documents();
        $feynman = $this->firebaseService->getData($feynmanSnap);

        if (!$feynman) {
            $user = $this->firebaseService->getDocument($request->user_id, 'users');
            $subject = $this->firebaseService->getDocument($request->content_id, 'contents')->data->subject;
            return $this->addFeynman($request, $user, $subject);

        } else {
            $user = $this->firebaseService->getDocument($request->user_id, 'users');

            if ($feynman->data->status == false)
                return ResponseHelper::success('Sorry already requested from this user');

            if ($feynman->data->status == 1 && $feynman->data->slots->A->userId != $request->user_id)
                return $this->updateFeynman($user, $feynman->id, 2, 'B');
            else if ($feynman->data->status == 2 && $feynman->data->slots->A->userId != $request->user_id && $feynman->data->slots->B->userId != $request->user_id)
                return $this->updateFeynman($user, $feynman->id, 3, 'C');
            else if ($feynman->data->status == 3 && $feynman->data->slots->A->userId != $request->user_id && $feynman->data->slots->B->userId != $request->user_id && $feynman->data->slots->C->userId != $request->user_id)
                return $this->updateFeynman($user, $feynman->id, false, 'D');
            else {
                return ResponseHelper::success('Sorry already requested from this user');
            }
        }
    }

    public function addFeynman($request, $user, $subject)
    {
        $feynman = [
            'updated' => date("F j, Y, g:i a"),
            'contentId' => $request->content_id,
            'subject' => $subject,
            'status' => 1,
            'slots' => [
                'A' => [
                    'userId' => $user->id,
                    'username' => $user->data->username,
                    'email' => $user->data->email
                ]
            ]
        ];
        try {
            $this->firebaseService->getCollection('feynmen')->add($feynman);
            return ResponseHelper::success('Feynman created successfully');

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'Feynman could not be created',
                'error' => $th->getMessage()
            ]);
        }
    }

    public function updateFeynman($user, $documentId, $status, $slotPoint)
    {
        try {
            $this->firebaseService->getCollection('feynmen')->document($documentId)->update([
                ['path' => 'status', 'value' => $status],
                ['path' => 'updated', 'value' => date("F j, Y, g:i a")],
                [
                    'path' => 'slots.' . $slotPoint,
                    'value' => [
                        'userId' => $user->id,
                        'username' => $user->data->username,
                        'email' => $user->data->email
                    ]
                ]
            ]);
            return ResponseHelper::success('Feynman updated at slot ' . $slotPoint . ' successfully');

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'Feynman could not be updated at slot ' . $slotPoint,
                'error' => $th->getMessage()
            ]);
        }
    }

    public function resolveFeynman(Request $request)
    {
        try {
            // $this->firebaseService->getCollection('feynmen')->document($request->feynman_id)->delete();

            Mail::to(['mahadidroid@gmail.com'])
                ->queue(new ConfirmationMail($this->firebaseService->getDocument($request->user_id, 'users')));
            return ResponseHelper::success("Feynman request resolved successfully");

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => "Feynman request could not be resolved",
                'error' => $th->getMessage()
            ]);
        }
    }
}
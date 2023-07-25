<?php

namespace App\Http\Services;

use App\Helpers\ResponseHelper;
use App\Mail\ConfirmationMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use stdClass;

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
        $meetingData = new stdClass();
        $meetingData->id = $request->feynman_id;
        $meetingData->resolverName = $request->resolver;
        $meetingData->topic = $request->topic;
        $meetingData->subject = $request->subject;
        $meetingData->link = $request->link;
        $meetingData->time = $request->time;

        try {
            $feynmanRequest = $this->firebaseService->getDocument($request->feynman_id, 'feynmen');
            $emailList = $this->createEmailList($feynmanRequest->data->slots);
            foreach ($emailList as $recipient) {
                Mail::to($recipient->email)
                    ->queue(new ConfirmationMail($recipient->username, $meetingData));
            }
            $this->firebaseService->getCollection('feynmen')->document($request->feynman_id)->delete();

            return ResponseHelper::success("Feynman request resolved successfully");

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => "Feynman request could not be resolved",
                'error' => $th->getMessage()
            ]);
        }
    }

    public function createEmailList($feynmanSlots)
    {
        $emailList = array();

        if (isset($feynmanSlots->A)) {
            $emailList[] = $feynmanSlots->A;
        }
        if (isset($feynmanSlots->B)) {
            $emailList[] = $feynmanSlots->B;
        }
        if (isset($feynmanSlots->C)) {
            $emailList[] = $feynmanSlots->C;
        }
        if (isset($feynmanSlots->D)) {
            $emailList[] = $feynmanSlots->D;
        }

        return $emailList;
    }
}
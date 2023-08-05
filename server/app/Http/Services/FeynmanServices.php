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
        $feynman = $this->checkRequested($request);
        $user = $this->firebaseService->getDocument($request->user_id, 'users');

        if ($feynman->found)
            return ResponseHelper::success([
                'accepted' => false,
                'message' => 'Sorry already requested from this user',
            ]);
        else {
            if (!$feynman->status || $feynman->status === 0)
                return $this->addFeynman($request, $user);
            else {
                if ($feynman->status === 1)
                    return $this->updateFeynman($user, $feynman->feynmanId, 2, 'B');
                else if ($feynman->status === 2)
                    return $this->updateFeynman($user, $feynman->feynmanId, 3, 'C');
                else if ($feynman->status === 3)
                    return $this->updateFeynman($user, $feynman->feynmanId, false, 'D');
            }
        }
    }

    public function checkRequested($request)
    {
        $feynmanSnap = $this->firebaseService->getCollection('feynmen')
            ->where('contentId', '==', $request->content_id)
            ->documents();
        $feynman = $this->firebaseService->getData($feynmanSnap);

        if (sizeof($feynman) === 0) {
            return $this->firebaseService->snapToObject([
                'found' => false,
                'status' => 0
            ]);

        } else {
            $status = true;
            $feynmanId = -1;
            foreach ($feynman as $feynmanItem) {
                $slots = $feynmanItem->data->slots;
                $feynmanId = $feynmanItem->id;
                $status = $feynmanItem->data->status;

                if (isset($slots->A) && ($slots->A->userId === $request->user_id))
                    return $this->firebaseService->snapToObject([
                        'found' => true,
                    ]);
                else if (isset($slots->B) && ($slots->B->userId === $request->user_id))
                    return $this->firebaseService->snapToObject([
                        'found' => true,
                    ]);
                else if (isset($slots->C) && ($slots->C->userId === $request->user_id))
                    return $this->firebaseService->snapToObject([
                        'found' => true,
                    ]);
                else if (isset($slots->D) && ($slots->D->userId === $request->user_id))
                    return $this->firebaseService->snapToObject([
                        'found' => true,
                    ]);
            }
            return $this->firebaseService->snapToObject([
                'found' => false,
                'status' => $status,
                'feynmanId' => $feynmanId
            ]);
        }
    }

    public function addFeynman($request, $user)
    {
        $feynman = [
            'updated' => date("F j, Y, g:i a"),
            'contentId' => $request->content_id,
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
            return ResponseHelper::success([
                'accepted' => true,
                'message' => 'Feynman session requested successfully',
            ]);

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
            return ResponseHelper::success([
                'accepted' => true,
                'message' => 'Feynman updated at slot ' . $slotPoint . ' successfully',
            ]);

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
<?php

namespace App\Http\Services;

use App\Helpers\ResponseHelper;
use App\Rules\BeUniqueTitle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NoteServices
{

    private $firebaseService;
    private $commonService;

    public function __construct()
    {
        $this->firebaseService = app()->make(FirebaseServices::class);
        $this->commonService = app()->make(CommonServices::class);
    }

    public function saveNote(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255', new BeUniqueTitle('notes', $request->user_id)],
            'details' => 'required|string',
            'cues' => 'required|array',
            'cues.*.key' => 'required|string|max:255',
            'cues.*.details' => 'required|string',
        ]);

        if ($validator->fails()) {
            return ResponseHelper::error($validator->errors());
        }

        $note = [
            'title' => $request->title,
            'updated' => date("F j, Y, g:i a"),
            'details' => $request->details,
            'cues' => $request->cues,
            'authorId' => $request->user_id
        ];
        try {
            $this->firebaseService->getCollection('notes')->add($note);
            return ResponseHelper::success('Note created successfully');

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'Note could not be created',
                'error' => $th->getMessage()
            ]);
        }

    }

    public function getNotesByUserId($creatorId)
    {
        $notesSnap = $this->firebaseService->getCollection('notes')->where('authorId', '==', $creatorId)->documents();
        return $this->firebaseService->getData($notesSnap);
    }

    public function getNote($note_id)
    {
        return $this->firebaseService->getDocument($note_id, 'notes');
    }
}
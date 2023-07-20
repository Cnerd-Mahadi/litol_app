<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Http\Services\NoteServices;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    private $noteService;

    public function __construct(NoteServices $noteService)
    {
        $this->noteService = $noteService;
    }
    public function submitNote(Request $request)
    {
        return $this->noteService->saveNote($request);
    }

    public function notes($user_id)
    {
        try {
            $notes = $this->noteService->getNotesByUserId($user_id);
            return ResponseHelper::success([
                'notes' => $notes
            ]);

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'Notes could not be fetched',
                'error' => $th->getMessage()
            ]);
        }
    }

    public function noteDetails($note_id)
    {
        try {
            $note = $this->noteService->getNote($note_id);
            $notes = $this->noteService->getNotesByUserId($note->data->authorId);

            if ($note)
                return ResponseHelper::success([
                    'note' => $note,
                    'notes' => $notes
                ]);

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'Note could not be fetched',
                'error' => $th->getMessage()
            ]);
        }
    }
}
<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Models\Note;
use App\Models\NoteDetails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NoteController extends Controller
{
    public static function getNotesByUserId($user_id)
    {
        return Note::where('user_id', $user_id)->get();
    }

    public static function getNote($note_id)
    {
        return Note::where('note_id', $note_id)->first();
    }

    public static function saveNote(Request $request)
    {

        $data = [
            'title' => $request->title,
            'cues' => json_decode($request->note_details, true)['value']
        ];

        $validator = Validator::make($data, [
            'title' => 'required|string|max:255|unique:contents',
            'cues' => 'required|array',
            'cues.*.key' => 'required|string|max:255',
            'cues.*.details' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return ResponseHelper::error($validator->errors());
        }

        try {
            $note = new Note();
            $note->updated = date("F j, Y, g:i a");
            $note->title = $request->title;
            $note->user_id = $request->user_id;
            $note->save();
            $note_id = Note::where('title', $request->title)->first()->note_id;

            try {
                foreach ($data['cues'] as $item) {
                    $cue = new NoteDetails();
                    $cue->note_id = $note_id;
                    $cue->key = $item['key'];
                    $cue->details = $item['details'];
                    $cue->save();
                }

                return ResponseHelper::success('Note created successfully');

            } catch (\Throwable $th) {
                return ResponseHelper::error([
                    'message' => 'Cue could not be created',
                    'error' => $th->getMessage()
                ]);
            }

        } catch (\Throwable $th) {
            return ResponseHelper::error(
                [
                    'message' => 'Note could not be created',
                    'error' => $th->getMessage()
                ]
            );
        }

    }
}
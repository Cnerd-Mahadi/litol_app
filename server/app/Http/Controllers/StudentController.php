<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Models\FeynTicket;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{

    public static function getStudent($user_id)
    {
        $student = Student::where('user_id', $user_id)->first();

        if ($student)
            return ResponseHelper::success([
                'name' => $student->userInfo->username,
                'email' => $student->userInfo->email,
                'details' => $student,
            ]);

        return ResponseHelper::error("Student not found");
    }

    public function dashboard($user_id)
    {
        return $this->getStudent($user_id);
    }

    public function subjects()
    {
        $subjects = LearnController::getSubjects();

        if ($subjects)
            return ResponseHelper::success(
                $subjects
            );

        return ResponseHelper::error("Subjects not found");
    }

    public function contentsBySubject($subject_id)
    {
        $contents = LearnController::getContents($subject_id);

        if ($contents)
            return ResponseHelper::success(
                $contents
            );

        return ResponseHelper::error("Contents not found");
    }

    public function contentDetails($content_id)
    {
        $content = LearnController::getContent($content_id);

        if ($content)
            return ResponseHelper::success([
                'content' => $content,
                'contents' => LearnController::getContents($content->subject_id)
            ]);

        return ResponseHelper::error("Content not found");
    }

    public function submitSummary(Request $request)
    {
        return SummaryController::saveSummary($request);
    }

    public function summaries($user_id)
    {
        $summaries = SummaryController::getSummariesByUserId($user_id);

        if ($summaries)
            return ResponseHelper::success(
                SummaryController::getSummariesByUserId($user_id)
            );

        return ResponseHelper::error("Summaries not found");
    }

    public function summaryDetails($summary_id)
    {
        $summary = SummaryController::getSummary($summary_id);

        if ($summary)
            return ResponseHelper::success([
                'summary' => [
                    'keywords' => $summary->keywordInfo,
                    'details' => $summary
                ],
                'summaries' => SummaryController::getSummariesByUserId($summary->user_id)
            ]);

        return ResponseHelper::error("Summary not found");
    }

    public function submitMindMap(Request $request)
    {
        return MindMapController::saveMindMap($request);
    }

    public function mindmaps($user_id)
    {
        $mindmaps = MindMapController::getMindMapsByUserId($user_id);

        if ($mindmaps)
            return ResponseHelper::success(
                MindMapController::getMindMapsByUserId($user_id)
            );

        return ResponseHelper::error("MindMaps not found");
    }

    public function mindmapDetails($mindmap_id)
    {
        $mindmap = MindMapController::getMindMap($mindmap_id);

        if ($mindmap)
            return ResponseHelper::success([
                'mindmap' => MindMapController::getMindMap($mindmap_id),
                'mindmaps' => MindMapController::getMindMapsByUserId($mindmap->user_id)
            ]);

        return ResponseHelper::error("MindMap not found");
    }

    public function updateMindMap(Request $request)
    {
        return MindMapController::updateMindMap($request);
    }

    public function submitNote(Request $request)
    {
        return NoteController::saveNote($request);
    }

    public function notes($user_id)
    {
        $notes = NoteController::getNotesByUserId($user_id);

        if ($notes)
            return ResponseHelper::success(
                NoteController::getNotesByUserId($user_id)
            );

        return ResponseHelper::error("Notes not found");
    }

    public function noteDetails($note_id)
    {
        $note = NoteController::getNote($note_id);

        if ($note)
            return ResponseHelper::success([
                'note' => [
                    'cue' => $note->detailsInfo,
                    'details' => $note
                ],
                'notes' => NoteController::getNotesByUserId($note->user_id)
            ]);

        return ResponseHelper::error("Note not found");
    }

    public function requestFeynman(Request $request)
    {
        return FeynmanController::requestFeynman($request);
    }

    public function feynmen()
    {
        $feynAll = FeynmanController::getFeynmen();

        $feynmen = $feynAll->map(function ($feynman) {
            $fticketUsers = FeynTicket::where('feynman_id', $feynman->feynman_id)->first();
            $content = ContentController::getContent($feynman->content_id);
            $subject = $content->subjectInfo;
            return [
                'slotA' => $fticketUsers->userSlotA,
                'slotB' => $fticketUsers->userSlotB,
                'slotC' => $fticketUsers->userSlotC,
                'slotD' => $fticketUsers->userSlotD,
                'details' => [
                    'feynman_id' => $feynman->feynman_id,
                    'subject' => $subject,
                    'content' => $content
                ]
            ];
        });

        if ($feynmen)
            return ResponseHelper::success(
                $feynmen
            );

        return ResponseHelper::error("Feynmen not found");
    }

    public function resolveFeynman(Request $request)
    {
        return FeynmanController::resolveFeynman($request);
    }


}
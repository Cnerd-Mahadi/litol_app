<?php

namespace App\Http\Controllers;

use App\Models\Content;
use App\Models\Subject;

class LearnController extends Controller
{

    public static function getSubjects()
    {
        return Subject::all();
    }

    public static function getContents($subject_id)
    {
        return Content::where('subject_id', $subject_id)->get();

    }

    public static function getContent($content_id)
    {
        return Content::where('content_id', $content_id)->first();
    }

}
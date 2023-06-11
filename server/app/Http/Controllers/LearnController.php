<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Models\Subject;
use App\Models\Topic;
use Symfony\Component\HttpFoundation\Request;

class LearnController extends Controller
{

    public function learn()
    {
        $subjects = Subject::all();
        return $subjects;
    }

    public function subject(Request $request)
    {
        $topics = Topic::where('subject_id', $request->input("subject_id"))->get();
        return $topics;
    }

    public function topic(Request $request){
        $topic = Topic::where('topic_id', $request->input("topic_id"))->first();
        return $topic;
    }

}

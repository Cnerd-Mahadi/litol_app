<?php

namespace App\Http\Controllers;

use App\Models\Summary;
use Illuminate\Http\Request;
use stdClass;

class RetainController extends Controller
{
    public function retain()
    {
        return view('student.retain');
    }

    public function summary()
    {
        $summaries = Summary::all();
        return $summaries;

    }

    public function summarySubmit(Request $request){

        $summary = new Summary();
        $summary->title = $request->title;
        $summary->image = "A";
        $summary->detail = $request->detail;
        $summary->student_id = $request->student_id;
        $summary->save();


        $summaryTemp = Summary::where('detail', $summary->detail)->first();

        $imageName = "IMG_SUMMARY_ID_".$summaryTemp->summary_id.".".$request->file('image')->getClientOriginalExtension();
        Summary::where('summary_id', $summaryTemp->summary_id)
                                ->update(['image' => $imageName]);

        $request->file('image')->storeAs('public/summary', $imageName);

        return $request;


    }

    public function summaryDetail(Request $request){
        $summary = Summary::where('summary_id', $request->input("summary_id"))->first();
        $summaries = Summary::where('student_id', $request->input("student_id"))->get();
        $object = new stdClass();
        $object->content = $summary;
        $object->contents = $summaries;
        $object->creator = $summary->student->user->username;
        return $object;
    }

}

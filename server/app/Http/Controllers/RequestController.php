<?php

namespace App\Http\Controllers;

use App\Models\Request;
use App\Models\RequestSession;

class RequestController extends Controller
{
    public function requestShow()
    {
        return view('student.request_gallery');
    }

    public function reqSession($id)
    {
        $studentId = session()->get('profile')->student_id;
        $requests = Request::all();

        foreach ($requests as $req) {

            if($req->topic_id == $id){

               if($req->rs->rid_a != null && $req->rs->rid_b != null && $req->rs->rid_c != null && $req->rs->rid_d != null){

                $this->createSession($id);
                return redirect()->route('request');
               }

               else{

                if($req->rs->rid_a != $studentId && $req->rs->rid_b != $studentId && $req->rs->rid_c != $studentId && $req->rs->rid_d != $studentId){

                    if($req->rs->rid_a == null){
                        RequestSession::where('session_id', $req->session_id)
                                ->update(['rid_a' => $studentId]);
                                return redirect()->route('request');
                    }
                    else if($req->rs->rid_b == null){
                        RequestSession::where('session_id', $req->session_id)
                                ->update(['rid_a' => $studentId]);
                                return redirect()->route('request');
                    }

                    else if($req->rs->rid_c == null){
                        RequestSession::where('session_id', $req->session_id)
                                ->update(['rid_a' => $studentId]);
                                return redirect()->route('request');
                    }

                    else if($req->rs->rid_d == null){
                        RequestSession::where('session_id', $req->session_id)
                                ->update(['rid_a' => $studentId]);
                        return redirect()->route('request');
                    }


                }
                else{
                    return redirect()->route('request');
                }
               }
            }

        }

        $this->createSession($id);
        return redirect()->route('request');

    }

    public function createSession($tId)
    {

        $reqSession = new RequestSession();
        $reqSession->rid_a = session()->get('profile')->student_id;
        $reqSession->save();

        $req = new Request();
        $req->topic_id = $tId;
        $req->session_id = RequestSession::latest()->first()->session_id;

    }
}

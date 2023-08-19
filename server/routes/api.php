<?php

use App\Http\Controllers\ContentController;
use App\Http\Controllers\FeynmanController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\MindMapController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\SignUpController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\SummaryController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// This is just the working or not test

Route::get('/test', function () {
    return "<h1>Well Hello There, API IN TESTED</h1>";
});

// API starts from here

Route::post('/login', [LogController::class, 'loginSubmit']);
Route::post('/signUp', [SignUpController::class, 'signUpSubmit']);


// Route::get('/student/subjects', [StudentController::class, 'subjects'])->middleware('validStudent');
// Route::get('/student/subject/{subject_id}', [StudentController::class, 'contentsBySubject'])->middleware('validStudent');
// Route::get('/student/content/{content_id}', [StudentController::class, 'contentDetails'])->middleware('validStudent');
Route::get('/student/usernameCheck', [StudentController::class, 'usernameCheck']);
Route::get('/student/emailCheck', [StudentController::class, 'emailCheck']);
Route::get('/student/titleCheck', [ContentController::class, 'titleCheck'])->middleware('validStudent');
Route::get('/student/titleUpdateCheck', [ContentController::class, 'titleCheckUpdated'])->middleware('validStudent');



Route::post('/student/submitSummary', [SummaryController::class, 'submitSummary'])->middleware('validStudent');
Route::get('/student/summaries/{user_id}', [SummaryController::class, 'summaries'])->middleware('validStudent');
Route::get('/student/summary/{summary_id}', [SummaryController::class, 'summaryDetails'])->middleware('validStudent');


Route::post('/student/submitMindMap', [MindMapController::class, 'submitMindMap'])->middleware('validStudent');
Route::post('/student/updateMindMap', [MindMapController::class, 'updateMindMap'])->middleware('validStudent');
Route::get('/student/mindmaps/{user_id}', [MindMapController::class, 'mindmaps'])->middleware('validStudent');
Route::get('/student/mindmap/{mindmap_id}', [MindMapController::class, 'mindmapDetails'])->middleware('validStudent');


Route::post('/student/submitNote', [NoteController::class, 'submitNote'])->middleware('validStudent');
Route::get('/student/notes/{user_id}', [NoteController::class, 'notes'])->middleware('validStudent');
Route::get('/student/note/{note_id}', [NoteController::class, 'noteDetails'])->middleware('validStudent');


Route::get('/student/feynman/request', [FeynmanController::class, 'requestFeynman'])->middleware('validStudent');
Route::get('/student/feynman/requestCheck', [FeynmanController::class, 'checkRequested'])->middleware('validStudent');
Route::get('/student/feynmen', [FeynmanController::class, 'feynmen'])->middleware('validStudent');
Route::get('/student/feynman/resolve', [FeynmanController::class, 'resolveFeynman'])->middleware('validStudent');


// Route::get('/creator/dashboard/{user_id}', [CreatorController::class, 'dashboard'])->middleware('validCreator');
// Route::post('/creator/submitContent', [ContentController::class, 'saveContent'])->middleware('validCreator');
// Route::get('/creator/contentDetails/{content_id}', [ContentController::class, 'contentDetails'])->middleware('validCreator');

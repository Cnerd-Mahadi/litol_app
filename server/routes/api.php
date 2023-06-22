<?php

use App\Http\Controllers\CreatorController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\SignUpController;
use App\Http\Controllers\StudentController;
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


Route::post('/login', [LogController::class, 'loginSubmit']);
Route::post('/signUp', [SignUpController::class, 'signUpSubmit']);


Route::get('/student/dashboard/{user_id}', [StudentController::class, 'dashboard'])->middleware('validStudent');


Route::get('/student/subjects', [StudentController::class, 'subjects'])->middleware('validStudent');
Route::get('/student/subject/{subject_id}', [StudentController::class, 'contentsBySubject'])->middleware('validStudent');
Route::get('/student/content/{content_id}', [StudentController::class, 'contentDetails'])->middleware('validStudent');


Route::post('/student/submitSummary', [StudentController::class, 'submitSummary'])->middleware('validStudent');
Route::get('/student/summaries/{user_id}', [StudentController::class, 'summaries'])->middleware('validStudent');
Route::get('/student/summary/{summary_id}', [StudentController::class, 'summaryDetails'])->middleware('validStudent');


Route::post('/student/submitMindMap', [StudentController::class, 'submitMindMap'])->middleware('validStudent');
Route::post('/student/updateMindMap', [StudentController::class, 'updateMindMap'])->middleware('validStudent');
Route::get('/student/mindmaps/{user_id}', [StudentController::class, 'mindmaps'])->middleware('validStudent');
Route::get('/student/mindmap/{mindmap_id}', [StudentController::class, 'mindmapDetails'])->middleware('validStudent');


Route::post('/student/submitNote', [StudentController::class, 'submitNote'])->middleware('validStudent');
Route::get('/student/notes/{user_id}', [StudentController::class, 'notes'])->middleware('validStudent');
Route::get('/student/note/{note_id}', [StudentController::class, 'noteDetails'])->middleware('validStudent');


Route::get('/student/feynman/request', [StudentController::class, 'requestFeynman'])->middleware('validStudent');
Route::get('/student/feynmen', [StudentController::class, 'feynmen'])->middleware('validStudent');
Route::get('/student/feynman/resolve', [StudentController::class, 'resolveFeynman'])->middleware('validStudent');


Route::get('/creator/dashboard/{user_id}', [CreatorController::class, 'dashboard'])->middleware('validCreator');
Route::post('/creator/submitContent', [CreatorController::class, 'creatorContentSubmit'])->middleware('validCreator');
Route::get('/creator/contentDetails/{content_id}', [CreatorController::class, 'contentDetails'])->middleware('validCreator');
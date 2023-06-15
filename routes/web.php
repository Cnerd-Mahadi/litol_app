<?php

use App\Http\Controllers\CreatorController;
use App\Http\Controllers\LearnController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\RetainController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\CourseController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    // if($request->cookie('remember') != null){
    //     if ($request->session()->get('roleCheck') == "STUDENT")
    //         return redirect()->route('studentDash');
    //     else
    //     return redirect()->route('creatorDash');
    // }
    return view('login');
});

Route::get('/about', function () {
    return view('about');
})->name('about');

Route::get('/team', function () {
    return view('team');
})->name('team');

Route::get('/testimonial', function () {
    return view('testimonial');
})->name('testimonial');




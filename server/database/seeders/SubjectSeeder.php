<?php

namespace Database\Seeders;

use App\Models\Subject;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $subject = new Subject();
        $subject->subject_id = 1;
        $subject->subject_name = "physics";
        $subject->save();

        $subject = new Subject();
        $subject->subject_id = 2;
        $subject->subject_name = "math";
        $subject->save();

        $subject = new Subject();
        $subject->subject_id = 3;
        $subject->subject_name = "cs";
        $subject->save();
    }
}

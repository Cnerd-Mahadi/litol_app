<?php

namespace Database\Seeders;

use App\Models\Student;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $student = new Student();
        $student->user_id = 1;
        $student->age = "25";
        $student->gender = "male";
        $student->dob = "12-10-1999";
        $student->phone = "0123456789";
        $student->address = "Dhaka-Bashundhara RA";
        $student->save();

    }
}

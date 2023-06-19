<?php

namespace Database\Seeders;

use App\Models\Creator;
use Illuminate\Database\Seeder;

class CreatorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $creator = new Creator();
        $creator->user_id = 2;
        $creator->age = "45";
        $creator->gender = "male";
        $creator->dob = "12-10-1979";
        $creator->phone = "0123456789";
        $creator->bio = "In the end we all are some walking dead";
        $creator->save();
    }
}

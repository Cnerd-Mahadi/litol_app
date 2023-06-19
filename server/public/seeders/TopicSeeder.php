<?php

namespace Database\Seeders;

use App\Models\Topic;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TopicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $topic = new Topic();
        $topic->title = "Amorto";
        $topic->image = "AS";
        $topic->detail = "ASD SAD SASD";
        $topic->subject_id = 1;
        $topic->save();
    }
}

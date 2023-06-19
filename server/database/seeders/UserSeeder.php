<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $userStudent = new User();
        $userStudent->user_id = 1;
        $userStudent->username = "Mahadi";
        $userStudent->email = "mahadidroid@gmail.com";
        $userStudent->password = "123";
        $userStudent->role_id = 1;
        $userStudent->save();

        $userStudent = new User();
        $userStudent->user_id = 2;
        $userStudent->username = "Cnerd";
        $userStudent->email = "Cnerd@gmail.com";
        $userStudent->password = "12345";
        $userStudent->role_id = 2;
        $userStudent->save();

    }
}

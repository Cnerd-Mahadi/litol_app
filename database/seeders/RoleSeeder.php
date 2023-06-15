<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $studentRole = new Role();
        $studentRole->role_name = "STUDENT";
        $studentRole->save();

        $creatorRole = new Role();
        $creatorRole->role_name = "CREATOR";
        $creatorRole->save();
    }
}

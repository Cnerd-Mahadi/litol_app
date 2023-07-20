<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function roleInfo()
    {
        return $this->hasOne(Role::class, 'role_id', 'role_id');
    }

    public function studentInfo()
    {
        return $this->hasOne(Student::class, 'user_id', 'user_id');
    }

    public function creatorInfo()
    {
        return $this->hasOne(Creator::class, 'user_id', 'user_id');
    }

}
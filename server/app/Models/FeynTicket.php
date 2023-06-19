<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeynTicket extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function userSlotA()
    {
        return $this->hasOne(User::class, 'user_id', 'slot_A');

    }

    public function userSlotB()
    {
        return $this->hasOne(User::class, 'user_id', 'slot_B');

    }

    public function userSlotC()
    {
        return $this->hasOne(User::class, 'user_id', 'slot_C');

    }

    public function userSlotD()
    {
        return $this->hasOne(User::class, 'user_id', 'slot_D');

    }
}
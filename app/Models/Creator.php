<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Creator extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function user()
    {
        return $this->hasOne(User::class, 'user_id', 'user_id');
    }

    public function contents()
    {
        return $this->hasMany(Content::class, 'creator_id', 'creator_id');
    }
}

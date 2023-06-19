<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MindMap extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function userInfo()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}

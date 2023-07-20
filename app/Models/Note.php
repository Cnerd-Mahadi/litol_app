<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function detailsInfo()
    {
        return $this->hasMany(NoteDetails::class, 'note_id', 'note_id');
    }
    public function userInfo()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}
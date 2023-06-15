<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function subject()
    {
        return $this->hasOne(Subject::class, 'subject_id', 'subject_id');
    }
}

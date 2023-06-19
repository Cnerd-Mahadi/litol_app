<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function subjectInfo()
    {
        return $this->belongsTo(Subject::class, 'subject_id', 'subject_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestSession extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function studenta()
    {
        return $this->belongsTo(Student::class, 'student_id', 'rid_a');
    }
    public function studentb()
    {
        return $this->belongsTo(Student::class, 'student_id', 'rid_b');
    }
    public function studentc()
    {
        return $this->belongsTo(Student::class, 'student_id', 'rid_c');
    }
    public function studentd()
    {
        return $this->belongsTo(Student::class, 'student_id', 'rid_d');
    }
}

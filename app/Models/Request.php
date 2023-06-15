<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function rs()
    {
        return $this->hasOne(RequestSession::class, 'session_id', 'session_id');
    }

    public function topic()
    {
        return $this->hasOne(Topic::class, 'topic_id', 'topic_id');
    }
}

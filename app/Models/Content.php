<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function topic()
    {
        return $this->hasOne(Topic::class, 'topic_id', 'topic_id');
    }
}

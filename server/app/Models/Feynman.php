<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feynman extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function contentInfo()
    {
        return $this->hasOne(Content::class, 'content_id', 'content_id');
    }
}
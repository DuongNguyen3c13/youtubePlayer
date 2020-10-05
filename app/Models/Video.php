<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    protected $fillable = [
        'name',
        'thumbnail',
        'link',
    ];

    public function toArray()
    {
        return [
            $this->id,
            $this->name,
            $this->link,
            $this->thumbnail,
        ];
    }
}

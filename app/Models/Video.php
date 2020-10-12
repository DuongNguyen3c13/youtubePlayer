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
            'id' => $this->id,
            'name' => $this->name,
            'url' => $this->link,
            'thumbnail' => $this->thumbnail,
        ];
    }
}

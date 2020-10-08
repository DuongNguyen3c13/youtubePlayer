<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Banner extends Model
{
    protected $fillable = [
        'link',
        'type',
    ];

    public function toArray() : array
    {
        return [
            'id' => $this->id,
            'link' => $this->link,
            'type' => $this->parseType($this->type),
        ];
    }

    private function parseType($type)
    {
        $bannerTypes = [
            'small',
            'large',
        ];

        return $bannerTypes[$type];
    }
}

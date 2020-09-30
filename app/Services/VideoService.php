<?php

namespace App\Services;

use App\Models\Video;
use App\Services\Interfaces\VideoServiceInterface;

class VideoService implements VideoServiceInterface
{
    public function store(array $data)
    {
        return Video::create($data);
    }
}

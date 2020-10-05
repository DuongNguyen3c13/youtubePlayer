<?php

namespace App\Services;

use App\Models\Video;
use App\Services\Interfaces\VideoServiceInterface;

class VideoService implements VideoServiceInterface
{
    const PER_PAGE = 20;

    public function store(array $data)
    {
        return Video::create($data);
    }

    public function list()
    {
        $videos = Video::orderByDesc('created_at')->paginate(self::PER_PAGE);

        return $videos->toArray();
    }

    public function show(int $id)
    {
        $video =  Video::find($id);

        return $video->toArray();
    }

    public function update(array $requests, int $id)
    {
        return Video::where('id', $id)->update($requests);
    }

    public function delete(int $id)
    {
        $video = Video::find($id);
        if (!is_null($video)) {
            $video->delete();
            return true;
        }

        return false;
    }
}

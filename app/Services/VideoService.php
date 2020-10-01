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
        $array = [];
        $videos = Video::orderByDesc('created_at')->paginate(self::PER_PAGE);

        foreach ($videos as $key => $video) {
            $array[] = [
                $video->id,
                $video->name,
                $video->link,
                $video->thumbnail,
            ];
        }

        return [
            'lastPage' => $videos->lastPage(),
            'currentPage' => $videos->currentPage(),
            'lastPageUrl' => $videos->previousPageUrl(),
            'nextPageUrl' => $videos->nextPageUrl(),
            'path' => $videos->path() . '?page=',
            'videos' => $array
        ];
    }
}

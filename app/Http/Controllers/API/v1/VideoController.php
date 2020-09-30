<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Requests\VideoStoreRequest;
use App\Services\Interfaces\VideoServiceInterface;

class VideoController extends BaseController
{
    public function __construct(VideoServiceInterface $videoService)
    {
        $this->service = $videoService;
    }

    public function store(VideoStoreRequest $request)
    {
        $data = $request->toArray();
        $video = $this->service->store($data);

        if ($video) {
            return success($video);
        }
        return fail([]);
    }
}

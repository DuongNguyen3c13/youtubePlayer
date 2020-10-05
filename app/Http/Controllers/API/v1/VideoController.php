<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Requests\VideoStoreRequest;
use App\Services\Interfaces\VideoServiceInterface;
use Illuminate\Http\Request;

class VideoController extends BaseController
{
    public function __construct(VideoServiceInterface $videoService)
    {
        $this->service = $videoService;
    }

    public function store(VideoStoreRequest $request)
    {
        $requests = $request->only('name', 'link', 'thumbnail');
        $video = $this->service->store($requests);

        if ($video) {
            return success($video);
        }
        return fail([]);
    }

    public function list()
    {
        $videos = $this->service->list();

        return success($videos);
    }

    public function delete(Request $request, $id)
    {
        $videoDelete = $this->service->delete($id);

        if ($videoDelete) {
            $videos = $this->service->list();

            return success($videos);
        }

        return fail([]);
    }

    public function show($id)
    {
        $video = $this->service->show($id);

        return success($video);
    }

    public function update(VideoStoreRequest $request, $id)
    {
        $requests = $request->only('name', 'link', 'thumbnail');
        $video = $this->service->update($requests, $id);

        if ($video) {
            return success([]);
        }
        return fail([]);
    }
}

<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Requests\BannerStoreRequest;
use App\Services\Interfaces\BannerServiceInterface;
use Illuminate\Http\Request;

class BannerController extends BaseController
{
    public function __construct(BannerServiceInterface $bannerService)
    {
        $this->service = $bannerService;
    }

    public function store(BannerStoreRequest $request)
    {
        $requests = $request->only('type');
        $files = $request->file('files');
        $bannersSaved = $this->service->store($requests, $files);

        if ($bannersSaved) {
            return success([]);
        }
        return fail([]);
    }

    public function list()
    {
        $banners = $this->service->list();

        return success($banners);
    }

    public function delete(Request $request, $id)
    {
        $bannerDelete = $this->service->delete($id);

        if ($bannerDelete) {
            $banners = $this->service->list();

            return success($banners);
        }

        return fail([]);
    }

    public function show($id)
    {
        $video = $this->service->show($id);

        return success($video);
    }

    public function update(BannerStoreRequest $request, $id)
    {
        $requests = $request->only('type');
        $files = $request->file('files');
        $currentBanner =  $this->service->show($id);
        $banner = $this->service->update($requests, $files, $currentBanner);

        if ($banner) {
            return success([]);
        }
        return fail([]);
    }
}

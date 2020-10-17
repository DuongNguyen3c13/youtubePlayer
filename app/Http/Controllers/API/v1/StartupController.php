<?php

namespace App\Http\Controllers\API\v1;

use Illuminate\Http\Request;
use App\Services\Interfaces\VideoServiceInterface;
use App\Services\Interfaces\BannerServiceInterface;
use App\Models\Banner;

class StartupController extends BaseController
{
    public function __construct(VideoServiceInterface $videoService, BannerServiceInterface $bannerService)
    {
        $this->videoService = $videoService;
        $this->bannerService = $bannerService;
    }

    public function index() {
        $videos = $this->videoService->get();
        $smallBanners = $this->bannerService->get(Banner::TYPE_SMALL);
        $bigBanners = $this->bannerService->get(Banner::TYPE_LARGE);
        $placeHolderVideo = "https://vjs.zencdn.net/v/oceans.mp4"

        return success(compact('videos', 'smallBanners', 'bigBanners', 'placeHolderVideo'));
    }
}

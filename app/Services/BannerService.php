<?php

namespace App\Services;

use App\Models\Banner;
use App\Services\Interfaces\BannerServiceInterface;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class BannerService implements BannerServiceInterface
{
    const PER_PAGE = 20;
    const BANNER_DIR = 'banner';

    public function store(array $data, $files)
    {
        if (is_null($files)) {
            return false;
        }

        foreach ($files as $file) {
            $fileName = self::BANNER_DIR . '/' . Carbon::now()->format('Ymdhmi') . '_' . $file->getClientOriginalName();
            try {
                $saved = Storage::disk('public_storage')->put($fileName, file_get_contents($file->getRealPath()));
                if (!$saved) {
                    return false;
                }
                Banner::create(['link' => $fileName, 'type' => $this->parseType($data['type'])]);
            } catch (\Exception $e) {
                return false;
            }
        }

        return true;
    }

    public function list()
    {
        $banners = Banner::orderByDesc('created_at')->paginate(self::PER_PAGE);

        return $banners->toArray();
    }

    public function show(int $id)
    {
        $banner =  Banner::find($id);

        return $banner->toArray();
    }

    public function update(array $data, $files, array $currentBanner)
    {
        foreach ($files as $file) {
            $fileName = self::BANNER_DIR . '/' . Carbon::now()->format('Ymdhmi') . '_' . $file->getClientOriginalName();
            try {
                $saved = Storage::disk('public_storage')->put($fileName, file_get_contents($file->getRealPath()));
                if (!$saved) {
                    return false;
                }
                Banner::where('id', $currentBanner['id'])->update(
                    [
                        'type' => $this->parseType($data['type']),
                        'link' => $fileName
                    ]
                );
            } catch (\Exception $e) {
                return false;
            }
        }
        if (!is_null($files)) {
            Storage::disk('public_storage')->delete($currentBanner['link']);
        }

        return true;
    }

    public function delete(int $id)
    {
        $banner = Banner::find($id);
        if (!is_null($banner)) {
            $banner->delete();
            return true;
        }

        return false;
    }

    private function parseType($key)
    {
        $types = [
            'small' => 0,
            'large' => 1,
        ];

        return $types[$key];
    }
}

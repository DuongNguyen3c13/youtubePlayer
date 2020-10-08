<?php

namespace App\Providers;

use App\Services\BannerService;
use App\Services\Interfaces\BannerServiceInterface;
use Illuminate\Support\ServiceProvider;

use App\Services\Interfaces\VideoServiceInterface;
use App\Services\VideoService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->singleton(VideoServiceInterface::class, function() {
            return new VideoService();
        });
        $this->app->singleton(BannerServiceInterface::class, function() {
            return new BannerService();
        });
    }
}

<?php

namespace App\Services\Interfaces;

interface BannerServiceInterface
{
    public function list();
    public function store(array $requests, $files);
    public function show(int $id);
    public function update(array $requests, $files, array $currentBanner);
    public function delete(int $id);
}

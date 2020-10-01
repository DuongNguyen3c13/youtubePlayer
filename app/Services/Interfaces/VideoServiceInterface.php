<?php

namespace App\Services\Interfaces;

interface VideoServiceInterface
{
    public function list();
    public function store(array $data);
}

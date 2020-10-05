<?php

namespace App\Services\Interfaces;

interface VideoServiceInterface
{
    public function list();
    public function store(array $requests);
    public function show(int $id);
    public function update(array $requests, int $id);
    public function delete(int $id);
}

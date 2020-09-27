<?php

namespace App\Guards;

use Firebase\JWT\JWT;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Http\Request;

class GhostUserGuard implements Guard
{
    protected $request;
    protected $provider;
    protected $user;

    public function __construct(UserProvider $provider, Request $request)
    {
        $this->request = $request;
        $this->provider = $provider;
        $this->user = NULL;
    }

    /**
     * Determine if the current user is authenticated.
     *
     * @return bool
     */
    public function check()
    {
        return $this->validate();
    }

    /**
     * Determine if the current user is a guest.
     *
     * @return bool
     */
    public function guest()
    {
        return !$this->check();
    }

    /**
     * Get the currently authenticated user.
     *
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function user()
    {
        if (! is_null($this->user)) {
            return $this->user;
        }
    }

    /**
     * Get the JSON params from the current request
     *
     * @return string
     */
    public function getCookieFromRequest()
    {
        return $this->request->cookie('admin_token');
    }

    /**
     * Get the ID for the currently authenticated user.
     *
     * @return string|null
     */
    public function id()
    {
        if ($user = $this->user()) {
            return $this->user()->id;
        }
    }

    /**
     * @param array $credentials
     * @return bool|void
     */
    public function validate(array $credentials=[])
    {
        if (empty($credentials)) { //no ghost login
            $token = $this->getCookieFromRequest();
            if (empty($token)) {
                return false;
            }
            $decoded = JWT::decode($token, env('JWT_KEY'), array('HS256'));
            if(!$decoded || empty($decoded->uid)) {
                return false;
            }
            $user = $this->provider->retrieveById($decoded->uid);
            if(is_null($user)){
                return false;
            }
            $this->setUser($user);
            return true;
        }
        return false;
    }

    /**
     * @param Authenticatable $user
     * @return $this|void
     */
    public function setUser(Authenticatable $user)
    {
        $this->user = $user;

        return $this;
    }
}

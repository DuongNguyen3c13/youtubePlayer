<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Carbon\Carbon;
use Firebase\JWT\JWT;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/songs';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function authenticated(Request $request, $user)
    {
        $key = env('JWT_KEY');
        $payload = array(
            "uid" => $user->id,
            "exp" => Carbon::now()->addDay()->timestamp
        );

        /**
         * IMPORTANT:
         * You must specify supported algorithms for your application. See
         * https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40
         * for a list of spec-compliant algorithms.
         */
        $jwt = JWT::encode($payload, $key);
        Cookie::queue('admin_token', $jwt);
        return redirect($this->redirectTo);
    }

    public function loggedOut()
    {
        Cookie::queue('admin_token', '');
        return redirect('/login');
    }
}

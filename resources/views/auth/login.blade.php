@extends('layouts.app')
<link href="{{ asset('css/login.css') }}" rel="stylesheet">
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>
    <style>
        html {
            background-color: #232323;
        }
        .card-body {
            color: #fff;
            margin: 100px auto;
            text-align: center;
            font-size: 18px;
        }
        .card-body .form-group {
            width: 400px;
            margin: 0 auto;
        }
        .card-body img {
            width: 200px;
            margin-bottom: 80px;
        }
        .card-body label {
            margin-bottom: 10px;
            float: left;
        }
        .card-body input {
            border-radius: 10px;
            height: 40px;
            width: 400px;
            margin-bottom: 20px;
            outline: none;
            padding-left: 10px;
            padding-right: 10px;
        }
        .card-body button {
            width: 400px;
            height: 40px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            border: none;
            background-color: #ff3129;
            color: #fff;
            font-size: 18px;
        }
        .card-body button:focus {
            outline: none;
        }
    </style>
</head>
<body>
<div id="app">
    <main class="py-4">
        @yield('content')
    </main>
</div>
</body>
</html>
@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8" style="margin-top:20px;display: flex;flex-direction: column;justify-content: center;align-items: center;">
                <img src="/imgs/logo.png" width="450" />
                <h1 style="color:white;margin-top: 50px;">Admin Portal</h1>
            </div>
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <form method="POST" action="{{ route('login') }}">
                            @csrf
                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                                    @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>

                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">

                                    @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-12">
                                    <button type="submit" class="btn btn-primary">
                                        {{ __('Login') }}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

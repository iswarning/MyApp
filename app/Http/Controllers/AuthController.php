<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class AuthController extends Controller
{
    public function login()
    {
        if(!Auth::check())
            return view('auth.login');
        else
            return view('home');
    }

    public function postLogin(Request $request)
    {
        Auth::attempt([
            'email' => $request->email,
            'password' => $request->password
        ]);

        app('App\Models\User')->createToken(Auth::id());
        return view('home');
    }

    public function logout()
    {
        Auth::logout();
        return view('home');
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LandingPage extends Controller
{
    public function index()
    {
        return view('landingPage.index');
    }

    public function about()
    {
        return view('landingPage.about');
    }

    public function contact()
    {
        return view('landingPage.contact');
    }

    public function services()
    {
        return view('landingPage.services');
    }
}

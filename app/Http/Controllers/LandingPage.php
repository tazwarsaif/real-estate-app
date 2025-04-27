<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingPage extends Controller
{
    public function index()
    {
        $approvedReviews = \App\Models\Review::where('status', 'approved')->inRandomOrder()->get();
        $totalprojects = Project::count();
        $residentialProjects = Project::where('type', 'Residential')->count();
        $commercialProjects = Project::where('type', 'Commercial')->count();
        $mostRatedProjects = Project::withAvg('reviews', 'rating')
    ->orderBy('reviews_avg_rating', 'desc')
    ->take(4)
    ->get()
    ->map(function ($project) {
        $project->image_path = asset('storage/' . $project->image_path);
        return $project;
    });
        return inertia('Home',[
            'reviews' => $approvedReviews,
            'totalprojects' => $totalprojects,
            'residentialProjects' => $residentialProjects,
            'commercialProjects' => $commercialProjects,
            'mostRatedProjects' => $mostRatedProjects,
        ]);
    }

    public function about()
    {
        return inertia('About');
    }

    public function contact()
    {
        return view('landingPage.contact');
    }

    public function services()
    {
        return view('landingPage.services');
    }
    public function projects()
    {
        $projects = Project::withAvg('reviews', 'rating')
            ->orderBy('reviews_avg_rating', 'desc')
            ->get()
            ->map(function ($project) {
                $project->image_path = asset('storage/' . $project->image_path);
                return $project;
            });
        return Inertia::render('Projects', [
            'projects' => $projects,
        ]);
    }
}

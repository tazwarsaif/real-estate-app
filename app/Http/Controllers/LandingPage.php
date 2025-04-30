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
    public function projects(Request $request)
    {
        try {
            if($request->query('search')){
                $projects = Project::withAvg('reviews', 'rating')
                ->where('name', 'like', '%' . $request->query('search') . '%')
                ->orWhere('description', 'like', '%' . $request->query('search') . '%')
                ->orderBy('reviews_avg_rating', 'desc')
                ->get()
                ->map(function ($project) {
                    $project->image_path = asset('storage/' . $project->image_path);
                    $project->additional_images = json_decode($project->additional_images);
                    $project->additional_images = is_array($project->additional_images) ? array_map(function ($image) {
                        return asset('storage/' . $image);
                    }, $project->additional_images) : [];
                    $project->allImages = array_merge([$project->image_path], $project->additional_images);
                    return $project;
                });
                dd($projects, $request->query('category'), $request->query('search'));
                if($request->query('category') == 'Residential'){
                    $projects = $projects->where('type', 'Residential');
                }
                elseif($request->query('category') == 'Commercial'){
                    $projects = $projects->where('type', 'Commercial');
                }
                return Inertia::render('Projects', [
                    'projects' => $projects,
                    'searchPast' => $request->search,
                ]);

            }
            else{
                $projects = Project::withAvg('reviews', 'rating')
            ->orderBy('reviews_avg_rating', 'desc')
            ->get()
            ->map(function ($project) {
                $project->image_path = asset('storage/' . $project->image_path);
                $project->additional_images = json_decode($project->additional_images);
                $project->additional_images = is_array($project->additional_images) ? array_map(function ($image) {
                    return asset('storage/' . $image);
                }, $project->additional_images) : [];
                $project->allImages = array_merge([$project->image_path], $project->additional_images);
                return $project;
            });
            }

        // dd($projects);
        return Inertia::render('Projects', [
            'projects' => $projects,
            'searchPast' => null,
        ]);
        } catch (\Throwable $th) {
            //throw $th;
            return Inertia::render('Projects', [
                'projects' => [],
            ]);
        }
    }
    public function search(Request $request)
    {

            $projects = Project::withAvg('reviews', 'rating')
            ->where('name', 'like', '%' . $request->query('search') . '%')
            ->orWhere('description', 'like', '%' . $request->query('search') . '%')
            ->orderBy('reviews_avg_rating', 'desc')
            ->get()
            ->map(function ($project) {
                $project->image_path = asset('storage/' . $project->image_path);
                $project->additional_images = json_decode($project->additional_images);
                $project->additional_images = is_array($project->additional_images) ? array_map(function ($image) {
                    return asset('storage/' . $image);
                }, $project->additional_images) : [];
                $project->allImages = array_merge([$project->image_path], $project->additional_images);
                return $project;
            });
            return response()->json($projects);

    }
}

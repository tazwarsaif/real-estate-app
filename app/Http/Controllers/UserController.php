<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'message' => 'User index',
        ]);
    }
    public function home()
    {
        try {
            $user = session('user');
            if (!$user) {
                return redirect()->route('user.login')->with('message', 'Please log in first');
            }
            $projects = Project::all();
            return view('users.home', ['projects' => $projects]);
        } catch (\Throwable $th) {
            //throw $th;
        }

    }

    /**
     * Show the form for creating a new resource.
     */

    public function createProject(){
        try {
            $user = session('user');
            if (!$user) {
                return redirect()->route('user.login')->with('message', 'Please log in first');
            }
            return view('users.createProject');
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'An error occurred',
            ], 500);
        }
    }

    public function projectCreate(Request $request)
    {

        // Validate the request
        try {
            if (!$request->session()->has('user')) {
                return redirect()->route('user.login')->with('message', 'Please log in first');
            }
            $validateddata = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'type' => 'required|string|in:Residential,Commercial',
                'image_path' => 'required|image|mimes:jpg,jpeg',
                'additional_images.*' => 'image|mimes:jpg,jpeg',
                'status' => 'required|string|in:Active,Completed',
                'no_of_floors' => 'required|integer',
                'no_of_units' => 'nullable|integer',
                'size' => 'required|integer',
            ]);
            $mainImagePath = null;
            if ($request->hasFile('image_path')) {
                $mainImage = $request->file('image_path');
                $fileName = uniqid() . '.' . $mainImage->getClientOriginalExtension();
                $mainImagePath = $mainImage->storeAs('projects', $fileName,'public');
                $mainImagePath = str_replace('public/', '', $mainImagePath); // Relative path
            }
            $additionalImagePaths = [];
            if ($request->hasFile('additional_images')) {
                foreach ($request->file('additional_images') as $additionalImage) {
                    $fileName = uniqid() . '.' . $additionalImage->getClientOriginalExtension();
                    $path = $additionalImage->storeAs('projects', $fileName, 'public');
                    $additionalImagePaths[] = str_replace('public/', '', $path); // Relative path
                }
            }
            $project = new Project();
            $project->name = $request->input('name');
            $project->description = $request->input('description');
            $project->type = $request->input('type');
            $project->image_path = $mainImagePath; // Main image path
            $project->additional_images = json_encode($additionalImagePaths); // Additional images as JSON
            $project->status = $request->input('status');
            $project->no_of_floors = $request->input('no_of_floors');
            $project->no_of_units = $request->input('no_of_units');
            $project->size = $request->input('size');
            $project->save();
            return redirect()->route('user.home')->with('success', 'Project created successfully!');

        }catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()->withErrors($e->errors())->withInput();
        }catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    public function create()
    {
        return view('users.create');
    }
    public function login()
    {
        if(session('user')) {
            return redirect()->route('user.dashboard', ['id' => session('user.id')]);
        }
        return view('users.login');
    }
    public function loginAfter(Request $request)
    {
        try {
            $user = User::where('username', $request->username)->first();
            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }
            if (!Hash::check($request->password, $user->password)) {
                return response()->json(['message' => 'Invalid credentials'], 401);
            }

            session(['user' => $user->makeHidden(['password'])]);

            return redirect()->route('user.home')
                ->with('message', 'Logged in successfully');
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => 'An error occurred'], 500);
        }
    }

    public function dashboard(string $id)
    {
        $user = session('user');
        if (!$user) {
            return redirect()->route('user.login')->with('message', 'Please log in first');
        }
        return view('users.dashboard', ['user' => $user]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $var = $request->validate([
                'username' => 'required|string|max:255|unique:users',
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:4',
            ]);

            User::create($var);
            return redirect()->route('user.login')->with('success', 'User created successfully.');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()->withErrors($e->errors())->withInput();
        }
    }

    public function logout(Request $request)
    {
        $request->session()->forget('user');
        session()->invalidate();
        $request->session()->flush();

        // Remove the session record from the database
        if ($request->session()->has('id')) {
            DB::table('sessions')->where('id', $request->session()->getId())->delete();
        }

        return redirect()->route('user.login')->with('message', 'Logged out successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function editProjectView(string $id)
    {
        $project = Project::findOrFail($id);
        if (!$project) {
            return redirect()->back()->withErrors(['message' => 'Project not found.']);
        }
        return view('users.editProject', ['project' => $project]);
    }
    public function editProject(Request $request, string $id)
    {

        $new_images = [];
        if($request->has('new_images')) {
            $new_images = $request->new_images;
        }
        // dd(array_merge($images_to_remove, $new_images));
        // Validate the request
        try {
            $user = session('user');
            if (!$user) {
                return redirect()->route('user.login')->with('message', 'Please log in first');
            }
            $project = Project::findOrFail($id);
            if (!$project) {
                return redirect()->back()->withErrors(['message' => 'Project not found.']);
            }
            $validateddata = request()->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'type' => 'required|string|in:Residential,Commercial',
                'image_path' => 'nullable|image|mimes:jpg,jpeg',
                'status' => 'required|string|in:Active,Completed',
                'no_of_floors' => 'required|integer',
                'no_of_units' => 'nullable|integer',
                'size' => 'required|integer',
            ]);
            $mainImagePath = $project->image_path;
            if (request()->hasFile('image_path')) {
                $mainImage = request()->file('image_path');
                $fileName = uniqid() . '.' . $mainImage->getClientOriginalExtension();
                $mainImagePath = $mainImage->storeAs('projects', $fileName, 'public');
                $mainImagePath = str_replace('public/', '', $mainImagePath); // Relative path
                $project->image_path = $mainImagePath;
            }
             // Main image path

            $images_to_remove = $request->images_to_remove;
            $actual_images = json_decode($project->additional_images, true);

            $images_not_in_actual = [];
            foreach ($images_to_remove as $image) {
                $imageIndex = array_search($image, $actual_images);
                if ($imageIndex === true) {
                    $images_not_in_actual[] = $image;
                } else {
                    unset($actual_images[$imageIndex]);
                }
            }
            foreach ($actual_images as $imagePath) {
                $relativePath = str_replace(asset('storage/'), '', $imagePath); // Convert full path to relative
                Storage::disk('public')->delete($relativePath); // Delete the image file physically
            }

            $images_to_addPath = [];
            if (request()->hasFile('new_images')) {
                foreach ($request->file('new_images') as $image) {
                    $fileName = uniqid() . '.' . $image->getClientOriginalExtension();
                    $path = $image->storeAs('projects', $fileName, 'public');
                    $images_to_addPath[] = str_replace('public/', '', $path);
                }
            }

            $project->additional_images = json_encode(array_merge($images_to_remove, $images_to_addPath));
            $project->name = request()->input('name');
            $project->description = request()->input('description');
            $project->type = request()->input('type');
            $project->status = request()->input('status');
            $project->no_of_floors = request()->input('no_of_floors');
            $project->no_of_units = request()->input('no_of_units');
            $project->size = request()->input('size');
            $project->save();
            return redirect()->route('user.home')->with('success', 'Project updated successfully!');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()->withErrors($e->errors())->withInput();
        } catch (\Throwable $th) {
            Log::error('Error updating project: ' . $th->getMessage());
            return redirect()->back()->with('error', 'An unexpected error occurred. Please try again later.');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $validatedData = $request->validate([
                'username' => 'sometimes|string|max:255|unique:users,username,' . $id,
                'name' => 'sometimes|string|max:255',
                'email' => 'sometimes|string|email|max:255|unique:users,email,' . $id,
                'password' => 'sometimes|string|min:4',
            ]);

            $user = User::findOrFail($id);

            if (!Hash::check($request->password, $user->password)) {
                return redirect()->back()->withErrors([
                    'current_password' => 'The provided password does not match our records.',
                ])->withInput();;
            }

            if (isset($validatedData['password'])) {
                $validatedData['password'] = Hash::make($validatedData['password']);
            }

            $user->update($validatedData);

            return redirect()->route('user.dashboard', ['id' => $user->id])
                ->with('success', 'User updated successfully.');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => 'An error occurred'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $project = Project::findOrFail($id);
            $images = json_decode($project->additional_images, true);
            foreach ($images as $imagePath) {
                $relativePath = str_replace(asset('storage/'), '', $imagePath); // Convert full path to relative
                Storage::disk('public')->delete($relativePath); // Delete the image file physically
            }
            $mainImagePath = $project->image_path;
            if ($mainImagePath) {
                $relativePath = str_replace(asset('storage/'), '', $mainImagePath); // Convert full path to relative
                Storage::disk('public')->delete($relativePath); // Delete the image file physically
            }
            $project->delete();
            return redirect()->route('user.home')->with('success', 'Project deleted successfully.');
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return redirect()->back()->withErrors(['message' => 'Project not found.']);
        } catch (\Illuminate\Database\QueryException $e) {
            return redirect()->back()->withErrors(['message' => 'Error deleting project.']);
        }
        catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => 'An error occurred'], 500);
        }
    }
}

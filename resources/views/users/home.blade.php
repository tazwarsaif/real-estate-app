@extends('layouts.admin')

@section('title', 'Home')

@section('content')
    <div class="container text-center mx-auto max-w-xl bg-white p-6 rounded shadow m-6">
        <h1 class="text-2xl font-bold mb-4">Welcome to Home Page</h1>
    </div>
    <div class="container flex justify-center py-4">
        <a href="{{ route('user.createProject') }}" class="btn btn-primary">+Create Project</a>
    </div>
    <div class="bg-white shadow rounded p-4">
        <!-- Display Primary Image -->
        @foreach ($projects as $project)
            <div class="mb-8 p-4 border-b">
                <div class="flex items-center justify-between mb-4">
                    <img src="{{ asset('storage/' . $project->image_path) }}" alt="{{ $project->name }}" class="w-48 h-48 object-cover rounded">
                    <div>
                        <a href="{{ route('user.projectEditView',$project->id) }}" class="btn btn-primary">Edit</a>
                        <form action="{{ route('user.destroyProject', $project->id) }}" method="POST" class="inline">
                            @csrf
                            <button type="submit" class="btn btn-error text-white">Delete</button>
                        </form>
                    </div>

                </div>


                <!-- Project Info -->
                <h3 class="text-xl font-semibold mt-2">{{ $project->name }}</h3>
                <p class="text-gray-600">{{ $project->description }}</p>
                <p class="text-gray-700 mt-2"><strong>Status:</strong> {{ $project->status }}</p>
                <p class="text-gray-700"><strong>Floors:</strong> {{ $project->no_of_floors }}</p>
                <p class="text-gray-700"><strong>Units:</strong> {{ $project->no_of_units ?? 'N/A' }}</p>
                <p class="text-gray-700"><strong>Size:</strong> {{ $project->size }} m<sup>2</sup></p>

                <!-- Additional Images Section -->
                <div class="mt-4">
                    <h4 class="text-lg font-semibold text-indigo-600">Additional Images</h4>
                    <div class="grid grid-cols-3 gap-2 mt-2">
                        @foreach (json_decode($project->additional_images, true) as $image)
                            <img src="{{ asset('storage/' . $image) }}" alt="Additional Image" class="w-24 h-24 object-cover rounded">
                        @endforeach
                    </div>
                </div>
            </div>
        @endforeach

    </div>
@endsection

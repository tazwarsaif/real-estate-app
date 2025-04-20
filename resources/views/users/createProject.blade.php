@extends('layouts.admin')

@section('title', 'Create Project')

@section('content')

<div class="container mx-auto max-w-xl bg-white p-6 rounded shadow m-6">
    <h1 class="text-2xl font-bold mb-4 flex justify-center items-center text-primary">Create New Project</h1>
    <form action="{{ route('user.projectCreate') }}" method="POST" enctype="multipart/form-data" class="flex flex-col justify-start bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        @csrf

        <!-- Project Name -->
        <label for="name" class="pt-4 pb-2 text-1xl">Project Name:</label>
        <input type="text" name="name" id="name" required class="border border-gray-300 rounded px-4 py-2" placeholder="Enter project name" >

        <!-- Description -->
        <label for="description" class="pt-4 pb-2 text-1xl">Description:</label>
        <textarea name="description" id="description" rows="4" class="border border-gray-300 rounded px-4 py-2" placeholder="Enter project name" ></textarea>

        <!-- Type -->
        <label for="type" class="pt-4 pb-2 text-1xl">Type:</label>
        <select name="type" id="type" required class="border border-gray-300 rounded px-4 py-2" placeholder="Enter project name" >
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
        </select>

        <!-- Main Image -->
        <label for="image_path" class="pt-4 pb-2 text-1xl">Main Image:</label>
        <input type="file" name="image_path" id="image_path" accept="image/jpeg" required class="border border-gray-300 rounded px-4 py-2" placeholder="Enter project name" >

        <!-- Additional Images -->
        <label for="additional_images" class="pt-4 pb-2 text-1xl">Additional Images:</label>
        <input type="file" name="additional_images[]" id="additional_images" multiple accept="image/jpeg" class="border border-gray-300 rounded px-4 py-2" placeholder="Enter project name" >

        <!-- Status -->
        <label for="status" class="pt-4 pb-2 text-1xl">Status:</label>
        <select name="status" id="status" required class="border border-gray-300 rounded px-4 py-2" placeholder="Enter project name" >
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
        </select>

        <!-- Number of Floors -->
        <label for="no_of_floors" class="pt-4 pb-2 text-1xl">Number of Floors:</label>
        <input type="number" name="no_of_floors" id="no_of_floors" required class="border border-gray-300 rounded px-4 py-2" placeholder="Enter project name" >

        <!-- Number of Units -->
        <label for="no_of_units" class="pt-4 pb-2 text-1xl">Number of Units:</label>
        <input type="number" name="no_of_units" id="no_of_units" class="border border-gray-300 rounded px-4 py-2" placeholder="Enter project name" >

        <!-- Size -->
        <label for="size" class="pt-4 pb-2 text-1xl">Size (in sq. ft.):</label>
        <input type="number" name="size" id="size" required class="border border-gray-300 rounded px-4 py-2" placeholder="Enter project name" >

        <div class="pt-4">
            <button type="submit" class="btn btn-soft btn-primary w-full">Create Project</button>
        </div>
    </form>
</div>

@endsection

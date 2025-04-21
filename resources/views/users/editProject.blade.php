@extends('layouts.admin')

@section('title', 'Create Project')

@section('content')

<div class="container mx-auto max-w-xl bg-white p-6 rounded shadow m-6">
    <h1 class="text-2xl font-bold mb-4 flex justify-center items-center text-primary">Edit Project</h1>
    <form action="{{ route('user.projectEdit',$project->id) }}" method="POST" enctype="multipart/form-data" class="flex flex-col justify-start bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        @csrf

        <!-- Project Name -->
        <label for="name" class="pt-4 pb-2 text-1xl">Project Name:</label>
        <input type="text" name="name" id="name" required class="border border-gray-300 rounded px-4 py-2" placeholder="Enter project name" value="{{ $project->name }}" >

        <!-- Description -->
        <label for="description" class="pt-4 pb-2 text-1xl">Description:</label>
        <textarea name="description" id="description" rows="4" class="border border-gray-300 rounded px-4 py-2" placeholder="Enter project name">{{ $project->description }}</textarea>

        <!-- Type -->
        <label for="type" class="pt-4 pb-2 text-1xl">Type:</label>
        <select name="type" id="type" required class="border border-gray-300 rounded px-4 py-2">
            @if($project->type == 'Residential')
                <option value="Residential" selected>Residential</option>
            @else
                <option value="Residential">Residential</option>
            @endif

            @if($project->type == 'Commercial')
                <option value="Commercial" selected>Commercial</option>
            @else
                <option value="Commercial">Commercial</option>
            @endif
        </select>

        <!-- Main Image -->
        <!-- Main Image Preview -->
        <div id="main-image-container" class="mb-2 mt-4">
            @if ($project->image_path)
                <img id="main-image-preview" src="{{ asset('storage/' . $project->image_path) }}" alt="Main Image" height="100" width="100">
            @else
                <img id="main-image-preview" src="#" alt="Main Image" height="100" width="100" style="display: none;">
            @endif
        </div>
        <label for="image_path" class="pt-4 pb-2 text-1xl">Main Image:</label>
        <!-- File Input -->
        <input type="file" value="{{ asset('storage/' . $project->image_path) }}" name="image_path" id="image_path" accept="image/jpeg" required class="border border-gray-300 rounded px-4 py-2"
            onchange="previewMainImage(event)" >


        <!-- Additional Images -->
        <label for="additional_images" class="pt-4 pb-2 text-1xl">Additional Images:</label>
        <div class="flex pt-4 space-x-4">
            @foreach (json_decode($project->additional_images) as $index => $image)
                <div class="flex flex-col items-center space-y-2 pb-4">
                    <img src="{{ asset('storage/' . $image) }}" alt="Image {{ $index }}" height="100" width="100">
                    <button type="button" onclick="removeImage('{{ $index }}')" class="btn btn-error text-xs p-4 pt-0 pb-0 mt-0 mb-0">X</button>
                    <input type="hidden" name="images_to_remove[]" value="{{ $index }}" id="remove-{{ $index }}" style="display: none;">
                </div>
            @endforeach
        </div>
        <input type="file" name="new_images[]" id="new_images" multiple
        class="border border-gray-300 rounded px-4 py-2"
        onchange="previewNewImages(event)">

    <!-- Preview container -->
        <div id="new-image-preview" class="flex pt-4 space-x-4"></div>


        <!-- Status -->
        <label for="status" class="pt-4 pb-2 text-1xl">Status:</label>
        <select name="status" id="status" required class="border border-gray-300 rounded px-4 py-2" placeholder="Enter project name" >
            @if ($project->status == 'Active')
                <option value="Active" selected>Active</option>
            @else
                <option value="Active">Active</option>
            @endif
            @if ($project->status == 'Completed')
                <option value="Completed" selected>Completed</option>
            @else
                <option value="Completed">Completed</option>
            @endif
        </select>

        <!-- Number of Floors -->
        <label for="no_of_floors" class="pt-4 pb-2 text-1xl">Number of Floors:</label>
        <input type="number" name="no_of_floors" id="no_of_floors" required class="border border-gray-300 rounded px-4 py-2" placeholder="Enter project name" value="{{ $project->no_of_floors }}" >

        <!-- Number of Units -->
        <label for="no_of_units" class="pt-4 pb-2 text-1xl">Number of Units:</label>
        <input type="number" name="no_of_units" id="no_of_units" class="border border-gray-300 rounded px-4 py-2" placeholder="Enter project name" value="{{ $project->no_of_units }}" >

        <!-- Size -->
        <label for="size" class="pt-4 pb-2 text-1xl">Size (in sq. ft.):</label>
        <input type="number" name="size" id="size" required class="border border-gray-300 rounded px-4 py-2" placeholder="Enter project name" value="{{ $project->size }}" >

        <div class="pt-4">
            <button type="submit" class="btn btn-soft btn-primary w-full">Create Project</button>
        </div>
    </form>
</div>

<script>
    function removeImage(index) {
        console.log('Removing image at index:', index);
    //Find the hidden input field associated with the image
    const hiddenInput = document.getElementById(`remove-${index}`);
    if (hiddenInput) {
        hiddenInput.style.display = 'block'; // Mark the image for removal
    }

    // Optionally, hide the image preview or remove the thumbnail entirely
    const imageThumbnail = hiddenInput.parentElement; // Assuming it's the parent div
    if (imageThumbnail) {
        imageThumbnail.style.display = 'none';
    }
    }
    function previewNewImages(event) {
    const files = event.target.files; // Get the selected files
    const previewContainer = document.getElementById('new-image-preview');
    previewContainer.innerHTML = ''; // Clear previous previews

    for (const file of files) {
        if (!file.type.startsWith('image/')) {
            continue; // Skip non-image files
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            // Create a new img element for preview
            const img = document.createElement('img');
            img.src = e.target.result; // Set the image source to the file's data
            img.alt = file.name;
            img.classList.add('border', 'border-gray-300', 'rounded');
            img.style.height = '100px';
            img.style.width = '100px';

            previewContainer.appendChild(img); // Append to the preview container
        };

        reader.readAsDataURL(file); // Read the file as a data URL
    }
}

function previewMainImage(event) {
    const file = event.target.files[0]; // Get the selected file
    if (!file || !file.type.startsWith('image/')) {
        return; // Skip non-image files
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const imgElement = document.getElementById('main-image-preview');
        imgElement.src = e.target.result; // Set the new image
        imgElement.style.display = 'block'; // Ensure it's visible
    };

    reader.readAsDataURL(file); // Convert file to Data URL for preview
}
</script>

@endsection

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <!-- Tailwind CSS (Optional, can remove if not needed) -->
    {{-- <script src="https://cdn.tailwindcss.com"></script> --}}
    @vite(['resources/css/app.css','resources/js/app.js'])
</head>
<body class="bg-gray-100 flex items-center justify-center h-screen">
    <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 class="text-2xl font-bold mb-4">Register</h1>
        <form action="{{ route('user.loginAfter') }}" method="POST">
            <!-- CSRF Token -->
            @csrf

            <!-- Username -->
            <div class="mb-4">
                <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                <input type="text" id="username" name="username" required
                    class="mt-1 block  border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
            </div>


            <!-- Password -->
            <div class="mb-4">
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" name="password" required
                    class="mt-1 block  border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
            </div>

            <!-- Submit Button -->
            <div>
                <button type="submit"
                    class=" bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-500">
                    Register
                </button>
            </div>
        </form>
    </div>
</body>
</html>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title')</title>
    @vite(['resources/css/app.css', 'resources/js/app.js']) <!-- Tailwind CSS if used -->
</head>
<body class="bg-gray-100 h-full pb-5">
    <!-- Include Navbar -->
    @include('partials.adminNavbar')

    <!-- Main Content -->
    <main class="container mx-auto mt-6">
        @yield('content')
    </main>
</body>
</html>

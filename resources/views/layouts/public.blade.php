<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title')</title>
    @vite(['resources/css/app.css', 'resources/js/app.js']) <!-- Tailwind CSS if used -->
</head>
<body class="pb-5">
    <!-- Include Navbar -->
    @include('partials.navbar')

    <!-- Main Content -->
    <main class="container mx-auto mt-20 px-4">
        @yield('content')
    </main>
</body>
</html>

<nav class="bg-white shadow">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#" class="text-xl font-bold text-indigo-600">Real Estate App</a>
        <div class="hidden md:flex items-center space-x-6">
            <a href={{ route('user.home') }} class="text-gray-700 hover:text-indigo-600 transition">Home</a>
            <a href={{ route('user.dashboard',['id' => session('user')->id]) }} class="text-gray-700 hover:text-indigo-600 transition">Dashboard</a>
            <form action="{{ route('user.logout') }}" method="GET">
                @csrf
                <button type="submit" class="text-gray-700 hover:text-red-500 transition">Logout</button>
            </form>
        </div>
        <!-- Mobile Menu Button -->
        <div class="md:hidden">
            <button id="mobile-menu-toggle" class="text-gray-700 focus:outline-none">
                <!-- Use a heroicon or svg here if needed -->
                ☰
            </button>
        </div>
    </div>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="hidden md:hidden px-4 pb-4">
        <a href={{ route('user.home') }} class="block py-2 text-gray-700 hover:text-indigo-600">Home</a>
        <a href={{ route('user.dashboard',['id' => session('user')->id]) }} class="block py-2 text-gray-700 hover:text-indigo-600">Dashboard</a>
        <form action="{{ route('user.logout') }}" method="GET">
            @csrf
            <button type="submit" class="block w-full text-left py-2 text-gray-700 hover:text-red-500">Logout</button>
        </form>
    </div>
</nav>

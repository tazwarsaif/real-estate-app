
@extends('layouts.admin')
    <!-- Main Content -->
@section('title', 'Dashboard')
@section('content')
    <main class="py-10">

        <div class="container mx-auto px-4 max-w-xl bg-white p-6 rounded shadow">
            @yield('content')

            <form action={{ route('user.update',['id' => $user->id]) }} method="POST" class="space-y-6">
                @csrf

                <!-- Username -->
                <div>
                    <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                    <input type="text" id="username" name="username" required value="{{ $user->username }}"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring focus:ring-indigo-200 focus:border-indigo-500">
                    @error('username')
                        <span class="text-red-500 text-sm">{{ $message }}</span>
                    @enderror
                </div>

                <!-- Name -->
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" id="name" name="name" required value="{{ $user->name  }}"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring focus:ring-indigo-200 focus:border-indigo-500">
                </div>

                <!-- Email -->
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" name="email" required value="{{ $user->email }}"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring focus:ring-indigo-200 focus:border-indigo-500">
                    @error('email')
                        <span class="text-red-500 text-sm">{{ $message }}</span>
                    @enderror
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">password</label>
                    <input type="password" id="password" name="password" required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring focus:ring-indigo-200 focus:border-indigo-500">
                    @error('current_password')
                        <span class="text-red-500 text-sm">{{ $message }}</span>
                    @enderror
                </div>

                <!-- Submit -->
                <div>
                    <button type="submit"
                        class="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-400">
                        Update
                    </button>
                </div>
            </form>
        </div>
    </main>

    <script>
        // Simple toggle for mobile menu
        document.getElementById('mobile-menu-toggle').addEventListener('click', () => {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });
    </script>

@endsection


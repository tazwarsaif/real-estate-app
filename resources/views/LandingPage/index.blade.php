@extends('layouts.public')
    <!-- Main Content -->
@section('title', 'Home Page')
@section('content')
    <div class="container mx-auto px-2 py-10 pt-10 flex justify-between space-x-7">
        <div>
            <img src={{ asset('storage/landing/index.png') }} alt="Building image" class="h-170">
        </div>
        <div class="flex flex-col justify-center items-end w-xl">
            <h1 class="text-4xl font-bold text-right mt-5">find your perfect place to call <h1 class="text-5xl font-bold text-green-700">home</h1></h1>
            <p class="text-right mt-3 text-xl">Whether you're buying, renting, or investing, explore stunning properties handpicked to match your lifestyle. With trusted agents and seamless tools, your dream home is just a few clicks away.</p>
            <div>
                <div class="join mt-4">
                    <div>
                      <label class="input validator join-item">
                        <input type="email" required class="text-xl p-2 py-3"/>
                      </label>
                      <div class="validator-hint hidden">Enter a name of project</div>
                    </div>
                    <button class="btn btn-neutral join-item">Search</button>
                  </div>
            </div>
        </div>
    </div>

    <div class="mt-20">
        <h1 class="text-4xl font-bold text-center mt-5">Featured Listings</h1>
        <div class="grid grid-cols-3 gap-4 mt-5"></div>

        <div class="flex justify-center">
            <div class="stats shadow">
                <div class="stat w-xl">
                  <div class="stat-figure text-primary">
                    <img src={{ asset('storage/landing/houseBuilding.png') }} alt="house Building" height="50" width="50">
                  </div>
                  <div class="stat-title">Total Likes</div>
                  <div class="stat-value text-primary">25.6K</div>
                  <div class="stat-desc">21% more than last month</div>
                </div>

                <div class="stat w-xl">
                  <div class="stat-figure text-accent">
                    <img src={{ asset('storage/landing/commercialBuilding.png') }} alt="commercial building" height="50" width="50">
                  </div>
                  <div class="stat-title">Page Views</div>
                  <div class="stat-value text-accent">2.6M</div>
                  <div class="stat-desc">21% more than last month</div>
                </div>

              </div>
        </div>

    </div>
@endsection

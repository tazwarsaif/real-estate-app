<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Removed parent::boot(); as it does not exist in the parent class

    Route::middleware('api')
        ->prefix('api')
        ->group(base_path('routes/api.php')); // THIS must be here
    }
}

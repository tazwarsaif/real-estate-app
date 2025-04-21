<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

Route::prefix('admin')->group(function(){
    Route::get('/login', [UserController::class, 'login'])->name('user.login');
    Route::post('/login', [UserController::class, 'loginAfter'])->name('user.loginAfter');
    Route::get('/logout', [UserController::class, 'logout'])->name('user.logout');
    Route::get('/register', [UserController::class, 'create'])->name('user.create');
    Route::post('/register', [UserController::class, 'store'])->name('user.store');
    Route::post('/update/{id}', [UserController::class, 'update'])->name('user.update');
    Route::get('/dashboard/{id}', [UserController::class, 'dashboard'])->name('user.dashboard');
    Route::get('/home', [UserController::class, 'home'])->name('user.home');
    Route::get('/create', [UserController::class, 'createProject'])->name('user.createProject');
    Route::post('/create', [UserController::class, 'projectCreate'])->name('user.projectCreate');
    Route::get('/edit/{id}', [UserController::class, 'editProjectView'])->name('user.projectEditView');
    Route::post('/edit/{id}', [UserController::class, 'editProject'])->name('user.projectEdit');
    Route::post('/delete/{id}', [UserController::class, 'destroy'])->name('user.destroyProject');
});



// Route::get('/login', [UserController::class, 'login'])->name('user.login');
// Route::post('/login', [UserController::class, 'loginAfter'])->name('user.loginAfter');
// Route::get('/logout', [UserController::class, 'logout'])->name('user.logout');
// Route::get('/register', [UserController::class, 'create'])->name('user.create');
// Route::post('/register', [UserController::class, 'store'])->name('user.store');
// Route::get('/dashboard/{id}', [UserController::class, 'dashboard'])->name('user.dashboard');

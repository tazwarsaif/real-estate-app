<?php
namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ContactController;

Route::post('/contactpost', [ContactController::class, 'contactPost'])->name('contact.post');
Route::get('/test', function () {
    return ['status' => 'ok'];
});

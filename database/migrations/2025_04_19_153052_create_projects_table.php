<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('type'); // Residential, Commercial, etc.
            $table->string('image_path'); // Store the file path
            $table->json('additional_images')->nullable(); // Store additional images as JSON
            $table->string('status'); // Active, Completed, etc.
            $table->integer('no_of_floors'); // Active, Completed, etc.
            $table->integer('no_of_units')->nullable(); // Active, Completed, etc.
            $table->integer('size'); // Active, Completed, etc.
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};

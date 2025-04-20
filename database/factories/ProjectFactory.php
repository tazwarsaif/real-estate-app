<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->words(3, true), // Random project name
            'description' => $this->faker->paragraph(), // Random description
            'type' => $this->faker->randomElement(['Residential', 'Commercial', 'Other']), // Random type
            'image_path' => 'projects/' . $this->faker->unique()->word . '.jpg', // Primary image file path
            'additional_images' => json_encode([
                'projects/' . $this->faker->unique()->word . '_1.jpg', // Additional image 1
                'projects/' . $this->faker->unique()->word . '_2.jpg', // Additional image 2
            ]), // JSON array of image paths
            'status' => $this->faker->randomElement(['Active', 'Completed', 'Pending']), // Status of project
            'no_of_floors' => $this->faker->numberBetween(1, 30), // Random number of floors
            'no_of_units' => $this->faker->optional()->numberBetween(1, 5), // Optional unit count
            'size' => $this->faker->numberBetween(900, 5000), // Size in square meters
        ];
    }
}

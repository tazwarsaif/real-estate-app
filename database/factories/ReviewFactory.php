<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'reviewer_name' => $this->faker->name(),
            'reviewer_email' => $this->faker->unique()->safeEmail(),
            'rating' => $this->faker->numberBetween(1, 5),
            'status' => $this->faker->randomElement(['pending', 'approved', 'rejected']),
            'review' => $this->faker->paragraph(),
            'project_id' => \App\Models\Project::factory(), // Assuming you have a ProjectFactory
        ];
    }
}

<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public static function replaceAndLower($value)
    {
        return str_replace(' ', '', strtolower($value));
    }

    public function definition()
    {
        static $user_id = 2;
        $lastName = $this->replaceAndLower(fake()->lastName());
        $firstName = $this->replaceAndLower(fake()->firstName());

        return [
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => "$firstName.$lastName@dummy.com",
            'password' => bcrypt('password'),
            'avatar' => User::generateAvatar($firstName, $user_id++),
            'is_active' => false,
            'is_admin' => false,
            'email_verified_at' => null,
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}

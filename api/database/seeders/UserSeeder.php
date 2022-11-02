<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    { 
        User::create([
            'first_name' => 'Super',
            'last_name' => 'Admin',
            'email' => 'super@admin.com',
            'password' => bcrypt('letmein'),
            'is_active' => false,
            'is_admin' => true,
            'email_verified_at' => now(),
        ]);

        User::factory(2)->create();
    }
}

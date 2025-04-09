<?php

namespace Database\Seeders\Examples;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class UsersSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$quantity = (int) $this->command->ask('How many users would you like to create?', 30);
		$faker = Faker::create();

		for ($i = 0; $i < $quantity; $i++) {
			$email = $faker->unique()->safeEmail;
			User::create([
				'name' => $faker->name,
				'email' => $email,
				// 'password' => Hash::make('password'), // Default password for all users
				'password' => $email
			]);
		}
	}
}

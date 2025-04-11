<?php

namespace Database\Seeders\Examples;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Spatie\Permission\Models\Permission;

class PermissionsSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$action = $this->command->choice(
			'What would you like to do?',
			['Create example permissions', 'Clear example permissions'],
			0
		);

		if ($action === 'Create example permissions') {
			$this->create();
		} elseif ($action === 'Clear example permissions') {
			$this->clear();
		}
	}

	private function create()
	{
		$quantity = (int) $this->command->ask('How many example permissions would you like to create?', 30);
		$faker = Faker::create();

		for ($i = 0; $i < $quantity; $i++) {
			Permission::create([
				'name' => "example-$faker->slug",
				'guard_name' => 'example',
				'description' => $faker->sentence(6)
			]);
		}
	}

	private function clear()
	{
		$examplesPermissions = Permission::where('guard_name', 'example')->get();

		foreach ($examplesPermissions as $permission) {
			Permission::where('id', $permission->id)->delete();
		}

		$this->command->info('All permissions with guard_name "example" have been deleted.');
	}
}

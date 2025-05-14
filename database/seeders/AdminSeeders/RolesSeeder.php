<?php

namespace Database\Seeders\Examples;

use Exception;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Faker\Factory as Faker;

class RolesSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$action = $this->command->choice(
			'What would you like to do?',
			['Create example roles', 'Clear example roles'],
			0
		);

		if ($action === 'Create example roles') {
			$this->create();
		} elseif ($action === 'Clear example roles') {
			$this->clear();
		}
	}

	private function create()
	{
		$faker = Faker::create();
		$examplePermissions = Permission::where('guard_name', 'example')->get();

		if (!$examplePermissions->count()) {
			$this->command->alert('There is no examples permissions.');
			return;
		}

		$quantity = (int) $this->command->ask('How many example roles would you like to create?', 30);

		for ($i = 0; $i < $quantity; $i++) {
			$role = Role::updateOrCreate(
				['name' => "Example $i", 'guard_name' => 'example'],
				['description' => $faker->sentence(6)]
			);
			$permissions = $examplePermissions->random(rand(1, min(10, $examplePermissions->count())));
			$role->givePermissionTo($permissions);
		}
	}

	private function clear()
	{
		$roles = Role::where('guard_name', 'example')->get();

		if ($roles->isEmpty()) {
			$this->command->info('No roles found with guard_name "example".');
			return;
		}

		foreach ($roles as $role) {
			if ($role->permissions()->count() > 0) {
				foreach ($role->permissions()->get() as $permission) {
					$role->revokePermissionTo($permission);
				}
			}

			Role::where('id', $role->id)->delete();
		}

		$this->command->info('All roles with guard_name "example" have been deleted.');
	}
}

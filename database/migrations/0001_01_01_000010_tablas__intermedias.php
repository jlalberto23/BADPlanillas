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
		Schema::create('detallePlanilla', function (Blueprint $table) {
			$table->unsignedBigInteger('id_planilla');
			$table->unsignedBigInteger('id_empleado');
			// Llaves foráneas
			$table->foreign('id_planilla')->references('id_planilla')->on('planilla')->onDelete('cascade');
			$table->foreign('id_empleado')->references('id_empleado')->on('empleados')->onDelete('cascade');

			// Clave primaria compuesta
			$table->primary(['id_planilla', 'id_empleado']);
		});
		Schema::create('empleadoProfesion', function (Blueprint $table) {
			$table->unsignedBigInteger('id_profesion');
			$table->unsignedBigInteger('id_empleado');
			// Llaves foráneas
			$table->foreign('id_profesion')->references('id_profesion')->on('profesiones')->onDelete('cascade');
			$table->foreign('id_empleado')->references('id_empleado')->on('empleados')->onDelete('cascade');

			// Clave primaria compuesta
			$table->primary(['id_profesion', 'id_empleado']);
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('detallePlanilla');
		Schema::dropIfExists('empleadoProfesion');
	}
};

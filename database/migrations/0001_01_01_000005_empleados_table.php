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
		Schema::create('empleados', callback: function (Blueprint $table) {
			$table->id('id_empleado');
			$table->string('primer_nombre');
			$table->string('segundo_nombre');
			$table->string('apellido_paterno');
			$table->string('apellido_materno');
			$table->string('apellido_casada')->nullable();
			$table->date('fecha_nacimiento');
			$table->date('fecha_ingreso');
			$table->string('numero_documento', 20)->nullable();
			$table->string('dui', 9)->unique()->nullable();
			$table->string('nit', 14)->unique();
			$table->string('codigo_isss', 9)->unique();
			$table->string('codigo_nup', 9)->unique();
			$table->decimal('salario_base', 9, 2);
			$table->string('estado_civil');
			$table->string('sexo', 1);
			$table->string('correo_personal')->unique();
			$table->string('correo_institucional')->unique();
			$table->enum('estado', ['activo', 'inactivo']);
			$table->string('carnet_empleado')->unique();
			$table->string('tipo_documento');

			//Referencias a tablas catalogo
			$table->unsignedBigInteger('id_profesion')->nullable();
			$table->unsignedBigInteger('id_puesto')->nullable();
			$table->unsignedBigInteger('id_seccion')->nullable();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists(table: 'empleados');
	}
};

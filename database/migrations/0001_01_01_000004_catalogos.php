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
		Schema::create('pais', function (Blueprint $table) {
			$table->id('id_pais');
			$table->string('nombrePais');
		});
		Schema::create('departamento', function (Blueprint $table) {
			$table->id('id_departamento');
			$table->string('nombreDepartamento');
			$table->unsignedBigInteger('id_pais');
		});
		Schema::create('municipios', function (Blueprint $table) {
			$table->id('id_municipio');
			$table->string('nombreMunicipio');
			$table->unsignedBigInteger('id_departamento');
		});
		Schema::create('distritos', function (Blueprint $table) {
			$table->id('id_distritos');
			$table->string('nombreDistrito');
			$table->unsignedBigInteger('id_municipio');
		});
		Schema::create('profesiones', function (Blueprint $table) {
			$table->id('id_profesion');
			$table->string('nombreProfesion');
		});
		Schema::create('puestos', function (Blueprint $table) {
			$table->id('id_puesto');
			$table->string('nombrePuesto');
			$table->string('descripcionPuesto');
			$table->decimal('salario_min', 9, 2);
			$table->decimal('salario_max', 9, 2);
		});

		Schema::create('tpoIngreso', function (Blueprint $table) {
			$table->id('id_tipo_ingreso');
			$table->string('tpoIngreso');
		});

		Schema::create('tpoDescuentos', function (Blueprint $table) {
			$table->id('id_tpo_descuento');
			$table->string('tpoDescuentos');
		});

		Schema::create('tpoAportesPatron', function (Blueprint $table) {
			$table->id('id_tpo_Aporte');
			$table->string('tpoAporte');
		});

		Schema::create('tablaRenta', function (Blueprint $table) {
			$table->id('id_renta');
			$table->decimal('salario_desde', 9, 2);
			$table->decimal('salario_hasta', 9, 2);
			$table->decimal('porcentaje', 1, 4); //decimal expresando en forma 0.0750
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('pais');
		Schema::dropIfExists('departamento');
		Schema::dropIfExists('municipios');
		Schema::dropIfExists('distritos');
		Schema::dropIfExists('profesiones');
		Schema::dropIfExists('puestos');
		Schema::dropIfExists('tpoIngreso');
		Schema::dropIfExists('tpoDescuentos');
		Schema::dropIfExists('tpoAportesPatron');
		Schema::dropIfExists('tablaRenta');
	}
};

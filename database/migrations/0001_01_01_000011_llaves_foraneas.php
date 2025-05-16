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
		//Llaves foraneas de empleados
		Schema::table('empleados', function (Blueprint $table) {
			//$table->foreign('id_tpo_documento')->references('id_tpo_documento')->on('tpoDocumento');
			$table->foreign('id_profesion')->references('id_profesion')->on('profesiones');
			$table->foreign('id_puesto')->references('id_puesto')->on('puestos');
			$table->foreign('id_seccion')->references('id_seccion')->on('seccionEmpresa');
		});
		//Llaves foraneas de municipios
		Schema::table('municipios', function (Blueprint $table) {
			$table->foreign('id_departamento')->references('id_departamento')->on('departamento');
		});
		//Llaves foraneas de distritos
		Schema::table('distritos', function (Blueprint $table) {
			$table->foreign('id_municipio')->references('id_municipio')->on('municipios');
		});

		//Llaves foraneas de departamentoEmpresa
		Schema::table('departamentoEmpresa', function (Blueprint $table) {
			$table->foreign('id_jefeDepto')->references('id_empleado')->on('empleados');
		});
		//Llaves foraneas de areaEmpresa
		Schema::table('areaEmpresa', function (Blueprint $table) {
			$table->foreign('id_jefeArea')->references('id_empleado')->on('empleados');
			$table->foreign('id_deptoEmpresa')->references('id_deptoEmpresa')->on('departamentoEmpresa');
		});
		//Llaves foraneas de areaEmpresa
		Schema::table('seccionEmpresa', function (Blueprint $table) {
			$table->foreign('id_jefeSeccion')->references('id_empleado')->on('empleados');
			$table->foreign('id_area')->references('id_area')->on('areaEmpresa');
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		// Eliminar llaves foráneas de empleados
		Schema::table('empleados', function (Blueprint $table) {
			//$table->dropForeign(['id_tpo_documento']);
			$table->dropForeign(['id_profesion']);
			$table->dropForeign(['id_puesto']);
			$table->dropForeign(['id_seccion']);
		});
		// Eliminar llaves foráneas de municipios
		Schema::table('municipios', function (Blueprint $table) {
			$table->dropForeign(['id_departamento']);
		});
		// Eliminar llaves foráneas de distritos
		Schema::table('distritos', function (Blueprint $table) {
			$table->dropForeign(['id_municipio']);
		});

		// Eliminar llaves foráneas de departamentoEmpresa
		Schema::table('departamentoEmpresa', function (Blueprint $table) {
			$table->dropForeign(['id_jefeDepto']);
		});
		// Eliminar llaves foráneas de areaEmpresa
		Schema::table('areaEmpresa', function (Blueprint $table) {
			$table->dropForeign(['id_jefeArea']);
			$table->dropForeign(['id_deptoEmpresa']);
		});
		// Eliminar llaves foráneas de seccionEmpresa
		Schema::table('seccionEmpresa', function (Blueprint $table) {
			$table->dropForeign(['id_jefeSeccion']);
			$table->dropForeign(['id_area']);
		});
	}
};

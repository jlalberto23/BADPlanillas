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
		//Llaves foraneas de rangoSalarial
		Schema::table('rangoSalarial', function (Blueprint $table) {
			$table->foreign('id_puesto')->references('id_puesto')->on('puestos');
		});
		//Llaves foraneas de periodoContable
		Schema::table('periodoContable', function (Blueprint $table) {
			$table->foreign('id_anio')->references('id_anio')->on('anioCalendario');
		});
		//Llaves foraneas de ingresosEmpleado
		Schema::table('ingresosEmpleado', function (Blueprint $table) {
			$table->foreign('id_tipo_ingreso')->references('id_tipo_ingreso')->on('tpoIngreso');
			$table->foreign('id_empleado')->references('id_empleado')->on('empleados');
			$table->foreign('id_periodo')->references('id_periodo')->on('periodoContable');
		});
		//Llaves foraneas de descEmpleado
		Schema::table('descEmpleado', function (Blueprint $table) {
			$table->foreign('id_tpo_descuento')->references('id_tpo_descuento')->on('tpoDescuentos');
			$table->foreign('id_empleado')->references('id_empleado')->on('empleados');
			$table->foreign('id_periodo')->references('id_periodo')->on('periodoContable');
		});
		//Llaves foraneas de aportesPatron
		Schema::table('aportesPatron', function (Blueprint $table) {
			$table->foreign('id_tpo_Aporte')->references('id_tpo_Aporte')->on('tpoAportesPatron');
			$table->foreign('id_empleado')->references('id_empleado')->on('empleados');
			$table->foreign('id_periodo')->references('id_periodo')->on('periodoContable');
		});
		//Llaves foraneas de departamentoEmpresa
		Schema::table('departamentoEmpresa', function (Blueprint $table) {
			$table->foreign('id_jefeDepto')->references('id_empleado')->on('empleados');
			$table->foreign('id_centro_costo')->references('id_centro_costo')->on('centroCosto');
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
		//Llaves foraneas de planilla
		Schema::table('planilla', function (Blueprint $table) {
			$table->foreign('id_periodo')->references('id_periodo')->on('periodoContable');
			$table->foreign('id_centro_costo')->references('id_centro_costo')->on('centroCosto');
			$table->foreign('id_empleado')->references('id_empleado')->on('empleados');
		});
		//Llaves foraneas de centroCostoMonto
		Schema::table('centroCostoMonto', function (Blueprint $table) {
			$table->foreign('id_centro_costo')->references('id_centro_costo')->on('centroCosto');
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
		// Eliminar llaves foráneas de rangoSalarial
		Schema::table('rangoSalarial', function (Blueprint $table) {
			$table->dropForeign(['id_puesto']);
		});
		// Eliminar llaves foráneas de periodoContable
		Schema::table('periodoContable', function (Blueprint $table) {
			$table->dropForeign(['id_anio']);
		});
		// Eliminar llaves foráneas de ingresosEmpleado
		Schema::table('ingresosEmpleado', function (Blueprint $table) {
			$table->dropForeign(['id_tipo_ingreso']);
			$table->dropForeign(['id_empleado']);
			$table->dropForeign(['id_periodo']);
		});
		// Eliminar llaves foráneas de descEmpleado
		Schema::table('descEmpleado', function (Blueprint $table) {
			$table->dropForeign(['id_tpo_descuento']);
			$table->dropForeign(['id_empleado']);
			$table->dropForeign(['id_periodo']);
		});
		// Eliminar llaves foráneas de aportesPatron
		Schema::table('aportesPatron', function (Blueprint $table) {
			$table->dropForeign(['id_tpo_Aporte']);
			$table->dropForeign(['id_empleado']);
			$table->dropForeign(['id_periodo']);
		});
		// Eliminar llaves foráneas de departamentoEmpresa
		Schema::table('departamentoEmpresa', function (Blueprint $table) {
			$table->dropForeign(['id_jefeDepto']);
			$table->dropForeign(['id_centro_costo']);
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

		// Eliminar llaves foráneas de planilla
		Schema::table('planilla', function (Blueprint $table) {
			$table->dropForeign(['id_periodo']);
			$table->dropForeign(['id_centro_costo']);
			$table->dropForeign(['id_empleado']);
		});
		// Eliminar llaves foráneas de centroCostoMonto
		Schema::table('centroCostoMonto', function (Blueprint $table) {
			$table->dropForeign(['id_centro_costo']);
		});
	}
};

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
		Schema::create('anio_calendario', function (Blueprint $table) {
			$table->id('id_anio');
			$table->year('anio')->unique();
			$table->date('fecha_inicio');
			$table->date('fecha_fin');
			$table->enum('estado', ['activo', 'inactivo'])->default('activo');
		});

		Schema::create('centro_costo', function (Blueprint $table) {
			$table->id('id_centro_costo');
			$table->foreignId('id_deptoEmpresa')->constrained('departamentoEmpresa', 'id_deptoEmpresa');
			$table->foreignId('id_anio')->constrained('anio_calendario', 'id_anio');
			$table->decimal('presupuesto_total', 9, 2);
			$table->decimal('presupuesto_restante', 9, 2)->default(0);
			$table->unique(['id_deptoEmpresa', 'id_anio']);
		});

		Schema::create('planilla', function (Blueprint $table) {
			$table->id('id_planilla');
			$table->foreignId('id_anio')->constrained('anio_calendario', 'id_anio');
			$table->enum('estado', ['activo', 'inactivo'])->default('activo');
			$table->enum('mes', ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']);
			$table->date('fecha_generacion')->nullable();
			$table->date('fecha_inicio');
			$table->date('fecha_fin');
			$table->decimal('total_ingresos', 9, 2)->default(0);
			$table->decimal('total_descuentos', 9, 2)->default(0);
			$table->decimal('total_aporte_patronal', 9, 2)->default(0);
			$table->decimal('salario_neto_total', 9, 2)->default(0);
			$table->unique(['id_anio', 'mes']);
		});

		// Detalle para empleados

		Schema::create('planilla_detalle', function (Blueprint $table) {
			$table->id('id_planilla_detalle');
			$table->foreignId('id_planilla')->constrained('planilla', 'id_planilla');
			$table->foreignId('id_empleado')->constrained('empleados', 'id_empleado');
			$table->foreignId('id_centro_costo')->constrained('centro_costo', 'id_centro_costo');
			$table->decimal('total_ingresos', 9, 2)->default(0);
			$table->decimal('total_descuentos', 9, 2)->default(0);
			$table->decimal('total_aporte_patronal', 9, 2)->default(0);
			$table->decimal('salario_neto_total', 9, 2)->default(0);

			$table->unique(['id_planilla_detalle', 'id_empleado']);
		});

		Schema::create('conceptos_empleado', function (Blueprint $table) {
			$table->id('id_concepto_empleado');
			$table->foreignId('id_planilla_detalle')->constrained('planilla_detalle', 'id_planilla_detalle');
			$table->string('codigo_concepto');
			$table->date('fecha');
			$table->decimal('monto', 9, 2);

			$table->foreign('codigo_concepto')->references('codigo')->on('tipos_conceptos');
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('conceptos_empleado');
		Schema::dropIfExists('planilla_detalle');
		Schema::dropIfExists('planilla');
		Schema::dropIfExists('centro_costo');
		Schema::dropIfExists('anio_calendario');
	}
};

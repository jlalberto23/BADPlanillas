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
        //tpoDocumento, pais, departamento, municipios, distritos, profesiones, puestos, rangoSalarial
        // departamentoEmpresa, centroCosto, periodoContable, anioCalendario, tpoIngreso, ingresosEmpleado
        // tpoDescuentos, tpoAportesPatron, tablaRenta, 
        Schema::create('tpoDocumento', function (Blueprint $table) {
			$table->bigIncrements('id_tpo_documento');
			$table->string('descripcionDocumento');			
		});
        Schema::create('pais', function (Blueprint $table) {
			$table->bigIncrements('id_pais');
			$table->string('nombrePais');			
		});
        Schema::create('departamento', function (Blueprint $table) {
			$table->bigIncrements('id_departamento');
			$table->string('nombreDepartamento');
            $table->unsignedBigInteger('id_pais');
		});
        Schema::create('municipios', function (Blueprint $table) {
			$table->bigIncrements('id_municipio');
			$table->string('nombreMunicipio');
            $table->unsignedBigInteger('id_departamento');
            
		});
        Schema::create('distritos', function (Blueprint $table) {
			$table->bigIncrements('id_distritos');
			$table->string('nombreDistrito');
            $table->unsignedBigInteger('id_municipio');
		});
        Schema::create('profesiones', function (Blueprint $table) {
			$table->bigIncrements('id_profesion');
			$table->string('nombreProfesion');			
		});
        Schema::create('puestos', function (Blueprint $table) {
			$table->bigIncrements('id_puesto');
			$table->string('nombrePuesto');
            $table->string('descripcionPuesto');
		});
        Schema::create('rangoSalarial', function (Blueprint $table) {
			$table->bigIncrements('id_rango_salario');
            $table->unsignedBigInteger('id_puesto');
            $table->decimal('salario_min', 9, 2);
            $table->decimal('salario_max', 9, 2);

            $table->timestamps();
		});
        Schema::create('anioCalendario', function (Blueprint $table) {
			$table->bigIncrements('id_anio');
            $table->string('anio');
            $table->date('fecha_inicio');
            $table->date('fecha_fin');
		});
        Schema::create('periodoContable', function (Blueprint $table) {
			$table->bigIncrements('id_periodo');
            $table->unsignedBigInteger('id_anio');
            $table->string('mes');
            $table->date('fecha_inicio');
            $table->date('fecha_fin');
		});
        Schema::create('tpoIngreso', function (Blueprint $table) {
			$table->bigIncrements('id_tipo_ingreso');
            $table->string('tpoIngreso');       
		});
        Schema::create('ingresosEmpleado', function (Blueprint $table) {
			$table->bigIncrements('id_empleado_ingreso');
            $table->unsignedBigInteger('id_tipo_ingreso');
            $table->unsignedBigInteger('id_empleado');
            $table->string('fecha');
            $table->decimal('monto', 9, 2);
            $table->unsignedBigInteger('id_periodo');
		});
        Schema::create('tpoDescuentos', function (Blueprint $table) {
			$table->bigIncrements('id_tpo_descuento');
			$table->string('tpoDescuentos');			
		});
        Schema::create('descEmpleado', function (Blueprint $table) {
			$table->bigIncrements('id_empleado_descuento');
            $table->unsignedBigInteger('id_tpo_descuento');
            $table->unsignedBigInteger('id_empleado');
            $table->string('fecha');
            $table->decimal('monto', 9, 2);
            $table->unsignedBigInteger('id_periodo');
		});
        Schema::create('tpoAportesPatron', function (Blueprint $table) {
			$table->bigIncrements('id_tpo_Aporte');
			$table->string('tpoAporte');			
		});
        Schema::create('aportesPatron', function (Blueprint $table) {
			$table->bigIncrements('id_aporte_patron');
            $table->unsignedBigInteger('id_tpo_Aporte');
            $table->unsignedBigInteger('id_empleado');
            $table->date('fecha');
            $table->decimal('monto', 9, 2);
            $table->unsignedBigInteger('id_periodo');
		});
        Schema::create('tablaRenta', function (Blueprint $table) {
			$table->bigIncrements('id_renta');
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
        Schema::dropIfExists('tpoDocumento');
        Schema::dropIfExists('pais');
        Schema::dropIfExists('departamento');
        Schema::dropIfExists('municipios');
        Schema::dropIfExists('distritos');
        Schema::dropIfExists('profesiones');
        Schema::dropIfExists('puestos');
        Schema::dropIfExists('rangoSalarial');
        Schema::dropIfExists('anioCalendario');
        Schema::dropIfExists('periodoContable');
        Schema::dropIfExists('tpoIngreso');
        Schema::dropIfExists('ingresosEmpleado');
        Schema::dropIfExists('tpoDescuentos');
        Schema::dropIfExists('descEmpleado');
        Schema::dropIfExists('tpoAportesPatron');
        Schema::dropIfExists('aportesPatron');
        Schema::dropIfExists('tablaRenta');
    }
};

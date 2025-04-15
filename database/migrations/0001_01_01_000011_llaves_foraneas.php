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
            $table->foreign('id_tpo_documento')->references('id_tpo_documento')->on('tpoDocumento');
            $table->foreign('id_profesion')->references('id_profesion')->on('profesiones');
            $table->foreign('id_puesto')->references('id_puesto')->on('puestos');
            $table->foreign('id_deptoEmpresa')->references('id_deptoEmpresa')->on('departamentoEmpresa');
            $table->foreign('id_jefeDepto')->references('id_empleado')->on('empleados');

        });
        //Llaves foraneas de departamento
        Schema::table('departamento', function (Blueprint $table) {
            $table->foreign('id_pais')->references('id_pais')->on('pais');
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
            $table->foreign('id_empresa')->references('id_empresa')->on('empresa');
        });
        //Llaves foraneas de areaEmpresa
        Schema::table('areaEmpresa', function (Blueprint $table) {
            $table->foreign('id_jefeArea')->references('id_empleado')->on('empleados');
            $table->foreign('id_deptoEmpresa')->references('id_deptoEmpresa')->on('departamentoEmpresa');
        });
        //Llaves foraneas de areaEmpresa
        Schema::table('seccionEmpresa', function (Blueprint $table) {
            $table->foreign('id_jefeSeccion')->references('id_empleado')->on('empleados');
            $table->foreign('id_deptoEmpresa')->references('id_deptoEmpresa')->on('departamentoEmpresa');
            $table->foreign('id_area')->references('id_area')->on('areaEmpresa');
        });
        //Llaves foraneas de empresa
        Schema::table('empresa', function (Blueprint $table) {
            $table->foreign('id_pais')->references('id_pais')->on('pais');
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
        //
    }
};

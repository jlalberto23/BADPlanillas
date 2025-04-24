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
        Schema::create('departamentoEmpresa', function (Blueprint $table) {
			$table->bigIncrements('id_deptoEmpresa');
			$table->string('nombreDepto');
            $table->string('descripcionDepto');
            $table->unsignedBigInteger('id_jefeDepto');
            $table->unsignedBigInteger('id_centro_costo');
            $table->unsignedBigInteger('id_empresa');
		});
        Schema::create('areaEmpresa', function (Blueprint $table) {
			$table->bigIncrements('id_area');
			$table->string('nombreArea');
            $table->string('descripcionArea');
            $table->unsignedBigInteger('id_jefeArea');
            $table->unsignedBigInteger('id_deptoEmpresa');
		});
        Schema::create('seccionEmpresa', function (Blueprint $table) {
			$table->bigIncrements('id_seccion');
			$table->string('nombreSeccion');
            $table->string('descripcionSeccion');
            $table->unsignedBigInteger('id_jefeSeccion');
            $table->unsignedBigInteger('id_deptoEmpresa');
            $table->unsignedBigInteger('id_area');
		});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('departamentoEmpresa');
        Schema::dropIfExists('areaEmpresa');
        Schema::dropIfExists('seccionEmpresa');
    }
};

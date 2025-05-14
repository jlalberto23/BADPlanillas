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
			$table->id('id_deptoEmpresa');
			$table->string('nombreDepto');
			$table->string('descripcionDepto');
			$table->unsignedBigInteger('id_jefeDepto')->nullable();
			$table->unsignedBigInteger('id_centro_costo')->nullable();
		});
		Schema::create('areaEmpresa', function (Blueprint $table) {
			$table->id('id_area');
			$table->string('nombreArea');
			$table->string('descripcionArea');
			$table->unsignedBigInteger('id_jefeArea')->nullable();
			$table->unsignedBigInteger('id_deptoEmpresa')->nullable();
		});
		Schema::create('seccionEmpresa', function (Blueprint $table) {
			$table->id('id_seccion');
			$table->string('nombreSeccion');
			$table->string('descripcionSeccion');
			$table->unsignedBigInteger('id_jefeSeccion')->nullable();
			$table->unsignedBigInteger('id_area')->nullable();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('seccionEmpresa');
		Schema::dropIfExists('areaEmpresa');
		Schema::dropIfExists('departamentoEmpresa');
	}
};

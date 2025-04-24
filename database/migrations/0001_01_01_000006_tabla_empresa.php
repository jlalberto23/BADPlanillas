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
        Schema::create('empresa', function (Blueprint $table) {
			$table->bigIncrements('id_empresa');
			$table->string('nombreEmpresa');
            $table->string('direccionEmpresa');
            $table->string('nitEmpresa');
            $table->string('nicEmpresa');
            $table->string('representanteLegal');
            $table->string('tel_repreLegal');
            $table->string('correo_repreLegal');
            $table->string('telefonoEmpresa');
            $table->string('paginaWeb');
            $table->unsignedBigInteger('id_pais');
		});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empresa');
    }
};

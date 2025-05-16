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
		Schema::create('centro_costo', function (Blueprint $table) {
			$table->id('id_centro_costo');
			$table->foreignId('id_deptoEmpresa')->constrained('departamentoEmpresa', 'id_deptoEmpresa');
			$table->year('anio');
			$table->decimal('presupuesto_total', 9, 2);
			$table->decimal('presupuesto_restante', 9, 2);
			$table->unique(['id_deptoEmpresa', 'anio']);
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('centro_costo');
	}
};

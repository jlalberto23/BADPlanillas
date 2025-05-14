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
		Schema::create('centroCosto', function (Blueprint $table) {
			$table->id('id_centro_costo');
			$table->string('codigo');
			$table->string('descripcionCC');
		});
		Schema::create('centroCostoMonto', function (Blueprint $table) {
			$table->id('id_monto');
			$table->unsignedBigInteger('id_centro_costo');
			$table->string('anio');
			$table->decimal('monto_presupuesto', 9, 2);
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('centroCostoMonto');
		Schema::dropIfExists('centroCosto');
	}
};

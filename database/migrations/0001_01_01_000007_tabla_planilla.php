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
        Schema::create('planilla', function (Blueprint $table) {
			$table->bigIncrements('id_planilla');
			$table->unsignedBigInteger('id_periodo');
            $table->unsignedBigInteger('id_empleado');
            $table->unsignedBigInteger('id_centro_costo');
            $table->date('fecha_generacion');
            $table->decimal('total_ingresos', 9, 2);
            $table->decimal('total_descuentos', 9, 2);
            $table->decimal('total_aporte_patronal', 9, 2);
            $table->decimal('salario_neto_total', 9, 2);
		});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('planilla');
    }
};

<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class Parametros extends Model
{
    protected $table = 'parametros';
    protected $primaryKey = 'clave';
    public $incrementing = false;
    protected $keyType = 'string';
		
    protected $fillable = [
        'clave',
        'titulo',
        'valor',
        'descripcion'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}

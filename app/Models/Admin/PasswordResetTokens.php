<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PasswordResetTokens extends Model
{
	protected $table = 'password_reset_tokens';
	public $timestamps = false;
	// todo: Falta agregar fillable y relaciones
}

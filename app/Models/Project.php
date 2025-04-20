<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Project extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 'description', 'type', 'image_path', 'status',
        'no_of_floors', 'no_of_units', 'size', 'additional_images'
    ];
}

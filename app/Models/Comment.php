<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $table = 'comment';
    protected $fillable = ['content'];

    public function post()
    {
        return $this->belongsTo('App\Models\Post', 'post_id');
    }

    public function product()
    {
        return $this->belongsTo('App\Models\Product','product_id');
    }
}

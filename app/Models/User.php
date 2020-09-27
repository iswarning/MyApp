<?php

namespace App\Models;

use DateTime;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Carbon\Carbon;
class User extends Authenticatable
{
    use HasFactory, Notifiable;
    use HasRoles;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */


    protected $fillable = [
        'name', 'email', 'password', 'role',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function createToken($id){
        $now = Carbon::now();
        $token_exquired = $now->addDays(30);
        $refresh_token_exquired = $now->addDays(365);
        $check = DB::table('sessions')->where('user_id',$id)->first();

        if($check === null){
            DB::table('sessions')->insertGetId(array(
                'token' => Str::random(40),
                'token_exquired' => $token_exquired,
                'user_id' => $id,
                'created_at' => $now,
                'updated_at' => $now
            ));
        }else{
            DB::table('sessions')->where('user_id',$id)->update([
                'refresh_token' => Str::random(40),
                'refresh_token_exquired' => $refresh_token_exquired,
                'updated_at' => $now
            ]);
        }

    }
}

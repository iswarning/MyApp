<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Http\Controllers\AuthController;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


/*Route::get('/test',function(){
    $user = User::find(3);

    $permissionNames = $user->getPermissionNames(); // collection of name strings
    $permissions = $user->permissions; // collection of permission objects

    // get all permissions for the user, either directly, or from roles, or from both
    $permissions = $user->getDirectPermissions();
    $permissions = $user->getPermissionsViaRoles();
    $permissions = $user->getAllPermissions();

    // get the names of the user's roles
    $roles = $user->getRoleNames(); // Returns a collection
    echo $roles;
});*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/user', function () {
    return view('user');
});

Route::get('/login',[AuthController::class, 'login'])->name('login');
Route::post('/login',[AuthController::class, 'postLogin'])->name('postLogin');
Route::get('/logout',[AuthController::class, 'logout'])->name('logout');
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');



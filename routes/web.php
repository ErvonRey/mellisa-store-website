<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Storefront
|--------------------------------------------------------------------------
|
| The storefront is plain HTML/CSS/JS and lives in the public/ directory.
| This route serves it directly so the root URL works even when the web
| server hands the request to Laravel instead of serving index.html itself.
|
| Swap this for a controller or Blade view once the site moves to Laravel.
|
*/

Route::get('/', function () {
    return response()->file(public_path('index.html'));
});

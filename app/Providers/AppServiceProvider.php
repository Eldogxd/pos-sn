<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        //
    }

    public function boot()
    {
        // // FORZAR HTTPS - MUY IMPORTANTE
        // if ($this->app->environment('production') || app()->runningInConsole() === false) {
        //     URL::forceScheme('https');
        // }
    }
}

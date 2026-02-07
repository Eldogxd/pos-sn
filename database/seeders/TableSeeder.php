<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tables')->insert([
            ['number' => 1, 'status' => 'libre'],
            ['number' => 2, 'status' => 'libre'],
            ['number' => 3, 'status' => 'libre'],
            ['number' => 4, 'status' => 'libre'],
            ['number' => 5, 'status' => 'libre'],
            ['number' => 6, 'status' => 'libre'],
            ['number' => 7, 'status' => 'libre'],
            ['number' => 8, 'status' => 'libre'],
            ['number' => 9, 'status' => 'libre'],
            ['number' => 10, 'status' => 'libre'],
            ['number' => 11, 'status' => 'libre'],
            ['number' => 12, 'status' => 'libre'],
            ['number' => 13, 'status' => 'libre'],
           
        ]);
    }
}

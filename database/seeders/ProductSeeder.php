<?php

namespace Database\Seeders;

use FontLib\Table\Type\name;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('products')->insert([
            [
                'name'=> 'Sopa de Res',
                'price'=> 180.00,
                'category'=> 'sopas'
            ],
            [
                'name' => 'Sopa de Frijoles',
                'price' => 150.00,
                'category' => 'sopas'
            ],
            [
                'name' => 'Sopa de Gallina',
                'price' => 150.00,
                'category' => 'sopas'
            ],
            [
                'name' => 'Sopa de Queso',
                'price' => 150.00,
                'category' => 'sopas'
            ],
            [
                'name' => 'Sopa de Mondongo',
                'price' => 150.00,
                'category' => 'sopas'
            ],
            [
                'name' => 'Sopa de Albondiga',
                'price' => 150.00,
                'category' => 'sopas'
            ],
            [
                'name' => 'Sopa de Mariscos',
                'price' => 450.00,
                'category' => 'sopas'
            ]
        ]);
        
    }
}

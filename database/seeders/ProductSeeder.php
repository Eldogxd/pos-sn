<?php

namespace Database\Seeders;

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
                'category'=> 'Sopas',
                'is_generic' => false,
            ],
            [
                'name' => 'Sopa de Frijoles',
                'price' => 150.00,
                'category' => 'Sopas',
                'is_generic' => false,
            ],
            [
                'name' => 'Sopa de Gallina',
                'price' => 150.00,
                'category' => 'Sopas',
                'is_generic' => false,
            ],
            [
                'name' => 'Sopa de Queso',
                'price' => 150.00,
                'category' => 'Sopas',
                'is_generic' => false,
            ],
            [
                'name' => 'Sopa de Mondongo',
                'price' => 150.00,
                'category' => 'Sopas',
                'is_generic' => false,
            ],
            [
                'name' => 'Sopa de Albondiga',
                'price' => 150.00,
                'category' => 'Sopas',
                'is_generic' => false,
            ],
            [
                'name' => 'Sopa de Mariscos',
                'price' => 450.00,
                'category' => 'Sopas',
                'is_generic' => false,
            ],
            [
                'name' => 'Tortilla ',
                'price' => 5.00,
                'category' => 'Extras',
                'is_generic' => false,
            ],
            [
                'name' => 'Queso',
                'price' => 25.00,
                'category' => 'Extras',
                'is_generic' => false,
            ],
            [
                'name' => 'Arroz',
                'price' => 10.00,
                'category' => 'Extras',
                'is_generic' => false,
            ],
            [
                'name' => 'Coca Cola',
                'price' => 30.00,
                'category' => 'Bebidas',
                'is_generic' => false,
            ],
            [
                'name' => 'Limonada',
                'price' => 30.00,
                'category' => 'Bebidas',
                'is_generic' => false,
            ],
            [
                'name' => 'Tiste',
                'price' => 30.00,
                'category' => 'Bebidas',
                'is_generic' => false,
            ],
            [
                'name' => 'Cacao',
                'price' => 40.00,
                'category' => 'Bebidas',
                'is_generic' => false,
            ],
              [
                'name' => 'Agua',
                'price' => 20.00,
                'category' => 'Bebidas',
                'is_generic' => false,
            ],
              [
                'name' => 'Empaque',
                'price' => 20.00,
                'category' => 'Extras',
                'is_generic' => false,
            ],
              [
                'name' => 'Otro',
                'price' => 0.00,
                'category' => 'Otros',
                'is_generic' => true,
            ],
            [
                'name' => 'Delivery',
                'price' => 0.00,
                'category' => 'Otros',
                'is_generic' => true,
            ],
            

        ]);
        
    }
}

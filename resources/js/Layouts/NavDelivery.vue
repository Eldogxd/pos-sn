<script setup>
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <nav class="flex space-x-4">
                  <Link href="/delivery" class="text-gray-600 hover:text-gray-800">Ordenes</Link>
                  <!--<Link href="#" class="text-gray-600 hover:text-gray-800">Gastos</Link>-->
                  <Link href="/customers" class="text-gray-600 hover:text-gray-800">Clientes</Link>
                  <Link href="/invoices" class="text-gray-600 hover:text-gray-800">Facturas</Link>
                  <!--<Link href="#" class="text-gray-600 hover:text-gray-800">Cerrar Sesión</Link>-->
     </nav>
    </template>
<script setup>
import { Link } from '@inertiajs/vue3';
</script>


<template>
<nav class="flex space-x-4">
              <Link href="/usuarios" class="text-gray-600 hover:text-gray-800">Usuarios</Link>
              <Link href="/productos" class="text-gray-600 hover:text-gray-800">Productos</Link>
              <Link href="/mesas" class="text-gray-600 hover:text-gray-800">Mesas</Link>
              <Link href="/logout" class="text-gray-600 hover:text-gray-800">Cerrar Sesión</Link>
 </nav>
</template>
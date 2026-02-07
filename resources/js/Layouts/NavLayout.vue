<script setup>
import { ref } from 'vue';
import { Link } from '@inertiajs/vue3';

const isOpen = ref(false);
</script>

<template>
    <div>
        <!-- Botón de menú móvil -->
        <div class="flex items-center md:hidden">
            <button @click="isOpen = !isOpen" class="text-gray-600 hover:text-gray-800 focus:outline-none">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path :class="{'hidden': isOpen, 'inline-flex': !isOpen }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    <path :class="{'hidden': !isOpen, 'inline-flex': isOpen }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <!-- Menú de escritorio -->
        <nav class="hidden space-x-4 md:flex">
            <Link href="/usuarios" class="text-gray-600 hover:text-gray-800">Usuarios</Link>
            <Link href="/productos" class="text-gray-600 hover:text-gray-800">Productos</Link>
            <Link href="/mesas" class="text-gray-600 hover:text-gray-800">Mesas</Link>
            <Link href="/riders" class="text-gray-600 hover:text-gray-800">Motorizados</Link>
        </nav>

        <!-- Menú desplegable móvil -->
        <div v-show="isOpen" class="md:hidden">
            <nav class="flex flex-col pt-2 pb-4 space-y-1">
                <Link href="/usuarios" class="block px-3 py-2 text-base font-medium text-gray-600 rounded-md hover:text-gray-800 hover:bg-gray-50">Usuarios</Link>
                <Link href="/productos" class="block px-3 py-2 text-base font-medium text-gray-600 rounded-md hover:text-gray-800 hover:bg-gray-50">Productos</Link>
                <Link href="/mesas" class="block px-3 py-2 text-base font-medium text-gray-600 rounded-md hover:text-gray-800 hover:bg-gray-50">Mesas</Link>
                <Link href="/riders" class="block px-3 py-2 text-base font-medium text-gray-600 rounded-md hover:text-gray-800 hover:bg-gray-50">Motorizados</Link>
            </nav>
        </div>
    </div>
</template>
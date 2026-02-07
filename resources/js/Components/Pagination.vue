<script setup>
import { Link } from '@inertiajs/vue3';

defineProps({
    links: {
        type: Array,
        required: true,
    },
});
</script>

<template>
    <!-- Solo se muestra si hay más de una página -->
    <div v-if="links.length > 3" class="flex flex-wrap items-center justify-center gap-1 mt-6">
        <template v-for="(link, key) in links" :key="key">
            <!-- Botón deshabilitado (Anterior/Siguiente sin URL) -->
            <div
                v-if="link.url === null"
                class="px-4 py-2 text-sm text-gray-400 border rounded-lg cursor-default"
                v-html="link.label"
            />

            <!-- Enlace de página normal -->
            <Link
                v-else
                :href="link.url"
                class="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                :class="{ 'bg-blue-500 text-white hover:bg-blue-600': link.active }"
                v-html="link.label"
                preserve-scroll
            />
        </template>
    </div>
</template>
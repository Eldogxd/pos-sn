<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { Link } from '@inertiajs/vue3';
import Modulos from './modulos.vue';
</script>

<template>
    <AppLayout title="Dashboard">
        <template #header>
            <h2 class="text-base font-bold text-gray-900 sm:text-lg">
                Panel Principal
            </h2>
        </template>

     <!-- component -->

     <Modulos />
    </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { Link } from '@inertiajs/vue3';
import Modulos from './modulos.vue';
</script>

<template>
    <AppLayout title="Dashboard">
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
                Panel Pricnipal
            </h2>
        </template>

     <!-- component -->

     <Modulos />
    </AppLayout>
</template>

<script setup>
import  AppLayout from '@/Layouts/AppLayout.vue'
import { Link } from '@inertiajs/vue3'
import NavLayout from '@/Layouts/NavLayout.vue';
</script>

<template>
  <AppLayout>

    <template #header>
            <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
              Panel de Administrador
            </h2>
           <NavLayout />
            </div>
        </template>






  </AppLayout>
    


</template>
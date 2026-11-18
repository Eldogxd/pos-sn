<script setup>
import { Link } from '@inertiajs/vue3';
</script>

<template>
  <section class="p-4 mx-auto max-w-5xl sm:p-6 lg:p-10">
    <div class="mb-6 text-center sm:mb-8">
      <h1 class="text-2xl font-extrabold text-gray-900 sm:text-3xl">Módulos</h1>
      <p class="mt-1 text-sm text-gray-500">Selecciona el área de trabajo para comenzar</p>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
      <!-- Caja -->
      <Link
        href="/Cashier"
        class="flex flex-row items-center gap-4 p-5 transition card hover:shadow-md hover:border-mantis-400 active:scale-[0.99] sm:flex-col sm:text-center sm:p-6 group"
      >
        <div class="flex items-center justify-center w-14 h-14 text-white transition rounded-2xl bg-mantis-600 shadow-sm shrink-0 group-hover:bg-mantis-700">
          <i class="pi pi-wallet text-2xl"></i>
        </div>
        <div class="min-w-0">
          <h2 class="text-lg font-bold text-gray-900">Caja</h2>
          <p class="mt-0.5 text-xs text-gray-500 sm:text-sm">Mesas, órdenes y facturación rápida</p>
        </div>
      </Link>

      <!-- Delivery -->
      <Link
        href="/delivery"
        class="flex flex-row items-center gap-4 p-5 transition card hover:shadow-md hover:border-mantis-400 active:scale-[0.99] sm:flex-col sm:text-center sm:p-6 group"
      >
        <div class="flex items-center justify-center w-14 h-14 text-white transition rounded-2xl bg-mantis-600 shadow-sm shrink-0 group-hover:bg-mantis-700">
          <i class="pi pi-truck text-2xl"></i>
        </div>
        <div class="min-w-0">
          <h2 class="text-lg font-bold text-gray-900">Delivery</h2>
          <p class="mt-0.5 text-xs text-gray-500 sm:text-sm">Pedidos a domicilio y motorizados</p>
        </div>
      </Link>

      <!-- Administrador -->
      <Link
        href="/Admin"
        class="flex flex-row items-center gap-4 p-5 transition card hover:shadow-md hover:border-mantis-400 active:scale-[0.99] sm:flex-col sm:text-center sm:p-6 group"
      >
        <div class="flex items-center justify-center w-14 h-14 text-white transition rounded-2xl bg-gray-900 shadow-sm shrink-0 group-hover:bg-gray-800">
          <i class="pi pi-chart-bar text-2xl"></i>
        </div>
        <div class="min-w-0">
          <h2 class="text-lg font-bold text-gray-900">Administrador</h2>
          <p class="mt-0.5 text-xs text-gray-500 sm:text-sm">Estadísticas, productos, usuarios y mesas</p>
        </div>
      </Link>
    </div>
  </section>
</template>

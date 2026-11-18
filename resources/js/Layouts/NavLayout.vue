<template>
  <nav class="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
    <Link
      href="/Admin"
      class="nav-pill shrink-0"
      :class="isSummaryActive ? 'nav-pill-active' : ''"
    >
      <i class="pi pi-chart-bar text-xs"></i>
      <span>Resumen</span>
    </Link>
    <Link
      href="/usuarios"
      class="nav-pill shrink-0"
      :class="currentUrl.startsWith('/usuarios') ? 'nav-pill-active' : ''"
    >
      <i class="pi pi-users text-xs"></i>
      <span>Usuarios</span>
    </Link>
    <Link
      href="/productos"
      class="nav-pill shrink-0"
      :class="currentUrl.startsWith('/productos') ? 'nav-pill-active' : ''"
    >
      <i class="pi pi-box text-xs"></i>
      <span>Productos</span>
    </Link>
    <Link
      href="/mesas"
      class="nav-pill shrink-0"
      :class="currentUrl.startsWith('/mesas') ? 'nav-pill-active' : ''"
    >
      <i class="pi pi-th-large text-xs"></i>
      <span>Mesas</span>
    </Link>
    <Link
      href="/riders"
      class="nav-pill shrink-0"
      :class="currentUrl.startsWith('/riders') ? 'nav-pill-active' : ''"
    >
      <i class="pi pi-truck text-xs"></i>
      <span>Motorizados</span>
    </Link>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';

const page = usePage();
const currentUrl = computed(() => page.url || '');
const isSummaryActive = computed(() =>
  currentUrl.value.startsWith('/Admin') || currentUrl.value.startsWith('/admin/dashboard')
);
</script>

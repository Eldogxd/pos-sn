<script setup>
import { Link, usePage } from '@inertiajs/vue3';

const page = usePage();

const links = [
    { href: '/Cashier', label: 'Mesas', icon: 'pi pi-th-large' },
    { href: '/invoices', label: 'Facturas', icon: 'pi pi-receipt' },
];

const isActive = (href) => (page.url || '').toLowerCase().startsWith(href.toLowerCase());
</script>

<template>
    <nav class="flex items-center gap-1 p-1 bg-gray-100 rounded-xl">
        <Link
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            class="nav-pill"
            :class="{ 'nav-pill-active': isActive(link.href) }"
        >
            <i :class="link.icon" class="text-xs"></i>
            {{ link.label }}
        </Link>
    </nav>
</template>

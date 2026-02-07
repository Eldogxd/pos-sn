<script setup>
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <div class="container mx-auto px-[12px] md:px-24 xl:px-12 max-w-[1300px] nanum2">
        <h1 class="pb-12 mt-6 text-5xl text-center">Módulos</h1>
        <div class="grid grid-cols-1 mt-12 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-28 lg:gap-y-16">
            <div class="relative flex flex-col h-48 text-gray-700 bg-white shadow-md group rounded-xl bg-clip-border">
                <Link href="/Cashier" class="block">
                    <div class="h-28">
                        <div
                            class="absolute -top-20 lg:top-[-10%] left-[5%] z-40  group-hover:top-[-40%] group-hover:opacity-[0.9]   duration-300 w-[90%] h-48 bg-mantis-400 rounded-xl justify-items-center align-middle">
                            <img src="/images/cashier-blanco.png"
                                class="m-auto mt-6 w-36 h-36" alt="Cashier" title="Cashier" loading="lazy"
                                width="200" height="200">
                        </div>
                    </div>
                    <div class="z-10 w-full p-6 ">
                        <p
                            class="inline-block w-full mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-center text-tg">
                            Caja
                        </p>
                    </div>
                </Link>
                
                
                
            </div>

            <!-- <div class="relative flex flex-col h-48 text-gray-700 bg-white shadow-md group rounded-xl bg-clip-border">
                <Link href="/Kitchen" class="block">
                    <div class="h-28">
                        <div
                            class="absolute -top-20 lg:top-[-10%] left-[5%] z-40  group-hover:top-[-40%] group-hover:opacity-[0.9]   duration-300 w-[90%] h-48 bg-mantis-400 rounded-xl justify-items-center align-middle">
                            <img src="/images/kitchen-blanco.png"
                                class="m-auto mt-6 w-36 h-36" alt="Toys and Baby Products"
                                title="Toys and Baby Products" loading="lazy" width="200" height="200">
                        </div>
                    </div>
                    <div class="z-10 w-full p-6 ">
                        <p
                            class="inline-block w-full mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-center text-tg">
                            Cocina 
                        </p>
                    </div>
                </Link>
            </div>
            -->

            <div class="relative flex flex-col h-48 text-gray-700 bg-white shadow-md group rounded-xl bg-clip-border">
                <Link href="/delivery" class="block">
                    <div class="h-28">
                        <div
                            class="absolute -top-20 lg:top-[-10%] left-[5%] z-40  group-hover:top-[-40%] group-hover:opacity-[0.9]   duration-300 w-[90%] h-48 bg-mantis-400 rounded-xl justify-items-center align-middle">
                            <img src="/images/delivery2.png"
                                class="m-auto mt-6 w-36 h-36" alt="Medical" title="Medical" loading="lazy" width="200"
                                height="200">
                        </div>
                    </div>
                    <div class="z-10 w-full p-6 ">
                        <p
                            class="inline-block w-full mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-center text-tg">
                            Delivery
                        </p>
                    </div>
                </Link>
            </div>

            <div class="relative flex flex-col h-48 text-gray-700 bg-white shadow-md group rounded-xl bg-clip-border">
                <Link href="/Admin" class="block">
                    <div class="h-28">
                        <div
                            class="absolute -top-20 lg:top-[-10%] left-[5%] z-40  group-hover:top-[-40%] group-hover:opacity-[0.9]   duration-300 w-[90%] h-48 bg-mantis-400 rounded-xl justify-items-center align-middle">
                            <img src="/images/admin-blanco.png"
                                class="m-auto mt-6 w-36 h-36" alt="Medical" title="Medical" loading="lazy" width="200"
                                height="200">
                        </div>
                    </div>
                    <div class="z-10 w-full p-6 ">
                        <p
                            class="inline-block w-full mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-center text-tg">
                            Administrador
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    </div>
    
</template>
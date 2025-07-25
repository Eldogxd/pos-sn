<template>
    <AppLayout title="Productos">
        <template #header>
            <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
              Panel de Administrador
            </h2>
            <NavLayout />
            </div>
        </template>

        <div class="p-10">
            <h1 class="mb-4 text-2xl font-bold">Productos</h1>

            <button @click="openCreateModal" class="px-4 py-2 mb-4 text-white rounded bg-mantis-500 hover:bg-mantis-600">
            Crear Producto
            </button>

            <table class="w-full border">
                <thead>
                    <tr class="text-left bg-gray-100">
                        <th class="p-2 border">Nombre</th>
                        <th class="p-2 border">Precio</th>
                        <th class="p-2 border">Categoría</th>
                        <th class="p-2 border">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50">
                        <td class="p-2 border">{{ product.name }}</td>
                        <td class="p-2 border">C${{ product.price }}</td>
                        <td class="p-2 border">{{ product.category }}</td>
                        <td class="p-2 border">
                            <button @click="openEditModal(product)" class="mr-2 text-mantis-400">Editar</button>
                            <button @click="deleteProduct(product.id)" class="text-red-400">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Modal -->
            <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                    <h2 class="mb-4 text-xl font-bold">{{ editMode ? 'Editar Producto' : 'Crear Producto' }}</h2>

                    <form @submit.prevent="submit">
                        <div class="mb-4">
                            <label class="block mb-1">Nombre</label>
                            <input v-model="form.name" type="text" class="w-full p-2 border rounded" />
                        </div>

                        <div class="mb-4">
                            <label class="block mb-1">Precio</label>
                            <input v-model="form.price" type="number" class="w-full p-2 border rounded" />
                        </div>

                        <div class="mb-4">
                            <label class="block mb-1">Categoría</label>
                            <select v-model="form.category" class="w-full p-2 border rounded" >
                                <option value="Sopas">Sopas</option>
                                <option value="Desayunos">Desayunos</option>
                                <option value="Bebidas">Bebidas</option>
                                <option value="Extras">Extras</option>
                                <option value="Postres">Postres</option>
                            </select>
                        </div>

                       <div class="flex justify-end gap-2">
                            <button type="button" @click="closeModal" class="px-4 py-2 rounded bg-gray">Cancelar</button>
                            <button type="submit" class="px-4 py-2 text-white rounded bg-mantis-400">
                                {{ editMode ? 'Actualizar' : 'Guardar' }}
                            </button>
                       </div>
                    </form>
                </div>
            </div>
         </div>

 <div v-if="Object.keys(form.errors).length" class="mb-4 text-red-500">
  <ul>
    <li v-for="(error, field) in form.errors" :key="field">{{ error }}</li>
  </ul>
</div>
  
    </AppLayout>
</template>


<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref } from 'vue'
import { router, useForm, usePage } from '@inertiajs/vue3'
import { Link } from '@inertiajs/vue3'
import NavLayout from '@/Layouts/NavLayout.vue';

const props = defineProps({
    products: Array,
})

const showModal =ref(false)
const editMode =ref(false)
const editingProductId =ref(null)

const form = useForm({
    name: '',
    price: '',
    category: ''
})

const openCreateModal = () => {
    editMode.value = false
    editingProductId.value = null
    form.reset()
    showModal.value = true
}

const openEditModal = (product) => {
    editMode.value = true
    editingProductId.value = product.id
    form.name = product.name
    form.price = product.price
    form.category = product.category
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    form.reset()
    form.clearErrors()
}

const submit = () => {
    if (editMode.value) {
        form.put(route('productos.update', editingProductId.value),{
            onSuccess: closeModal
        })
    } else {
        form.post(route('productos.store'), {
            onSuccess: closeModal
        })
    }
}

const deleteProduct = (id) => {
    if(confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        router.delete(route('productos.destroy', id))
    }
}

</script>
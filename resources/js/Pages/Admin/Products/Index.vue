<template>
    <AppLayout title="Productos">
        <template #header>
            <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
              Productos
            </h2>
             <NavLayout />
            </div>
        </template>

                <div class="p-4 md:p-10">
            <h1 class="mb-4 text-2xl font-bold">Productos</h1>

                        <button @click="openCreateModal" class="w-full px-4 py-2 mb-4 text-white rounded md:w-auto bg-mantis-500 hover:bg-mantis-600">
            Crear Producto
            </button>
                        <!-- Tabla desktop/tablet -->
                        <div class="hidden w-full md:block">
                            <div class="overflow-x-auto border rounded">
                                <table class="w-full text-sm border-none">
                                    <thead>
                                        <tr class="text-left bg-gray-100">
                                            <th class="p-2 border">Nombre</th>
                                            <th class="p-2 border">Precio</th>
                                            <th class="p-2 border">Categoría</th>
                                            <th class="p-2 border">PedidosYa</th>
                                            <th class="p-2 border">Precio PY</th>
                                            <th class="p-2 border">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="product in products" :key="product.id" class="transition-colors hover:bg-gray-50">
                                            <td class="p-2 border">{{ product.name }}</td>
                                            <td class="p-2 border">C${{ product.price }}</td>
                                            <td class="p-2 border">{{ product.category }}</td>
                                            <td class="p-2 border">{{ product.is_py ? 'Sí' : 'No' }}</td>
                                            <td class="p-2 border">C${{ product.py_price }}</td>
                                            <td class="p-2 border">
                                                <div class="flex flex-wrap gap-2">
                                                    <button @click="openEditModal(product)" class="text-mantis-500 hover:underline">Editar</button>
                                                    <button v-if="!product.is_generic" @click="deleteProduct(product.id)" class="text-red-500 hover:underline">Eliminar</button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- Tarjetas móviles -->
                        <div class="space-y-3 md:hidden">
                            <div v-for="product in products" :key="product.id" class="p-4 border rounded shadow-sm bg-white/70 backdrop-blur-sm">
                                <div class="flex items-start justify-between">
                                    <div class="space-y-1">
                                        <p class="text-base font-semibold text-gray-800">{{ product.name }}</p>
                                        <p class="text-xs text-gray-500">Categoría: {{ product.category }}</p>
                                        <p class="text-xs text-gray-600">Precio: C${{ product.price }}</p>
                                        <p v-if="product.is_py" class="text-xs text-green-600">PedidosYa: C${{ product.py_price }}</p>
                                        <p v-else class="text-xs text-gray-400">No en PedidosYa</p>
                                    </div>
                                    <span class="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded">ID {{ product.id }}</span>
                                </div>
                                <div class="flex gap-4 mt-3 text-sm">
                                    <button @click="openEditModal(product)" class="font-medium text-mantis-600">Editar</button>
                                    <button v-if="!product.is_generic" @click="deleteProduct(product.id)" class="font-medium text-red-500">Eliminar</button>
                                </div>
                            </div>
                        </div>

            <!-- Modal -->
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-start justify-center pt-10 overflow-y-auto bg-black bg-opacity-40">
    <div class="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-md sm:mx-auto">
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
                <select v-model="form.category" class="w-full p-2 border rounded">
                    <option value="Sopas">Sopas</option>
                    <option value="Desayunos">Desayunos</option>
                    <option value="Bebidas">Bebidas</option>
                    <option value="Extras">Extras</option>
                    <option value="Postres">Postres</option>
                    <option value="Otros">Otros</option>
                </select>
            </div>

                        <!-- Toggle PedidosYa accesible -->
                        <div class="mt-2 mb-2">
                            <button type="button" role="switch" :aria-checked="form.is_py ? 'true' : 'false'" @click="form.is_py = !form.is_py" class="flex items-center gap-3 group">
                                <span class="text-sm font-medium select-none">¿Producto Pedidos Ya?</span>
                                <span :class="form.is_py ? 'bg-green-500' : 'bg-gray-300'" class="relative inline-flex h-6 transition-colors rounded-full w-11">
                                    <span :class="form.is_py ? 'translate-x-5' : 'translate-x-0'" class="absolute w-4 h-4 transition-transform duration-200 bg-white rounded-full shadow top-1 left-1" />
                                </span>
                                <span class="text-xs text-gray-500">{{ form.is_py ? 'Sí' : 'No' }}</span>
                            </button>
                        </div>

            



            <!-- 🔹 Precio de PedidosYa -->
            <div v-if="form.is_py" class="mt-4 mb-4">
                <label for="price_py" class="block">Precio Pedidos Ya</label>
                <input
                    type="number"
                    id="py_price"
                    v-model="form.py_price"
                    step="0.01"
                    min="0"
                    placeholder="Ingrese precio"
                    class="w-full p-1 border rounded"
                    :required="form.is_py"
                />
                <!-- Mensaje de error -->
                <small v-if="form.errors.py_price" class="text-red-500">{{ form.errors.py_price }}</small>
            </div>

            <div class="flex flex-col justify-end gap-2 mt-2 sm:flex-row">
                <button type="button" @click="closeModal" class="w-full px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 sm:w-auto">Cancelar</button>
                <button type="submit" class="w-full px-4 py-2 text-white rounded sm:w-auto bg-mantis-500 hover:bg-mantis-600">
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
import { nextTick } from 'vue'



const props = defineProps({
    products: Array,
})

const showModal =ref(false)
const editMode =ref(false)
const editingProductId =ref(null)

const form = useForm({
    name: '',
    price: '',
    category: '',
    is_py: false,
    py_price: ''
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
    form.is_py = product.is_py
    form.py_price = product.py_price
    showModal.value = true
    nextTick(() => {
        // el DOM se actualiza y peer-checked se aplica
    })
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

<template>
    <AppLayout title="Mesas">
        <template #header>
            <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
              Panel de Administrador
            </h2>
            <NavLayout />
            </div>
        </template>

        <div class="p-10">
            <h1 class="mb-4 text-2xl font-bold">Mesas</h1>

            <button @click="openCreateModal" class="px-4 py-2 mb-4 text-white rounded bg-mantis-500 hover:bg-mantis-600">
            Crear Mesa
            </button>    

            <table class="w-full border">
               <thead>
                <tr class="text-left bg-gray-100">
                    <th class="p-2 border">Número de Mesa</th>
                    <th class="p-2 border">Estado</th>
                    <th class="p-2 border">Acciones</th>
                </tr>
               </thead>
                <tbody>
                    <tr v-for="table in tables" :key="table.id" class="hover:bg-gray-50">
                        <td class="p-2 border">{{ table.number }}</td>
                        <td class="p-2 border">{{ table.status }}</td>
                        <td class="p-2 border">
                            <button @click="openEditModal(table)" class="mr-2 text-mantis-400">Editar</button>
                            <button @click="deleteTable(table.id)" class="text-red-400">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!--Modal-->
            <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                    <h2 class="mb-4 text-xl font-bold">{{ editMode ? 'Editar Mesa':'Crear Mesa' }}</h2>

                    <form @submit.prevent="submit">
                        <div class="mb-4">
                            <label class="block mb-1">Número de Mesa</label>
                            <input v-model="form.number" type="text" class="w-full p-2 border rounded" />
                        </div>

                        <div class="mb-4">
                            <label class="block mb-1">Estado</label>
                            <select v-model="form.status" class="w-full p-2 border rounded" >
                                <option value="Libre">Libre</option>
                                <option value="Ocupada">Ocupada</option>
                            </select>
                        </div>

                        <div class="flex gap-2 justifyend">
                             <button @click="closeModal" type="button" class="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">
                                Cancelar
                            </button>
                            <button type="submit" class="px-4 py-2 text-white rounded bg-mantis-500 hover:bg-mantis-600">
                                {{ editMode ? 'Actualizar' : 'Crear' }}
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
    tables: Array,
})
const showModal = ref(false)
const editMode = ref(false)
const editingTableId = ref(null)

const form = useForm({
    number: '',
    status: '',
})

const openCreateModal = () => {
    editMode.value = false
    editingTableId.value = null
    form.reset()
    showModal.value = true
}

const openEditModal = (table) => {
    editMode.value = true
    editingTableId.value = table.id
    form.number = table.number
    form.status = table.status
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    form.reset()
    form.clearErrors()
}

const submit =() => {
    if (editMode.value){
        form.put(route('mesas.update',editingTableId.value),{
           onSuccess: closeModal
            })
        
    } else {
        form.post(route('mesas.store'),{
            onSuccess: closeModal
        })
    }
}

const deleteTable = (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta mesa?')) {
       router.delete(route('mesas.destroy', id))
    }
}


</script>
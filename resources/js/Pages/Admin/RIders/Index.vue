<template>
  <AppLayout title="Motorizados">
    <template #header>
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
              Motorizados
            </h2>
             <NavLayout />
            </div>
    </template>

    <div class="p-4 md:p-10">
      <h1 class="mb-4 text-2xl font-bold">Motorizados</h1>

      <button @click="openCreateModal" class="w-full px-4 py-2 mb-4 text-white rounded md:w-auto bg-mantis-500 hover:bg-mantis-600">
        Crear Motorizado
      </button>

      <!-- Desktop / Tablet Table -->
      <div class="hidden w-full md:block">
        <div class="overflow-x-auto border rounded">
          <table class="w-full text-sm border-none">
            <thead>
              <tr class="text-left bg-gray-100">
                <th class="p-2 border">Nombre</th>
                <th class="p-2 border">Estado</th>
                <th class="p-2 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="rider in riders" :key="rider.id" class="transition-colors hover:bg-gray-50">
                <td class="p-2 border">{{ rider.name }}</td>
                <td class="p-2 border">
                  <span :class="rider.status === 'active' ? 'text-green-600' : 'text-red-500'">
                    {{ rider.status === 'active' ? 'Activo' : 'Inactivo' }}
                  </span>
                </td>
                <td class="p-2 border">
                  <div class="flex flex-wrap gap-2">
                    <button @click="openEditModal(rider)" class="text-mantis-500 hover:underline">Editar</button>
                    <button @click="deleteRider(rider.id)" class="text-red-500 hover:underline">Eliminar</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Mobile Cards -->
      <div class="space-y-3 md:hidden">
        <div v-for="rider in riders" :key="rider.id" class="p-4 border rounded shadow-sm bg-white/70 backdrop-blur-sm">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-base font-semibold text-gray-800">{{ rider.name }}</p>
              <p class="text-xs" :class="rider.status === 'active' ? 'text-green-600' : 'text-red-500'">
                {{ rider.status === 'active' ? 'Activo' : 'Inactivo' }}
              </p>
            </div>
            <span class="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded">ID: {{ rider.id }}</span>
          </div>
          <div class="flex gap-4 mt-3 text-sm">
            <button @click="openEditModal(rider)" class="font-medium text-mantis-600">Editar</button>
            <button @click="deleteRider(rider.id)" class="font-medium text-red-500">Eliminar</button>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-start justify-center pt-10 overflow-y-auto bg-black bg-opacity-40">
        <div class="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-md sm:mx-auto">
          <h2 class="mb-4 text-xl font-bold">{{ editMode ? 'Editar Motorizado' : 'Crear Motorizado' }}</h2>

          <form @submit.prevent="submit">
            <div class="mb-4">
              <label class="block mb-1">Nombre</label>
              <input v-model="form.name" type="text" class="w-full p-2 border rounded" />
            </div>

            <div class="mb-4">
              <label class="block mb-1">Estado</label>
              <select v-model="form.status" class="w-full p-2 border rounded">
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </select>
            </div>

            <div class="flex flex-col justify-end gap-2 sm:flex-row">
              <button type="button" @click="closeModal" class="w-full px-4 py-2 bg-gray-200 rounded sm:w-auto hover:bg-gray-300">Cancelar</button>
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
import AppLayout from '@/Layouts/AppLayout.vue'
import NavLayout from '@/Layouts/NavLayout.vue'
import { ref } from 'vue'
import { router, useForm } from '@inertiajs/vue3'

const props = defineProps({
  riders: Array
})

const showModal = ref(false)
const editMode = ref(false)
const editingRiderId = ref(null)

const form = useForm({
  name: '',
  status: 'active'
})

const openCreateModal = () => {
  editMode.value = false
  editingRiderId.value = null
  form.reset()
  form.status = 'active'
  showModal.value = true
}

const openEditModal = (rider) => {
  editMode.value = true
  editingRiderId.value = rider.id
  form.name = rider.name
  form.status = rider.status
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  form.reset()
  form.clearErrors()
}

const submit = () => {
  if (editMode.value) {
    form.put(route('riders.update', editingRiderId.value), {
       onSuccess: () => {
        closeModal()
        window.location.reload()
      }
      
    })
  } else {
    form.post(route('riders.store'), {
       onSuccess: () => {
        closeModal()
        window.location.reload()
      }
      
    })
  }
}

const deleteRider = (id) => {
  if (confirm('¿Seguro que deseas eliminar este motorizado?')) {
    router.delete(route('riders.destroy', id))
  }
}



// Use computed riders from props
const riders = props.riders
</script>

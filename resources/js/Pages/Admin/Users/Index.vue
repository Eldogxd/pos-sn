

<template>
    <AppLayout title="Usuarios">
        <template #header>
           <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
              Usuarios
            </h2>
             <NavLayout />
            </div>
        </template>

        <div class="p-4 md:p-10">
    <h1 class="mb-4 text-2xl font-bold">Usuarios</h1>

    <button @click="openCreateModal" class="w-full px-4 py-2 mb-4 text-white rounded md:w-auto bg-mantis-500 hover:bg-mantis-600">
      Crear Usuario
    </button>

    <!-- Desktop / Tablet Table -->
    <div class="hidden w-full md:block">
      <div class="overflow-x-auto border rounded">
        <table class="w-full text-sm border-none">
          <thead>
            <tr class="text-left bg-gray-100">
              <th class="p-2 border">Nombre</th>
              <th class="p-2 border">Email</th>
              <th class="p-2 border">Rol</th>
              <th class="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="transition-colors hover:bg-gray-50">
              <td class="p-2 border">{{ user.name }}</td>
              <td class="p-2 border">{{ user.email }}</td>
              <td class="p-2 border">{{ user.role }}</td>
              <td class="p-2 border">
                <div class="flex flex-wrap gap-2">
                  <button @click="openEditModal(user)" class="text-mantis-500 hover:underline">Editar</button>
                  <button @click="deleteUser(user.id)" class="text-red-500 hover:underline">Eliminar</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Mobile Cards -->
    <div class="space-y-3 md:hidden">
      <div v-for="user in users" :key="user.id" class="p-4 border rounded shadow-sm bg-white/70 backdrop-blur-sm">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-base font-semibold text-gray-800">{{ user.name }}</p>
            <p class="text-xs text-gray-500">{{ user.email }}</p>
          </div>
          <span class="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">{{ user.role }}</span>
        </div>
        <div class="flex gap-4 mt-3 text-sm">
          <button @click="openEditModal(user)" class="font-medium text-mantis-600">Editar</button>
          <button @click="deleteUser(user.id)" class="font-medium text-red-500">Eliminar</button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-start justify-center pt-10 overflow-y-auto bg-black bg-opacity-40">
      <div class="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-md sm:mx-auto">
        <h2 class="mb-4 text-xl font-bold">{{ editMode ? 'Editar Usuario' : 'Crear Usuario' }}</h2>

        <form @submit.prevent="submit">
          <div class="mb-4">
            <label class="block mb-1">Nombre</label>
            <input v-model="form.name" type="text" class="w-full p-2 border rounded" />
          </div>

          <div class="mb-4">
            <label class="block mb-1">Email</label>
            <input v-model="form.email" type="email" class="w-full p-2 border rounded" />
          </div>

          <div class="mb-4">
            <label class="block mb-1">Contraseña <span v-if="editMode">(opcional)</span></label>
             <input v-model="form.password" type="password" class="w-full p-2 border rounded" />
         </div>

         <div class="mb-4">
             <label class="block mb-1">Confirmar Contraseña</label>
             <input v-model="form.password_confirmation" type="password" class="w-full p-2 border rounded" />
           </div>

          <div class="mb-4">
            <label class="block mb-1">Rol</label>
            <select v-model="form.role" class="w-full p-2 border rounded">
              <option value="admin">Admin</option>
              <option value="cajero">Caja</option>
              <option value="cocina">Cocina</option>
              <option value="delivery">Delivery</option>
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
import AppLayout from '@/Layouts/AppLayout.vue';
import NavLayout from '@/Layouts/NavLayout.vue';
import { ref } from 'vue'
import { router, useForm, usePage } from '@inertiajs/vue3'
import { Link } from '@inertiajs/vue3'


const props = defineProps({
  users: Array
})

const showModal = ref(false)
const editMode = ref(false)
const editingUserId = ref(null)

const form = useForm({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  role: 'user'
})

const openCreateModal = () => {
  editMode.value = false
  editingUserId.value = null
  form.reset()
  showModal.value = true
}

const openEditModal = (user) => {
  editMode.value = true
  editingUserId.value = user.id
  form.name = user.name
  form.email = user.email
  form.role = user.role
  form.password = '' 
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  form.reset(); 
  form.clearErrors(); 
}

const submit = () => {
  if (editMode.value) {
    form.put(route('usuarios.update', editingUserId.value), {
      onSuccess: closeModal
    })
  } else {
    form.post(route('usuarios.store'), {
      onSuccess: closeModal
    })
  }
}

const deleteUser = (id) => {
  if (confirm('¿Seguro que deseas eliminar este usuario?')) {
    router.delete(route('usuarios.destroy', id))
  }
}
</script>
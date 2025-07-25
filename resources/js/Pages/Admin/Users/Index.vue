

<template>
    <AppLayout title="Usuarios">
        <template #header>
            <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
              Panel de Administrador
            </h2>
            <NavLayout />
            </div>
        </template>

        <div class="p-10">
    <h1 class="mb-4 text-2xl font-bold">Usuarios</h1>

    <button @click="openCreateModal" class="px-4 py-2 mb-4 text-white rounded bg-mantis-500 hover:bg-mantis-600">
      Crear Usuario
    </button>

    <table class="w-full border">
      <thead>
        <tr class="text-left bg-gray-100">
          <th class="p-2 border">Nombre</th>
          <th class="p-2 border">Email</th>
          <th class="p-2 border">Rol</th>
          <th class="p-2 border">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
          <td class="p-2 border">{{ user.name }}</td>
          <td class="p-2 border">{{ user.email }}</td>
          <td class="p-2 border">{{ user.role }}</td>
          <td class="p-2 border">
            <button @click="openEditModal(user)" class="mr-2 text-mantis-400">Editar</button>
            <button @click="deleteUser(user.id)" class="text-red-400">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
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

          <div class="flex justify-end gap-2">
            <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
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
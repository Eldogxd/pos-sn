<template>
  <AppLayout title="Usuarios">
    <template #header>
      <NavLayout />
    </template>

    <div class="p-3 mx-auto space-y-4 max-w-6xl sm:p-6">
      <!-- Encabezado -->
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-xl font-bold text-gray-900 sm:text-2xl">Usuarios</h1>
          <p class="text-xs text-gray-500">Total registrados: <strong class="text-gray-800">{{ users.length }}</strong></p>
        </div>
        <button @click="openCreateModal" class="btn btn-primary w-full sm:w-auto">
          <i class="pi pi-plus text-xs"></i>
          <span>Nuevo Usuario</span>
        </button>
      </div>

      <!-- Vista Móvil: Tarjetas -->
      <div class="space-y-2.5 md:hidden">
        <div v-if="users.length === 0" class="p-8 text-center text-sm text-gray-500 card">
          No hay usuarios registrados.
        </div>

        <div
          v-for="user in users"
          :key="`m-${user.id}`"
          class="p-3.5 card space-y-2.5"
        >
          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0">
              <p class="font-bold text-gray-900 truncate">{{ user.name }}</p>
              <p class="text-xs text-gray-500 truncate">{{ user.email }}</p>
            </div>
            <span
              class="px-2.5 py-0.5 text-[11px] font-semibold rounded-full capitalize shrink-0"
              :class="user.role === 'admin' ? 'bg-gray-900 text-white' : (user.role === 'cajero' ? 'bg-mantis-100 text-mantis-800' : (user.role === 'delivery' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'))"
            >
              {{ user.role }}
            </span>
          </div>

          <div class="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
            <button @click="openEditModal(user)" class="btn btn-outline flex-1 py-1.5 text-xs">
              <i class="pi pi-pencil text-xs"></i>
              <span>Editar</span>
            </button>
            <button @click="deleteUser(user.id)" class="btn btn-danger py-1.5 px-3 text-xs" title="Eliminar">
              <i class="pi pi-trash text-xs"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Vista Desktop: Tabla -->
      <div class="hidden overflow-hidden card md:block">
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm text-gray-700">
            <thead class="text-xs font-semibold tracking-wide text-gray-600 uppercase border-b border-gray-200 bg-gray-50">
              <tr>
                <th class="px-5 py-3.5 text-left">Nombre</th>
                <th class="px-5 py-3.5 text-left">Correo</th>
                <th class="px-5 py-3.5 text-center">Rol</th>
                <th class="px-5 py-3.5 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="user in users" :key="user.id" class="transition hover:bg-gray-50/70">
                <td class="px-5 py-3.5 font-semibold text-gray-900">{{ user.name }}</td>
                <td class="px-5 py-3.5 text-gray-600">{{ user.email }}</td>
                <td class="px-5 py-3.5 text-center">
                  <span
                    class="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full capitalize"
                    :class="user.role === 'admin' ? 'bg-gray-900 text-white' : (user.role === 'cajero' ? 'bg-mantis-100 text-mantis-800' : (user.role === 'delivery' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'))"
                  >
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-5 py-3.5">
                  <div class="flex items-center justify-center gap-2">
                    <button @click="openEditModal(user)" class="btn btn-outline py-1.5 px-3 text-xs">
                      <i class="pi pi-pencil text-xs"></i>
                      <span>Editar</span>
                    </button>
                    <button @click="deleteUser(user.id)" class="btn btn-danger py-1.5 px-3 text-xs">
                      <i class="pi pi-trash text-xs"></i>
                      <span>Eliminar</span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="users.length === 0">
                <td colspan="4" class="px-6 py-10 text-center text-gray-500">No hay usuarios registrados.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal Crear / Editar Usuario -->
    <div v-if="showModal" class="modal-backdrop">
      <div class="modal-sheet w-full max-w-lg lg:h-auto">
        <div class="modal-header shrink-0">
          <h2 class="modal-title">{{ editMode ? 'Editar Usuario' : 'Nuevo Usuario' }}</h2>
          <button @click="closeModal" type="button" class="icon-btn">
            <i class="pi pi-times text-sm"></i>
          </button>
        </div>

        <form @submit.prevent="submit" class="flex flex-col flex-1 min-h-0">
          <div class="p-4 space-y-4 overflow-y-auto sm:p-5">
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label class="label">Nombre</label>
                <input v-model="form.name" type="text" class="input" placeholder="Nombre completo" />
              </div>

              <div>
                <label class="label">Correo electrónico</label>
                <input v-model="form.email" type="email" class="input" placeholder="usuario@correo.com" />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label class="label">Contraseña {{ editMode ? '(opcional)' : '' }}</label>
                <input v-model="form.password" type="password" class="input" placeholder="••••••••" />
              </div>

              <div>
                <label class="label">Confirmar Contraseña</label>
                <input v-model="form.password_confirmation" type="password" class="input" placeholder="••••••••" />
              </div>
            </div>

            <div>
              <label class="label">Rol</label>
              <select v-model="form.role" class="input">
                <option value="admin">Admin</option>
                <option value="cajero">Caja</option>
                <option value="cocina">Cocina</option>
                <option value="delivery">Delivery</option>
              </select>
            </div>

            <div v-if="Object.keys(form.errors).length" class="p-3 text-xs text-red-700 border border-red-200 rounded-xl bg-red-50">
              <ul class="space-y-0.5 list-disc list-inside">
                <li v-for="(error, field) in form.errors" :key="field">{{ error }}</li>
              </ul>
            </div>
          </div>

          <div class="modal-footer justify-end gap-2 pb-safe shrink-0">
            <button type="button" @click="closeModal" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-primary">
              <i class="pi pi-check text-xs"></i>
              <span>{{ editMode ? 'Actualizar' : 'Guardar' }}</span>
            </button>
          </div>
        </form>
      </div>
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
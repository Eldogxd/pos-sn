<template>
  <AppLayout title="Mesas">
    <template #header>
      <NavLayout />
    </template>

    <div class="p-3 mx-auto space-y-4 max-w-5xl sm:p-6">
      <!-- Encabezado -->
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-xl font-bold text-gray-900 sm:text-2xl">Mesas</h1>
          <p class="text-xs text-gray-500">Total registradas: <strong class="text-gray-800">{{ tables.length }}</strong></p>
        </div>
        <button @click="openCreateModal" class="btn btn-primary w-full sm:w-auto">
          <i class="pi pi-plus text-xs"></i>
          <span>Nueva Mesa</span>
        </button>
      </div>

      <!-- Vista Móvil: Tarjetas -->
      <div class="space-y-2.5 md:hidden">
        <div v-if="tables.length === 0" class="p-8 text-center text-sm text-gray-500 card">
          No hay mesas registradas.
        </div>

        <div
          v-for="table in tables"
          :key="`m-${table.id}`"
          class="flex items-center justify-between gap-3 p-3.5 card"
        >
          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <span class="text-base font-bold text-gray-900">Mesa {{ table.number }}</span>
              <span
                class="px-2 py-0.5 text-[11px] font-semibold rounded-full capitalize"
                :class="(table.status || '').toLowerCase() === 'libre' ? 'bg-mantis-100 text-mantis-800' : 'bg-amber-100 text-amber-800'"
              >
                {{ table.status }}
              </span>
            </div>
            <p class="text-xs text-gray-400 mt-0.5">ID #{{ table.id }}</p>
          </div>

          <div class="flex items-center gap-1.5 shrink-0">
            <button @click="openEditModal(table)" class="btn btn-outline py-1.5 px-3 text-xs">
              <i class="pi pi-pencil text-xs"></i>
              <span>Editar</span>
            </button>
            <button @click="deleteTable(table.id)" class="btn btn-danger py-1.5 px-2.5 text-xs" title="Eliminar">
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
                <th class="px-5 py-3.5 text-left">Número</th>
                <th class="px-5 py-3.5 text-center">Estado</th>
                <th class="px-5 py-3.5 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="table in tables" :key="table.id" class="transition hover:bg-gray-50/70">
                <td class="px-5 py-3.5 font-semibold text-gray-900">Mesa {{ table.number }}</td>
                <td class="px-5 py-3.5 text-center">
                  <span
                    class="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full capitalize"
                    :class="(table.status || '').toLowerCase() === 'libre' ? 'bg-mantis-100 text-mantis-800' : 'bg-amber-100 text-amber-800'"
                  >
                    {{ table.status }}
                  </span>
                </td>
                <td class="px-5 py-3.5">
                  <div class="flex items-center justify-center gap-2">
                    <button @click="openEditModal(table)" class="btn btn-outline py-1.5 px-3 text-xs">
                      <i class="pi pi-pencil text-xs"></i>
                      <span>Editar</span>
                    </button>
                    <button @click="deleteTable(table.id)" class="btn btn-danger py-1.5 px-3 text-xs">
                      <i class="pi pi-trash text-xs"></i>
                      <span>Eliminar</span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="tables.length === 0">
                <td colspan="3" class="px-6 py-10 text-center text-gray-500">No hay mesas registradas.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal Crear / Editar Mesa -->
    <div v-if="showModal" class="modal-backdrop">
      <div class="modal-sheet w-full max-w-md lg:h-auto">
        <div class="modal-header shrink-0">
          <h2 class="modal-title">{{ editMode ? 'Editar Mesa' : 'Nueva Mesa' }}</h2>
          <button @click="closeModal" type="button" class="icon-btn">
            <i class="pi pi-times text-sm"></i>
          </button>
        </div>

        <form @submit.prevent="submit" class="flex flex-col flex-1 min-h-0">
          <div class="p-4 space-y-4 overflow-y-auto sm:p-5">
            <div>
              <label class="label">Número / Identificador</label>
              <input v-model="form.number" type="text" class="input" placeholder="Ej: 1, Barra, Terraza" />
            </div>

            <div>
              <label class="label">Estado</label>
              <select v-model="form.status" class="input">
                <option value="libre">Libre</option>
                <option value="ocupada">Ocupada</option>
              </select>
            </div>

            <div v-if="Object.keys(form.errors).length" class="p-3 text-xs text-red-700 border border-red-200 rounded-xl bg-red-50">
              <ul class="space-y-0.5 list-disc list-inside">
                <li v-for="(error, field) in form.errors" :key="field">{{ error }}</li>
              </ul>
            </div>
          </div>

          <div class="modal-footer justify-end gap-2 pb-safe shrink-0">
            <button @click="closeModal" type="button" class="btn btn-secondary">Cancelar</button>
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
    form.status = (table.status || 'libre').toLowerCase()
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
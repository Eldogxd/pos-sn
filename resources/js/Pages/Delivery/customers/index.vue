<template>
  <AppLayout title="Clientes">
    <!-- Header -->
    <template #header>
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-semibold text-gray-900">Clientes</h2>
          <p class="mt-0.5 text-sm text-gray-500">Gestiona tus clientes, direcciones y datos fiscales</p>
        </div>
        <NavDelivery />
      </div>
    </template>

    <!-- Top controls -->
    <div class="px-4 mx-auto mt-6 max-w-7xl sm:px-6 lg:px-8">
      <div class="flex flex-col gap-3 p-4 bg-white border border-gray-100 shadow-sm rounded-xl sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center w-full gap-3 px-3 py-2 border border-gray-100 rounded-lg sm:max-w-xl bg-gray-50">
          <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 w-5 h-5 text-mantis-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
          <input
            v-model="search"
            @input="onSearchInput"
            type="search"
            placeholder="Buscar por nombre, RUC o teléfono..."
            class="w-full text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
            aria-label="Buscar clientes"
          />
          <button v-if="search" @click="resetFilters" class="px-2 py-1 text-xs text-gray-500 rounded hover:bg-gray-100">Limpiar</button>
        </div>

        <div class="flex items-center gap-3">
          <div class="relative">
            <select v-model="filterBy" class="py-2 pl-3 pr-8 text-sm bg-white border border-gray-200 rounded-lg appearance-none w-44">
              <option value="any">Cualquier campo</option>
              <option value="name">Nombre</option>
              <option value="fiscal_ruc">RUC</option>
              <option value="phone">Teléfono</option>
            </select>
            <svg class="absolute w-4 h-4 text-gray-400 -translate-y-1/2 pointer-events-none right-2 top-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <button @click="applyFilters" class="px-4 py-2 text-sm font-medium text-white rounded-lg shadow bg-gradient-to-r from-mantis-400 to-mantis-500 hover:from-mantis-500 hover:to-mantis-600">
            Aplicar
          </button>

          <button @click="openCreateModal" class="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg shadow bg-mantis-500 hover:bg-mantis-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Crear cliente
          </button>
        </div>
      </div>

      <div class="flex items-center justify-between mt-2 text-xs text-gray-500">
        <div>
          <span class="font-medium text-gray-700">{{ customers.total ?? 0 }}</span>
          <span>clientes</span>
          <span v-if="filters && (filters.search || filters.filter)" class="ml-2 px-2 py-0.5 bg-gray-100 rounded text-gray-600">Filtros activos</span>
        </div>
        <div class="hidden text-xs text-right text-gray-400 sm:block">Consejo: usa RUC para búsquedas exactas</div>
      </div>
    </div>

    <!-- Table -->
    <div class="px-4 mx-auto mt-6 max-w-7xl sm:px-6 lg:px-8">
      <div class="overflow-hidden bg-white border border-gray-100 shadow-xl rounded-xl">
        <div class="p-4 border-b bg-gradient-to-r from-mantis-400 to-mantis-500">
          <h3 class="text-lg font-semibold text-white">Lista de clientes</h3>
          <p class="mt-1 text-sm text-white/90">Visualiza y administra la información</p>
        </div>

        <div class="relative overflow-x-auto">
          <table class="min-w-full text-sm text-left text-gray-700">
            <thead class="text-xs font-semibold text-gray-700 uppercase bg-gray-50">
              <tr>
                <th class="px-6 py-3">Nombre</th>
                <th class="px-6 py-3">Teléfono</th>
                <th class="px-6 py-3">Nombre fiscal</th>
                <th class="px-6 py-3">RUC</th>
                <th class="px-6 py-3">Direcciones</th>
                <th class="px-6 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="customer in customers.data" :key="customer.id" class="hover:bg-gray-50">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="flex items-center justify-center w-10 h-10 font-semibold rounded-full bg-mantis-100 text-mantis-800">
                      {{ (customer.name || '').charAt(0).toUpperCase() }}
                    </div>
                    <div class="truncate">
                      <div class="font-medium text-gray-900 truncate">{{ customer.name }}</div>
                      <div class="text-xs text-gray-400 truncate">{{ customer.email || '' }}</div>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-4 text-gray-600">
                  {{ customer.phone || 'N/A' }}
                </td>

                <td class="px-6 py-4">
                  <div class="text-gray-900">{{ customer.fiscal_name }}</div>
                </td>

                <td class="px-6 py-4">
                  <span class="inline-flex px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {{ customer.fiscal_ruc }}
                  </span>
                </td>

                <td class="px-6 py-4">
                  <ul class="max-w-md space-y-1">
                    <li v-for="addr in customer.addresses" :key="addr.id" class="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span class="text-sm text-gray-600 truncate">{{ addr.address }}</span>
                    </li>
                  </ul>
                </td>

                <td class="px-6 py-4 text-right">
                  <div class="inline-flex items-center gap-2">
                    <button @click="openEditModal(customer)" class="p-2 text-blue-600 rounded hover:bg-blue-50" title="Editar">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button @click="deleteCustomer(customer)" class="p-2 text-red-600 rounded hover:bg-red-50" title="Eliminar">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="customers.data.length === 0">
                <td colspan="6" class="px-6 py-8 text-center">
                  <div class="flex flex-col items-center justify-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p class="text-lg font-medium">No hay clientes registrados</p>
                    <p class="mt-1 text-sm">Agrega tu primer cliente para comenzar</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Pagination class="px-4 py-3 border-t border-gray-200 bg-gray-50" :links="customers.links" />
      </div>
    </div>

    <!-- Modal -->
    <transition name="modal">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="showModal = false">
        <div class="w-full max-w-2xl overflow-hidden bg-white shadow-2xl rounded-xl">
          <div class="px-6 py-4 text-white bg-gradient-to-r from-mantis-500 to-mantis-600">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">{{ isEditing ? 'Editar cliente' : 'Crear cliente' }}</h3>
              <button @click="showModal = false" class="p-1 rounded hover:bg-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p class="mt-1 text-sm text-white/90">Completa los datos del cliente</p>
          </div>

          <form @submit.prevent="submit" class="max-h-[65vh] overflow-y-auto px-6 py-5 space-y-5">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label class="block mb-1 text-sm font-medium text-gray-700">Nombre <span class="text-red-500">*</span></label>
                <input v-model="form.name" type="text" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mantis-500" />
              </div>
              <div>
                <label class="block mb-1 text-sm font-medium text-gray-700">Teléfono <span class="text-red-500">*</span></label>
                <input v-model="form.phone" type="text" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mantis-500" />
              </div>
              <div>
                <label class="block mb-1 text-sm font-medium text-gray-700">Nombre fiscal</label>
                <input v-model="form.fiscal_name" type="text"  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mantis-500" />
              </div>
              <div>
                <label class="block mb-1 text-sm font-medium text-gray-700">RUC</label>
                <input v-model="form.fiscal_ruc" type="text"  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mantis-500" />
              </div>
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-gray-700">Direcciones <span class="text-red-500">*</span></label>
              <div class="space-y-3">
                <div v-for="(addr, index) in form.addresses" :key="index" class="flex items-start gap-3">
                  <input v-model="form.addresses[index]" required type="text" placeholder="Ej: Av. Principal #123" class="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mantis-500" />
                  <button v-if="form.addresses.length > 1" type="button" @click="removeAddress(index)" class="p-2 text-red-600 rounded hover:bg-red-50">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6" />
                    </svg>
                  </button>
                </div>
                <button type="button" @click="addAddress" class="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-mantis-50 text-mantis-700 hover:bg-mantis-100">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Agregar dirección
                </button>
              </div>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4">
              <button type="button" @click="showModal = false" class="px-4 py-2 text-sm border rounded-lg">Cancelar</button>
              <button type="submit" class="px-4 py-2 text-sm font-medium text-white rounded-lg shadow bg-mantis-500 hover:bg-mantis-600">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </AppLayout>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { router } from '@inertiajs/vue3';
import { route } from 'ziggy-js';
import Swal from 'sweetalert2';
import NavDelivery from '@/Layouts/NavDelivery.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import Pagination from '@/Components/Pagination.vue';

const props = defineProps({
  customers: Object,
  filters: Object,
});

const search = ref(props.filters?.search ?? '');
const filterBy = ref(props.filters?.filter ?? 'any');
let searchTimeout = null;

function onSearchInput() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => applyFilters(), 450);
}

function applyFilters() {
  const params = {};
  if (search.value && search.value.trim() !== '') params.search = search.value.trim();
  if (filterBy.value && filterBy.value !== 'any') params.filter = filterBy.value;
  router.get(route('customers.index'), params, { preserveState: true, replace: true });
}

function resetFilters() {
  search.value = '';
  filterBy.value = 'any';
  applyFilters();
}

const showModal = ref(false);
const isEditing = ref(false);
const editingCustomerId = ref(null);

const form = reactive({
  name: '',
  phone: '',
  fiscal_name: '',
  fiscal_ruc: '',
  addresses: [''],
});

function openCreateModal() {
  isEditing.value = false;
  editingCustomerId.value = null;
  form.name = '';
  form.phone = '';
  form.fiscal_name = '';
  form.fiscal_ruc = '';
  form.addresses = [''];
  showModal.value = true;
}

function openEditModal(customer) {
  isEditing.value = true;
  editingCustomerId.value = customer.id;
  form.name = customer.name || '';
  form.phone = customer.phone || '';
  form.fiscal_name = customer.fiscal_name || '';
  form.fiscal_ruc = customer.fiscal_ruc || '';
  form.addresses = customer.addresses && customer.addresses.length ? customer.addresses.map(a => a.address) : [''];
  showModal.value = true;
}

function addAddress() { form.addresses.push(''); }
function removeAddress(i) { if (form.addresses.length > 1) form.addresses.splice(i, 1); }

function submit() {
  const validAddresses = form.addresses.filter(a => a && a.trim() !== '');
  if (validAddresses.length === 0) {
    Swal.fire('Error', 'Proporciona al menos una dirección.', 'error');
    return;
  }
  const payload = { ...form, addresses: validAddresses };

  if (isEditing.value) {
    router.put(route('customers.update', editingCustomerId.value), payload, {
      preserveScroll: true,
      onSuccess: () => { showModal.value = false; Swal.fire('¡Actualizado!', 'Cliente actualizado.', 'success'); },
      onError: () => Swal.fire('Error', 'Error al actualizar.', 'error'),
    });
  } else {
    router.post(route('customers.store'), payload, {
      preserveScroll: true,
      onSuccess: () => { showModal.value = false; Swal.fire('¡Guardado!', 'Cliente creado.', 'success'); },
      onError: () => Swal.fire('Error', 'Error al guardar.', 'error'),
    });
  }
}

async function deleteCustomer(customer) {
  const res = await Swal.fire({
    title: '¿Eliminar cliente?',
    text: `Se eliminará a ${customer.name}.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  });
  if (res.isConfirmed) {
    router.delete(route('customers.destroy', customer.id), {
      preserveScroll: true,
      onSuccess: () => Swal.fire('¡Eliminado!', 'Cliente eliminado.', 'success'),
      onError: () => Swal.fire('Error', 'No se pudo eliminar.', 'error'),
    });
  }
}

watch(showModal, val => document.body.style.overflow = val ? 'hidden' : '');
</script>

<style scoped>
/* Sutiles mejoras visuales y scroll */
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease, transform 0.15s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: translateY(6px) scale(.99); }

::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: #f3f3f3; border-radius: 8px; }
::-webkit-scrollbar-thumb { background: #cfcfcf; border-radius: 8px; }
</style>
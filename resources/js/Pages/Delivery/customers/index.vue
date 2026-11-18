<template>
  <AppLayout title="Clientes Delivery">
    <template #header>
      <NavDelivery />
    </template>

    <div class="p-3 mx-auto space-y-4 max-w-7xl sm:p-6">
      <!-- Encabezado y filtros -->
      <div class="p-3.5 space-y-3 card sm:p-5">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-xl font-bold text-gray-900 sm:text-2xl">Clientes Delivery</h1>
            <p class="text-xs text-gray-500">
              Total registrados: <strong class="text-gray-800">{{ customers.total ?? 0 }}</strong>
            </p>
          </div>
          <button @click="openCreateModal" class="btn btn-primary w-full sm:w-auto">
            <i class="pi pi-plus text-xs"></i>
            <span>Nuevo Cliente</span>
          </button>
        </div>

        <div class="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <div class="relative flex-1">
            <i class="pi pi-search text-xs text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
            <input
              v-model="search"
              @input="onSearchInput"
              type="text"
              placeholder="Buscar por nombre, teléfono, RUC..."
              class="pl-9 input"
            >
          </div>
          <div class="flex gap-2">
            <select v-model="filterBy" @change="applyFilters" class="input sm:w-44">
              <option value="any">Cualquier campo</option>
              <option value="name">Nombre</option>
              <option value="fiscal_ruc">RUC</option>
              <option value="phone">Teléfono</option>
            </select>
            <button
              v-if="search || filterBy !== 'any'"
              @click="resetFilters"
              type="button"
              class="btn btn-secondary shrink-0"
              title="Limpiar"
            >
              <i class="pi pi-filter-slash text-xs"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Vista Móvil: Tarjetas -->
      <div class="space-y-2.5 md:hidden">
        <div v-if="customers.data.length === 0" class="p-8 text-center text-sm text-gray-500 card">
          No hay clientes registrados.
        </div>

        <div
          v-for="customer in customers.data"
          :key="`m-${customer.id}`"
          class="p-3.5 card space-y-2.5"
        >
          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0">
              <p class="font-bold text-gray-900 truncate">{{ customer.name }}</p>
              <p class="text-xs text-gray-500 mt-0.5 tabular-nums">
                <i class="pi pi-phone text-[10px] mr-1"></i>{{ customer.phone || 'Sin teléfono' }}
              </p>
            </div>
            <span
              v-if="customer.fiscal_ruc"
              class="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-mantis-100 text-mantis-800 shrink-0 tabular-nums"
            >
              RUC: {{ customer.fiscal_ruc }}
            </span>
          </div>

          <div v-if="customer.fiscal_name" class="text-xs text-gray-600">
            <span class="text-gray-400">Fiscal:</span> {{ customer.fiscal_name }}
          </div>

          <div v-if="customer.addresses && customer.addresses.length" class="space-y-1 pt-1">
            <p
              v-for="(addr, idx) in customer.addresses"
              :key="addr.id || idx"
              class="text-xs text-gray-700 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100"
            >
              <i class="pi pi-map-marker text-[10px] text-gray-400 mr-1"></i>{{ addr.address }}
            </p>
          </div>

          <div class="flex gap-2 pt-2 border-t border-gray-100">
            <button @click="openEditModal(customer)" class="btn btn-outline flex-1 py-2 text-xs">
              <i class="pi pi-pencil text-xs"></i>
              <span>Editar</span>
            </button>
            <button @click="deleteCustomer(customer)" class="btn btn-danger py-2 px-3 text-xs">
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
                <th class="px-5 py-3.5 text-left">Cliente</th>
                <th class="px-5 py-3.5 text-left">Teléfono</th>
                <th class="px-5 py-3.5 text-left">Datos fiscales</th>
                <th class="px-5 py-3.5 text-left">Direcciones</th>
                <th class="px-5 py-3.5 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="customer in customers.data" :key="customer.id" class="transition hover:bg-gray-50/70">
                <td class="px-5 py-3.5 font-semibold text-gray-900">{{ customer.name }}</td>
                <td class="px-5 py-3.5 text-gray-600 tabular-nums whitespace-nowrap">{{ customer.phone || '—' }}</td>
                <td class="px-5 py-3.5">
                  <div class="space-y-1">
                    <p class="text-xs text-gray-700">{{ customer.fiscal_name || '—' }}</p>
                    <span
                      v-if="customer.fiscal_ruc"
                      class="inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full bg-mantis-100 text-mantis-800 tabular-nums"
                    >
                      {{ customer.fiscal_ruc }}
                    </span>
                  </div>
                </td>
                <td class="px-5 py-3.5 max-w-xs">
                  <div v-if="customer.addresses && customer.addresses.length" class="space-y-1">
                    <p
                      v-for="(addr, idx) in customer.addresses"
                      :key="addr.id || idx"
                      class="text-xs text-gray-600 truncate"
                      :title="addr.address"
                    >
                      · {{ addr.address }}
                    </p>
                  </div>
                  <span v-else class="text-xs text-gray-400">Sin direcciones</span>
                </td>
                <td class="px-5 py-3.5">
                  <div class="flex items-center justify-center gap-2">
                    <button @click="openEditModal(customer)" class="btn btn-outline py-1.5 px-3 text-xs">
                      <i class="pi pi-pencil text-xs"></i>
                      <span>Editar</span>
                    </button>
                    <button @click="deleteCustomer(customer)" class="btn btn-danger py-1.5 px-3 text-xs" title="Eliminar">
                      <i class="pi pi-trash text-xs"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="customers.data.length === 0">
                <td colspan="5" class="px-6 py-10 text-center text-gray-500">No hay clientes registrados.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Pagination :links="customers.links" />
    </div>

    <!-- Modal Crear / Editar Cliente -->
    <div v-if="showModal" class="modal-backdrop">
      <div class="modal-sheet w-full max-w-xl lg:h-auto lg:max-h-[90vh]">
        <div class="modal-header shrink-0">
          <h3 class="modal-title">{{ isEditing ? 'Editar Cliente' : 'Nuevo Cliente' }}</h3>
          <button @click="showModal = false" type="button" class="icon-btn">
            <i class="pi pi-times text-sm"></i>
          </button>
        </div>

        <form @submit.prevent="submit" class="flex flex-col flex-1 min-h-0">
          <div class="flex-1 min-h-0 p-4 space-y-4 overflow-y-auto sm:p-5">
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label class="label">Nombre <span class="text-red-500">*</span></label>
                <input v-model="form.name" type="text" required class="input" placeholder="Nombre del cliente">
              </div>
              <div>
                <label class="label">Teléfono <span class="text-red-500">*</span></label>
                <input v-model="form.phone" type="text" inputmode="tel" required class="input" placeholder="8888-8888">
              </div>
              <div>
                <label class="label">Nombre fiscal</label>
                <input v-model="form.fiscal_name" type="text" class="input" placeholder="Opcional">
              </div>
              <div>
                <label class="label">RUC</label>
                <input v-model="form.fiscal_ruc" type="text" class="input" placeholder="Opcional">
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="label mb-0">Direcciones <span class="text-red-500">*</span></label>
                <button
                  type="button"
                  @click="addAddress"
                  class="text-xs font-semibold text-mantis-700 hover:text-mantis-800 flex items-center gap-1"
                >
                  <i class="pi pi-plus text-[10px]"></i>
                  <span>Agregar</span>
                </button>
              </div>
              <div class="space-y-2">
                <div v-for="(addr, index) in form.addresses" :key="index" class="flex items-center gap-2">
                  <input
                    v-model="form.addresses[index]"
                    required
                    type="text"
                    placeholder="Ej: Residencial..., casa #12"
                    class="flex-1 input"
                  >
                  <button
                    v-if="form.addresses.length > 1"
                    type="button"
                    @click="removeAddress(index)"
                    class="icon-btn bg-red-50 text-red-600 hover:bg-red-100 shrink-0"
                    title="Quitar dirección"
                  >
                    <i class="pi pi-trash text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer justify-end gap-2 pb-safe shrink-0">
            <button type="button" @click="showModal = false" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-primary">
              <i class="pi pi-check text-xs"></i>
              <span>{{ isEditing ? 'Actualizar' : 'Guardar' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
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
<template>
  <AppLayout title="Admin Dashboard">
    <template #header>
      <NavLayout />
    </template>

    <div class="p-3 mx-auto space-y-4 max-w-7xl sm:p-6">
      <!-- Barra de filtros -->
      <div class="p-3.5 card sm:p-5">
        <div class="grid grid-cols-2 gap-2.5 sm:grid-cols-12 sm:items-end">
          <div class="col-span-1 sm:col-span-3">
            <label class="label">Desde</label>
            <flat-pickr v-model="filters.from" :config="flatpickrConfig" class="input" placeholder="DD/MM/AAAA" />
          </div>
          <div class="col-span-1 sm:col-span-3">
            <label class="label">Hasta</label>
            <flat-pickr v-model="filters.to" :config="flatpickrConfig" class="input" placeholder="DD/MM/AAAA" />
          </div>
          <div class="col-span-2 sm:col-span-3">
            <label class="label">Tipo de orden</label>
            <select v-model="filters.type" class="input">
              <option value="">Todos</option>
              <option value="mesa">Mesa</option>
              <option value="llevar">Llevar</option>
              <option value="delivery">Delivery</option>
            </select>
          </div>
          <div class="flex col-span-2 gap-2 sm:col-span-3">
            <button @click="resetFilters" type="button" class="btn btn-secondary flex-1">
              Limpiar
            </button>
            <button @click="fetchData" type="button" class="btn btn-primary flex-[1.5]">
              <i class="pi pi-filter text-xs"></i>
              <span>Aplicar</span>
            </button>
          </div>
        </div>
      </div>

      <!-- KPIs -->
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Ingresos Totales -->
        <div class="p-4 card sm:p-5">
          <div class="flex items-center justify-between gap-2">
            <span class="text-xs font-semibold tracking-wide text-gray-500 uppercase">Ingresos Totales</span>
            <span class="flex items-center justify-center w-8 h-8 rounded-xl bg-mantis-50 text-mantis-600">
              <i class="pi pi-wallet text-sm"></i>
            </span>
          </div>
          <div class="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl tabular-nums">
            {{ formatCurrency(stats.total_revenue) }}
          </div>
        </div>

        <!-- Descuentos Aplicados -->
        <div
          @click="showDiscountDetails"
          class="p-4 transition cursor-pointer card sm:p-5 hover:border-amber-300 hover:shadow-md"
        >
          <div class="flex items-center justify-between gap-2">
            <span class="text-xs font-semibold tracking-wide text-gray-500 uppercase">Descuentos</span>
            <span class="flex items-center justify-center w-8 h-8 rounded-xl bg-amber-50 text-amber-600">
              <i class="pi pi-percentage text-sm"></i>
            </span>
          </div>
          <div class="mt-2 text-2xl font-extrabold text-amber-600 sm:text-3xl tabular-nums">
            {{ formatCurrency(stats.total_discounts) }}
          </div>
          <p class="mt-1 text-[11px] font-medium text-gray-500">Toca para ver detalle</p>
        </div>

        <!-- Cobros de Delivery -->
        <div
          @click="showDeliveryFeeDetails"
          class="p-4 transition cursor-pointer card sm:p-5 hover:border-mantis-300 hover:shadow-md"
        >
          <div class="flex items-center justify-between gap-2">
            <span class="text-xs font-semibold tracking-wide text-gray-500 uppercase">Cobros Delivery</span>
            <span class="flex items-center justify-center w-8 h-8 rounded-xl bg-mantis-50 text-mantis-700">
              <i class="pi pi-truck text-sm"></i>
            </span>
          </div>
          <div class="mt-2 text-2xl font-extrabold text-mantis-700 sm:text-3xl tabular-nums">
            {{ formatCurrency(stats.total_delivery_fees) }}
          </div>
          <p class="mt-1 text-[11px] font-medium text-gray-500">Toca para ver por rider</p>
        </div>

        <!-- Facturas Anuladas -->
        <div class="p-4 card sm:p-5">
          <div class="flex items-center justify-between gap-2">
            <span class="text-xs font-semibold tracking-wide text-gray-500 uppercase">Anuladas</span>
            <span class="flex items-center justify-center w-8 h-8 text-red-600 rounded-xl bg-red-50">
              <i class="pi pi-ban text-sm"></i>
            </span>
          </div>
          <div class="mt-2 text-2xl font-extrabold text-red-600 sm:text-3xl tabular-nums">
            {{ formatCurrency(stats.total_cancelled_revenue) }}
          </div>
          <p class="mt-1 text-[11px] font-medium text-gray-500">{{ stats.total_cancelled_count }} facturas</p>
        </div>
      </div>

      <!-- Desgloses por tipo y categoría -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div class="p-4 card sm:p-5">
          <h3 class="text-sm font-bold text-gray-900">Órdenes Facturadas por Tipo</h3>
          <ul class="mt-3 divide-y divide-gray-100">
            <li v-if="stats.invoiced_orders_by_type.length === 0" class="py-4 text-sm text-center text-gray-400">
              No hay datos.
            </li>
            <li
              v-for="item in stats.invoiced_orders_by_type"
              :key="item.type"
              class="flex items-center justify-between py-2 text-sm"
            >
              <span class="font-medium text-gray-700 capitalize">{{ item.type }}</span>
              <span class="px-2.5 py-0.5 text-xs font-bold rounded-full bg-gray-100 text-gray-800 tabular-nums">
                {{ item.count }}
              </span>
            </li>
          </ul>
        </div>

        <div class="p-4 card sm:p-5">
          <h3 class="text-sm font-bold text-gray-900">Ventas por Categoría</h3>
          <ul class="mt-3 divide-y divide-gray-100">
            <li v-if="stats.sales_by_category.length === 0" class="py-4 text-sm text-center text-gray-400">
              No hay datos.
            </li>
            <li
              v-for="item in stats.sales_by_category"
              :key="item.name"
              class="flex items-center justify-between py-2 text-sm"
            >
              <span class="font-medium text-gray-700 capitalize">{{ item.name }}</span>
              <span class="px-2.5 py-0.5 text-xs font-bold rounded-full bg-mantis-50 text-mantis-800 tabular-nums">
                {{ item.count }}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Productos más vendidos y Desempeño de Riders -->
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <!-- Productos vendidos -->
        <div class="overflow-hidden card">
          <div class="px-4 py-3.5 border-b border-gray-200 bg-gray-50 sm:px-5">
            <h3 class="text-sm font-bold text-gray-900">Productos Facturados</h3>
          </div>
          <div class="overflow-y-auto max-h-80">
            <table class="min-w-full text-sm text-left">
              <thead class="sticky top-0 text-xs font-semibold text-gray-600 uppercase border-b border-gray-200 bg-gray-50">
                <tr>
                  <th class="px-4 py-2.5">Producto</th>
                  <th class="px-4 py-2.5 text-center">Cant.</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-if="stats.invoiced_products.length === 0">
                  <td colspan="2" class="py-8 text-center text-gray-400">No hay datos.</td>
                </tr>
                <tr v-for="(p, i) in stats.invoiced_products" :key="i" class="hover:bg-gray-50/70">
                  <td class="px-4 py-2.5 font-medium text-gray-900">{{ p.name }}</td>
                  <td class="px-4 py-2.5 font-bold text-center text-mantis-700 tabular-nums">{{ p.total_quantity }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Desempeño de motorizados -->
        <div class="overflow-hidden card">
          <div class="px-4 py-3.5 border-b border-gray-200 bg-gray-50 sm:px-5">
            <h3 class="text-sm font-bold text-gray-900">Desempeño de Motorizados</h3>
          </div>
          <div class="overflow-y-auto max-h-80">
            <table class="min-w-full text-sm text-left">
              <thead class="sticky top-0 text-xs font-semibold text-gray-600 uppercase border-b border-gray-200 bg-gray-50">
                <tr>
                  <th class="px-4 py-2.5">Repartidor</th>
                  <th class="px-4 py-2.5 text-center">Entregas</th>
                  <th class="px-4 py-2.5 text-center">Detalle</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-if="stats.rider_performance.length === 0">
                  <td colspan="3" class="py-8 text-center text-gray-400">No hay datos.</td>
                </tr>
                <tr v-for="(r, i) in stats.rider_performance" :key="i" class="hover:bg-gray-50/70">
                  <td class="px-4 py-2.5 font-medium text-gray-900">{{ r.name }}</td>
                  <td class="px-4 py-2.5 font-bold text-center text-gray-800 tabular-nums">{{ r.delivery_count }}</td>
                  <td class="px-4 py-2.5 text-center">
                    <button @click="showRiderDetails(r)" class="btn btn-outline py-1 px-2.5 text-xs">
                      Ver productos
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Ventas por hora -->
      <div class="p-4 card sm:p-5">
        <h3 class="text-sm font-bold text-gray-900">Ventas por Hora</h3>
        <div v-if="stats.sales_by_hour.length === 0" class="py-6 text-sm text-center text-gray-400">
          No hay datos.
        </div>
        <div v-else class="mt-3 space-y-2.5">
          <div v-for="item in stats.sales_by_hour" :key="item.hour" class="flex items-center gap-3 text-xs sm:text-sm">
            <span class="w-12 font-semibold text-gray-600 tabular-nums shrink-0">{{ item.hour }}:00</span>
            <div class="flex-1 h-2.5 overflow-hidden bg-gray-100 rounded-full">
              <div
                class="h-full rounded-full bg-mantis-600"
                :style="{ width: ((item.count / Math.max(1, ...stats.sales_by_hour.map(h => h.count))) * 100) + '%' }"
              ></div>
            </div>
            <span class="w-8 font-bold text-right text-gray-800 tabular-nums shrink-0">{{ item.count }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Detalles del Motorizado -->
    <div v-if="isModalOpen" class="modal-backdrop">
      <div class="modal-sheet w-full max-w-lg lg:h-auto lg:max-h-[85vh]">
        <div class="modal-header shrink-0">
          <div>
            <h3 class="modal-title">Productos Entregados</h3>
            <p v-if="selectedRider" class="text-xs text-gray-500">Repartidor: {{ selectedRider.name }}</p>
          </div>
          <button @click="closeModal" class="icon-btn">
            <i class="pi pi-times text-sm"></i>
          </button>
        </div>

        <div class="flex-1 min-h-0 p-4 overflow-y-auto">
          <div v-if="isLoadingModal" class="py-10 text-center text-sm text-gray-500">Cargando productos...</div>
          <div v-else-if="riderProducts.length === 0" class="py-10 text-center text-sm text-gray-400">
            No se encontraron productos.
          </div>
          <div v-else class="border border-gray-200 divide-y divide-gray-100 rounded-xl overflow-hidden">
            <div
              v-for="product in riderProducts"
              :key="product.name"
              class="flex items-center justify-between px-4 py-2.5 text-sm"
            >
              <span class="font-medium text-gray-900">{{ product.name }}</span>
              <span class="px-2.5 py-0.5 text-xs font-bold rounded-full bg-mantis-50 text-mantis-800 tabular-nums">
                {{ product.total_quantity }}
              </span>
            </div>
          </div>
        </div>

        <div class="modal-footer justify-end pb-safe shrink-0">
          <button @click="closeModal" class="btn btn-secondary">Cerrar</button>
        </div>
      </div>
    </div>

    <!-- Modal Detalles de Descuentos -->
    <div v-if="isDiscountModalOpen" class="modal-backdrop">
      <div class="modal-sheet w-full max-w-3xl lg:h-auto lg:max-h-[85vh]">
        <div class="modal-header shrink-0">
          <div>
            <h3 class="modal-title">Órdenes con Descuento</h3>
            <p class="text-xs text-gray-500">Desglose de descuentos en el período seleccionado</p>
          </div>
          <button @click="closeDiscountModal" class="icon-btn">
            <i class="pi pi-times text-sm"></i>
          </button>
        </div>

        <div class="flex-1 min-h-0 p-4 overflow-y-auto">
          <div v-if="isLoadingDiscountModal" class="py-10 text-center text-sm text-gray-500">Cargando órdenes...</div>
          <div v-else-if="discountedOrders.length === 0" class="py-10 text-center text-sm text-gray-400">
            No se encontraron órdenes con descuento.
          </div>
          <template v-else>
            <!-- Móvil -->
            <div class="space-y-2 sm:hidden">
              <div
                v-for="order in discountedOrders"
                :key="`dm-${order.id}`"
                class="p-3 border border-gray-200 rounded-xl space-y-1"
              >
                <div class="flex items-center justify-between gap-2">
                  <span class="font-bold text-gray-900 text-sm">#{{ order.id }} · <span class="capitalize">{{ order.order_type }}</span></span>
                  <span class="font-bold text-amber-600 text-sm tabular-nums">-{{ formatCurrency(order.discount_amount) }}</span>
                </div>
                <p class="text-xs text-gray-500">{{ new Date(order.created_at).toLocaleString('es-NI') }}</p>
                <p v-if="order.discount_reason" class="text-xs text-gray-700">Motivo: {{ order.discount_reason }}</p>
              </div>
            </div>

            <!-- Desktop -->
            <div class="hidden overflow-x-auto border border-gray-200 rounded-xl sm:block">
              <table class="min-w-full text-sm text-left">
                <thead class="text-xs font-semibold text-gray-600 uppercase border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th class="px-4 py-2.5">Orden #</th>
                    <th class="px-4 py-2.5">Fecha</th>
                    <th class="px-4 py-2.5">Tipo</th>
                    <th class="px-4 py-2.5 text-right">Descuento</th>
                    <th class="px-4 py-2.5">Razón</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="order in discountedOrders" :key="order.id" class="hover:bg-gray-50">
                    <td class="px-4 py-2.5 font-semibold text-gray-900">{{ order.id }}</td>
                    <td class="px-4 py-2.5 text-gray-600">{{ new Date(order.created_at).toLocaleString('es-NI') }}</td>
                    <td class="px-4 py-2.5 capitalize">{{ order.order_type }}</td>
                    <td class="px-4 py-2.5 font-bold text-right text-amber-600 tabular-nums">{{ formatCurrency(order.discount_amount) }}</td>
                    <td class="px-4 py-2.5 text-gray-600">{{ order.discount_reason || '—' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </div>

        <div class="modal-footer justify-end pb-safe shrink-0">
          <button @click="closeDiscountModal" class="btn btn-secondary">Cerrar</button>
        </div>
      </div>
    </div>

    <!-- Modal Detalles de Cobros de Delivery -->
    <div v-if="isDeliveryFeeModalOpen" class="modal-backdrop">
      <div class="modal-sheet w-full max-w-lg lg:h-auto lg:max-h-[85vh]">
        <div class="modal-header shrink-0">
          <div>
            <h3 class="modal-title">Cobros Delivery por Rider</h3>
            <p class="text-xs text-gray-500">Resumen de recaudación en el período seleccionado</p>
          </div>
          <button @click="closeDeliveryFeeModal" class="icon-btn">
            <i class="pi pi-times text-sm"></i>
          </button>
        </div>

        <div class="flex-1 min-h-0 p-4 overflow-y-auto">
          <div v-if="isLoadingDeliveryFeeModal" class="py-10 text-center text-sm text-gray-500">Cargando cobros...</div>
          <div v-else-if="deliveryFeesByRider.length === 0" class="py-10 text-center text-sm text-gray-400">
            No se encontraron datos.
          </div>
          <div v-else class="border border-gray-200 divide-y divide-gray-100 rounded-xl overflow-hidden">
            <div
              v-for="rider in deliveryFeesByRider"
              :key="rider.id"
              class="flex items-center justify-between gap-3 px-4 py-3 text-sm"
            >
              <div>
                <p class="font-semibold text-gray-900">{{ rider.name }}</p>
                <p class="text-xs text-gray-500">{{ rider.delivery_count }} entregas</p>
              </div>
              <span class="font-bold text-mantis-700 tabular-nums">
                {{ formatCurrency(rider.total_delivery_fees) }}
              </span>
            </div>
          </div>
        </div>

        <div class="modal-footer justify-end pb-safe shrink-0">
          <button @click="closeDeliveryFeeModal" class="btn btn-secondary">Cerrar</button>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import NavLayout from '@/Layouts/NavLayout.vue';
import axios from 'axios';
import { route } from 'ziggy-js';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { Spanish } from 'flatpickr/dist/l10n/es.js';

const props = defineProps({
  riders: Array,
});

// Obtener la fecha local y formatearla a YYYY-MM-DD
const date = new Date();
const year = date.getFullYear();
const month = (date.getMonth() + 1).toString().padStart(2, '0');
const day = date.getDate().toString().padStart(2, '0');
const today = `${year}-${month}-${day}`;

const filters = ref({
  from: today, to: today, type: '', rider_id: '', status: '',
});

const flatpickrConfig = {
  dateFormat: 'Y-m-d', altInput: true, altFormat: 'd/m/Y', locale: Spanish,
};

const isModalOpen = ref(false);
const selectedRider = ref(null);
const riderProducts = ref([]);
const isLoadingModal = ref(false);

const isDiscountModalOpen = ref(false);
const discountedOrders = ref([]);
const isLoadingDiscountModal = ref(false);

const isDeliveryFeeModalOpen = ref(false);
const deliveryFeesByRider = ref([]);
const isLoadingDeliveryFeeModal = ref(false);

const stats = ref({
  total_revenue: 0,
  total_discounts: 0,
  total_delivery_fees: 0,
  invoiced_products: [],
  invoiced_orders_by_type: [],
  sales_by_hour: [],
  sales_by_category: [],
  rider_performance: [],
  total_cancelled_count: 0,
  total_cancelled_revenue: 0,
});

async function showDiscountDetails() {
  isDiscountModalOpen.value = true;
  isLoadingDiscountModal.value = true;
  discountedOrders.value = [];
  try {
    // NOTE: This route 'admin.dashboard.discounted-orders' needs to be created in the backend.
    const { data } = await axios.get(route('admin.dashboard.discounted-orders'), { params: filters.value });
    discountedOrders.value = data;
  } catch (e) {
    console.error('Error al obtener las órdenes con descuento:', e);
  } finally {
    isLoadingDiscountModal.value = false;
  }
}

function closeDiscountModal() {
  isDiscountModalOpen.value = false;
  discountedOrders.value = [];
}

async function showDeliveryFeeDetails() {
  isDeliveryFeeModalOpen.value = true;
  isLoadingDeliveryFeeModal.value = true;
  deliveryFeesByRider.value = [];
  try {
    // NOTE: This route 'admin.dashboard.rider-delivery-fees' needs to be created in the backend.
    const { data } = await axios.get(route('admin.dashboard.rider-delivery-fees'), { params: filters.value });
    deliveryFeesByRider.value = data;
  } catch (e) {
    console.error('Error al obtener los cobros de delivery:', e);
  } finally {
    isLoadingDeliveryFeeModal.value = false;
  }
}

function closeDeliveryFeeModal() {
  isDeliveryFeeModalOpen.value = false;
  deliveryFeesByRider.value = [];
}

async function showRiderDetails(rider) {
  selectedRider.value = rider;
  isModalOpen.value = true;
  isLoadingModal.value = true;
  riderProducts.value = [];
  try {
    const params = { ...filters.value, rider_id: rider.id };
    const { data } = await axios.get(route('admin.dashboard.rider-products'), { params });
    riderProducts.value = data;
  } catch (e) {
    console.error('Error al obtener los productos del repartidor:', e);
  } finally {
    isLoadingModal.value = false;
  }
}

function closeModal() {
  isModalOpen.value = false;
  selectedRider.value = null;
  riderProducts.value = [];
}

async function fetchData() {
  try {
    const { data } = await axios.get(route('admin.dashboard.data'), { params: { ...filters.value } });
    stats.value = data;
  } catch (e) {
    console.error('Error al obtener los datos:', e);
    resetStats();
  }
}

function resetFilters() {
  filters.value = { from: '', to: '', type: '', rider_id: '', status: '' };
  fetchData();
}

function resetStats() {
    stats.value = { total_revenue: 0, total_discounts: 0, total_delivery_fees: 0, invoiced_products: [], invoiced_orders_by_type: [], sales_by_hour: [], sales_by_category: [], rider_performance: [], total_cancelled_count: 0, total_cancelled_revenue: 0 };
}

function formatCurrency(value = 0) {
  return new Intl.NumberFormat('es-NI', { style: 'currency', currency: 'NIO' }).format(Number(value || 0));
}

onMounted(fetchData);
</script>

<style scoped>
/* small polish */
</style>
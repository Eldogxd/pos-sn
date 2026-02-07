<template>
  <AppLayout>
    <template #header>
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 class="text-xl font-semibold leading-tight text-gray-800">Panel de Administrador</h2>
          <p class="mt-1 text-sm text-gray-500">Resumen de ventas, órdenes y productos</p>
        </div>
        <NavLayout />
      </div>
    </template>

    <div class="px-4 py-6 mx-auto space-y-6 max-w-7xl sm:px-6 lg:px-8">
      <!-- Filters -->
      <div class="p-4 bg-white border border-gray-100 shadow-sm rounded-xl">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
          <div class="flex items-center w-full gap-2">
            <label class="text-sm text-gray-600">Desde</label>
            <flat-pickr v-model="filters.from" :config="flatpickrConfig" class="w-full p-2 border rounded-lg" placeholder="DD/MM/AAAA" />
          </div>
          <div class="flex items-center w-full gap-2">
            <label class="text-sm text-gray-600">Hasta</label>
            <flat-pickr v-model="filters.to" :config="flatpickrConfig" class="w-full p-2 border rounded-lg" placeholder="DD/MM/AAAA" />
          </div>
          <div class="flex items-center w-full gap-2">
            <label class="text-sm text-gray-600">Tipo</label>
            <select v-model="filters.type" class="w-full p-2 border rounded-lg">
              <option value="">Todos</option>
              <option value="mesa">Mesa</option>
              <option value="llevar">Llevar</option>
              <option value="delivery">Delivery</option>
            </select>
          </div>
        
          
        </div>
        <div class="flex items-center justify-end gap-2 pt-4 mt-4 border-t">
          <button @click="resetFilters" class="px-3 py-2 text-sm border rounded-lg">Resetear</button>
          <button @click="fetchData" class="px-4 py-2 text-sm font-medium text-white rounded-lg bg-mantis-500 hover:bg-mantis-600">Aplicar Filtros</button>
        </div>
      </div>

     
  

      <!-- Main Grid -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <!-- Left Column -->
        <div class="flex flex-col gap-6 lg:col-span-1">
          <div class="p-6 bg-white border shadow-sm rounded-xl">
            <div class="text-base text-gray-500">Ingresos Totales (Facturado)</div>
            <div class="mt-2 text-4xl font-bold text-gray-800">{{ formatCurrency(stats.total_revenue) }}</div>
          </div>
          <div class="p-6 bg-white border shadow-sm cursor-pointer rounded-xl hover:bg-gray-50" @click="showDiscountDetails">
            <div class="text-base text-gray-500">Total en Descuentos</div>
            <div class="mt-2 text-4xl font-bold text-orange-500">{{ formatCurrency(stats.total_discounts) }}</div>
          </div>
          <div class="p-6 bg-white border shadow-sm cursor-pointer rounded-xl hover:bg-gray-50" @click="showDeliveryFeeDetails">
            <div class="text-base text-gray-500">Total en Cobros de Delivery</div>
            <div class="mt-2 text-4xl font-bold text-cyan-500">{{ formatCurrency(stats.total_delivery_fees) }}</div>
          </div>
           <div class="p-6 bg-white border shadow-sm rounded-xl">
            <div class="text-base text-gray-500">Facturas Anuladas</div>
            <div class="mt-2 text-4xl font-bold text-red-500">{{ formatCurrency(stats.total_cancelled_revenue) }}</div>
            <div class="mt-1 text-sm text-gray-500">{{ stats.total_cancelled_count }} facturas</div>
          </div>
          <div class="p-6 bg-white border shadow-sm rounded-xl">
            <h3 class="font-semibold text-gray-800">Órdenes Facturadas por Tipo</h3>
            <ul class="mt-3 space-y-2">
              <li v-if="stats.invoiced_orders_by_type.length === 0"><p class="text-sm text-gray-400">No hay datos.</p></li>
              <li v-for="item in stats.invoiced_orders_by_type" :key="item.type" class="flex justify-between text-sm">
                <span class="capitalize">{{ item.type }}</span>
                <span class="font-medium text-gray-700">{{ item.count }}</span>
              </li>
            </ul>
          </div>
          <div class="p-6 bg-white border shadow-sm rounded-xl">
            <h3 class="font-semibold text-gray-800">Ventas por Categoría</h3>
            <ul class="mt-3 space-y-2">
              <li v-if="stats.sales_by_category.length === 0"><p class="text-sm text-gray-400">No hay datos.</p></li>
              <li v-for="item in stats.sales_by_category" :key="item.name" class="flex justify-between text-sm">
                <span class="capitalize">{{ item.name }}</span>
                <span class="font-medium text-gray-700">{{ item.count }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Right Column -->
        <div class="flex flex-col gap-6 lg:col-span-2">
          <div class="overflow-hidden bg-white border shadow-sm rounded-xl">
            <div class="p-4 border-b"><h3 class="font-semibold text-gray-800">Productos Facturados</h3></div>
            <!-- Contenedor con altura máxima y scroll vertical -->
            <div class="overflow-y-auto max-h-96">
              <table class="min-w-full text-sm text-left"><thead class="sticky top-0 text-xs text-gray-600 uppercase bg-gray-50"><tr><th class="px-4 py-2">Producto</th><th class="px-4 py-2 text-center">Cantidad Vendida</th></tr></thead><tbody class="divide-y divide-gray-100"><tr v-if="stats.invoiced_products.length === 0"><td colspan="2" class="py-6 text-center text-gray-400">No hay datos.</td></tr><tr v-for="(p, i) in stats.invoiced_products" :key="i"><td class="px-4 py-3 font-medium text-gray-800">{{ p.name }}</td><td class="px-4 py-3 text-center text-gray-600">{{ p.total_quantity }}</td></tr></tbody></table>
            </div>
          </div>
          <div class="overflow-hidden bg-white border shadow-sm rounded-xl">
            <div class="p-4 border-b"><h3 class="font-semibold text-gray-800">Rendimiento de Repartidores</h3></div>
            <div class="overflow-x-auto">
              <table class="min-w-full text-sm text-left"><thead class="text-xs text-gray-600 uppercase bg-gray-50"><tr><th class="px-4 py-2">Repartidor</th><th class="px-4 py-2 text-center">Entregas</th><th class="px-4 py-2 text-center">Acciones</th></tr></thead><tbody class="divide-y divide-gray-100"><tr v-if="stats.rider_performance.length === 0"><td colspan="3" class="py-6 text-center text-gray-400">No hay datos.</td></tr><tr v-for="(r, i) in stats.rider_performance" :key="i"><td class="px-4 py-3 font-medium text-gray-800">{{ r.name }}</td><td class="px-4 py-3 text-center text-gray-600">{{ r.delivery_count }}</td><td class="px-4 py-3 text-center"><button @click="showRiderDetails(r)" class="px-2 py-1 text-xs font-medium text-white rounded bg-mantis-500 hover:bg-mantis-600">Ver Productos</button></td></tr></tbody></table>
            </div>
          </div>
          <div class="p-6 bg-white border shadow-sm rounded-xl">
            <h3 class="font-semibold text-gray-800">Ventas por Hora del Día</h3>
            <div class="mt-3 space-y-1">
                <div v-if="stats.sales_by_hour.length === 0"><p class="text-sm text-gray-400">No hay datos.</p></div>
                <div v-for="item in stats.sales_by_hour" :key="item.hour" class="flex items-center gap-3 text-sm">
                    <span class="w-16 font-medium text-gray-600">{{ item.hour }}:00 - {{ item.hour + 1 }}:00</span>
                    <div class="flex-1 h-4 bg-gray-100 rounded">
                        <div class="h-full rounded bg-mantis-400" :style="{ width: (item.count / Math.max(...stats.sales_by_hour.map(h => h.count)) * 100) + '%' }"></div>
                    </div>
                    <span class="w-8 font-semibold text-right text-gray-800">{{ item.count }}</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Rider Products Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="w-full max-w-lg p-6 bg-white rounded-lg shadow-xl">
        <div class="flex items-start justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-800">Productos Entregados</h3>
            <p v-if="selectedRider" class="text-sm text-gray-600">Repartidor: {{ selectedRider.name }}</p>
          </div>
          <button @click="closeModal" class="p-1 text-gray-500 rounded-full hover:bg-gray-100">&times;</button>
        </div>
        <div class="mt-4 overflow-y-auto border-t max-h-80">
          <div v-if="isLoadingModal" class="py-10 text-center text-gray-500">Cargando...</div>
          <table v-else class="min-w-full text-sm text-left">
            <thead class="sticky top-0 text-xs text-gray-600 uppercase bg-gray-50">
              <tr>
                <th class="px-4 py-2">Producto</th>
                <th class="px-4 py-2 text-center">Cantidad Total</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="riderProducts.length === 0"><td colspan="2" class="py-6 text-center text-gray-400">No se encontraron productos.</td></tr>
              <tr v-for="product in riderProducts" :key="product.name">
                <td class="px-4 py-3 font-medium text-gray-800">{{ product.name }}</td>
                <td class="px-4 py-3 text-center text-gray-600">{{ product.total_quantity }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pt-4 mt-4 text-right border-t">
          <button @click="closeModal" class="px-4 py-2 text-sm border rounded-lg">Cerrar</button>
        </div>
      </div>
    </div>

    <!-- Discounted Orders Modal -->
    <div v-if="isDiscountModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="w-full max-w-4xl p-6 bg-white rounded-lg shadow-xl">
        <div class="flex items-start justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-800">Órdenes con Descuento</h3>
            <p class="text-sm text-gray-600">Mostrando órdenes según los filtros aplicados.</p>
          </div>
          <button @click="closeDiscountModal" class="p-1 text-gray-500 rounded-full hover:bg-gray-100">&times;</button>
        </div>
        <div class="mt-4 overflow-y-auto border-t max-h-[60vh]">
          <div v-if="isLoadingDiscountModal" class="py-10 text-center text-gray-500">Cargando...</div>
          <table v-else class="min-w-full text-sm text-left">
            <thead class="sticky top-0 text-xs text-gray-600 uppercase bg-gray-50">
              <tr>
                <th class="px-4 py-2">Orden ID</th>
                <th class="px-4 py-2">Fecha</th>
                <th class="px-4 py-2">Tipo</th>
                <th class="px-4 py-2 text-right">Monto Descuento</th>
                <th class="px-4 py-2">Razón del Descuento</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="discountedOrders.length === 0"><td colspan="5" class="py-6 text-center text-gray-400">No se encontraron órdenes con descuento.</td></tr>
              <tr v-for="order in discountedOrders" :key="order.id">
                <td class="px-4 py-3 font-medium text-gray-800">#{{ order.id }}</td>
                <td class="px-4 py-3 text-gray-600">{{ new Date(order.created_at).toLocaleDateString('es-NI') }}</td>
                <td class="px-4 py-3 text-gray-600 capitalize">{{ order.order_type }}</td>
                <td class="px-4 py-3 font-medium text-right text-orange-600">{{ formatCurrency(order.discount_amount) }}</td>
                <td class="px-4 py-3 text-gray-500">{{ order.discount_reason || 'N/A' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pt-4 mt-4 text-right border-t">
          <button @click="closeDiscountModal" class="px-4 py-2 text-sm border rounded-lg">Cerrar</button>
        </div>
      </div>
    </div>

    <!-- Delivery Fees by Rider Modal -->
    <div v-if="isDeliveryFeeModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="w-full max-w-2xl p-6 bg-white rounded-lg shadow-xl">
        <div class="flex items-start justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-800">Cobros de Delivery por Repartidor</h3>
            <p class="text-sm text-gray-600">Mostrando datos según los filtros aplicados.</p>
          </div>
          <button @click="closeDeliveryFeeModal" class="p-1 text-gray-500 rounded-full hover:bg-gray-100">&times;</button>
        </div>
        <div class="mt-4 overflow-y-auto border-t max-h-[60vh]">
          <div v-if="isLoadingDeliveryFeeModal" class="py-10 text-center text-gray-500">Cargando...</div>
          <table v-else class="min-w-full text-sm text-left">
            <thead class="sticky top-0 text-xs text-gray-600 uppercase bg-gray-50">
              <tr>
                <th class="px-4 py-2">Repartidor</th>
                <th class="px-4 py-2 text-center">Entregas Realizadas</th>
                <th class="px-4 py-2 text-right">Monto Total Cobrado</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="deliveryFeesByRider.length === 0"><td colspan="3" class="py-6 text-center text-gray-400">No se encontraron datos.</td></tr>
              <tr v-for="rider in deliveryFeesByRider" :key="rider.id">
                <td class="px-4 py-3 font-medium text-gray-800">{{ rider.name }}</td>
                <td class="px-4 py-3 text-center text-gray-600">{{ rider.delivery_count }}</td>
                <td class="px-4 py-3 font-medium text-right text-cyan-600">{{ formatCurrency(rider.total_delivery_fees) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pt-4 mt-4 text-right border-t">
          <button @click="closeDeliveryFeeModal" class="px-4 py-2 text-sm border rounded-lg">Cerrar</button>
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
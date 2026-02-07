<template>
    <AppLayout title="Facturas Historial">
        <template #header>
            <div class="flex items-center justify-between">
                <h2 class="text-xl font-semibold leading-tight text-gray-800">Facturas</h2>
                
            </div>
        </template>

        <div class="p-6">
  <!-- Barra de filtros moderna y responsive -->
  <div class="p-4 mb-6 bg-white shadow-md rounded-xl">
    <div class="flex flex-col gap-4 md:gap-5">
      <!-- Fila 1: Búsqueda y Ordenamiento -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-12">
        <!-- Campo de búsqueda -->
        <div class="md:col-span-5">
          <label class="block mb-2 text-sm font-medium text-gray-700">Buscar factura o cliente</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input v-model="filters.search" type="text" placeholder="Nº factura, cliente..." 
                   class="w-full pl-10 transition-all duration-200 input focus:pl-10">
          </div>
        </div>
        
        <!-- Selector de ordenamiento -->
        <div class="md:col-span-3">
          <label class="block mb-2 text-sm font-medium text-gray-700">Ordenar por</label>
          <div class="flex items-center">
            <select v-model="filters.sort_by" class="flex-1 border-r-0 rounded-r-none input">
              <option value="created_at">Fecha</option>
              <option value="total">Total</option>
              <option value="invoice_number">Nº Factura</option>
            </select>
            <button @click="toggleSortDirection" 
                    class="px-3 py-2.5 text-gray-600 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200 transition-colors">
              <svg v-if="filters.sort_dir === 'asc'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Estado actual del orden -->
        <div class="flex items-end md:col-span-4">
          <div class="w-full px-4 py-2 text-sm text-center text-gray-600 rounded-md bg-gray-50">
            Orden: <strong class="capitalize">{{ filters.sort_by }} {{ filters.sort_dir }}</strong>
          </div>
        </div>
      </div>
      
      <!-- Fila 2: Filtros adicionales -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-12">
        <!-- Rango de fechas -->
        <div class="md:col-span-4">
          <label class="block mb-2 text-sm font-medium text-gray-700">Rango de fechas</label>
          <div class="grid grid-cols-2 gap-2">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <input v-model="filters.date_from" type="date" class="pl-10 input">
            </div>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <input v-model="filters.date_to" type="date" class="pl-10 input">
            </div>
          </div>
        </div>
        
        <!-- Rango de total -->
        <div class="md:col-span-4">
          <label class="block mb-2 text-sm font-medium text-gray-700">Rango de total (C$)</label>
          <div class="grid grid-cols-2 gap-2">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span class="text-gray-400">C$</span>
              </div>
              <input v-model.number="filters.min_total" type="number" step="0.01" placeholder="Mínimo" class="pl-10 input">
            </div>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span class="text-gray-400">C$</span>
              </div>
              <input v-model.number="filters.max_total" type="number" step="0.01" placeholder="Máximo" class="pl-10 input">
            </div>
          </div>
        </div>
        
        <!-- Tipo de orden y estado -->
        <div class="md:col-span-4">
          <label class="block mb-2 text-sm font-medium text-gray-700">Filtros adicionales</label>
          <div class="grid grid-cols-2 gap-2">
            <select v-model="filters.order_type" class="input">
              <option value="">Tipo (Todos)</option>
              <option value="mesa">Mesa</option>
              <option value="delivery">Delivery</option>
              <option value="llevar">Para llevar</option>
            </select>
            <select v-model="filters.status" class="input">
              <option value="">Estado (Todos)</option>
              <option value="created">Pagada</option>
              <option value="cancelled">Anulada</option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- Fila 3: Botones de acción -->
      <div class="flex flex-col gap-3 mt-2 sm:flex-row sm:items-center">
        <button @click="applyFilters" class="flex items-center justify-center gap-2 btn-primary">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
          </svg>
          Aplicar Filtros
        </button>
        <button @click="clearFilters" class="flex items-center justify-center gap-2 btn-secondary">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
          Limpiar Filtros
        </button>
        
        <!-- Contador de resultados (opcional) -->
        <div class="hidden ml-auto text-sm text-gray-600 sm:block">
          Mostrando <strong>{{ invoices.data.length }}</strong> de <strong>{{ invoices.total }}</strong> facturas
        </div>
      </div>
    </div>
  </div>

  <!-- Resto del contenido de la tabla permanece igual -->
  <div class="overflow-x-auto bg-white shadow-md rounded-2xl">
                <table class="min-w-full text-sm text-gray-700">
                    <thead class="bg-gray-100 border-b">
                        <tr>
                            <th class="px-6 py-3 text-xs font-semibold tracking-wide text-center uppercase">N° Factura</th>
                            <th class="px-6 py-3 text-xs font-semibold tracking-wide text-center uppercase">Cliente</th>
                            <th class="px-6 py-3 text-xs font-semibold tracking-wide text-center uppercase">Ruc Cliente</th>
                            <th class="px-6 py-3 text-xs font-semibold tracking-wide text-center uppercase">SubTotal</th>
                            <th @click="toggleSort('total')" class="px-6 py-3 text-xs font-semibold tracking-wide text-center uppercase cursor-pointer">
                                Total
                                <span v-if="filters.sort_by === 'total'">
                                    <span v-if="filters.sort_dir === 'desc'">⬇</span><span v-else>⬆</span>
                                </span>
                            </th>
                            <th class="px-6 py-3 text-xs font-semibold tracking-wide text-center uppercase">Estado</th>
                            <th class="px-6 py-3 text-xs font-semibold tracking-wide text-center uppercase">Fecha y Hora</th>
                            <th class="px-6 py-3 text-xs font-semibold tracking-wide text-center uppercase">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr v-for="invoice in invoices.data" :key="invoice.id" class="text-center transition hover:bg-gray-50">
                            <td class="px-6 py-4">{{ invoice.invoice_number }}</td>
                            <td class="px-6 py-4">{{ invoice.fiscal_name ?? 'Sin Nombre' }}</td>
                            <td class="px-6 py-4">{{ invoice.fiscal_ruc ?? 'Sin RUC' }}</td>
                            <td class="px-6 py-4 font-medium">C${{ invoice.subtotal }}</td>
                            <td class="px-6 py-4 font-bold text-gray-900">C${{ invoice.total }}</td>
                            
                            <!-- Celda de Estado (sin cambios) -->
                            <td class="px-6 py-4">
                                <span
                                    class="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full"
                                    :class="getStatusClasses(invoice.status)"
                                >
                                    <i :class="getStatusIcon(invoice.status)"></i>
                                    {{ getStatusText(invoice.status) }}
                                </span>
                            </td>

                            <td class="px-6 py-4 font-medium">{{ formatDate(invoice.created_at) }}</td>
                            
                            <!-- CELDA DE ACCIONES CON BOTONES ELEGANTES -->
                            <td class="px-6 py-4">
                                <div class="flex items-center justify-center gap-2">
                                    <!-- Botón "Ver" rediseñado -->
                                    <button 
                                        @click="viewInvoice(invoice)" 
                                        class="flex items-center gap-1 px-3 py-1 text-sm text-blue-500 transition-colors duration-200 border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white"
                                        title="Ver Factura">
                                        <i class="pi pi-eye"></i>
                                        <span>Ver</span>
                                    </button>
                                    
                                    <!-- Botón "Anular" rediseñado -->
                                    <button 
                                        v-if="user && user.role === 'admin' && invoice.status !== 'cancelled'" 
                                        @click="annulInvoice(invoice)" 
                                        class="flex items-center gap-1 px-3 py-1 text-sm text-red-500 transition-colors duration-200 border border-red-500 rounded-lg hover:bg-red-500 hover:text-white"
                                        title="Anular Factura">
                                        <i class="pi pi-ban"></i>
                                        <span>Anular</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="invoices.data.length === 0">
                            <td colspan="8" class="px-6 py-8 text-center text-gray-500">No hay facturas registradas</td>
                        </tr>
                    </tbody>
                </table>
            </div>

  <Pagination :links="invoices.links" />
</div>
    </AppLayout>
</template>
<script setup>
import { computed, reactive } from 'vue';
 import { usePage, router } from '@inertiajs/vue3';
 import { route } from 'ziggy-js';
 import axios from 'axios';
 import Swal from 'sweetalert2';
 import AppLayout from '@/Layouts/AppLayout.vue';
 import NavCashier from '@/Layouts/NavCashier.vue';
 import Pagination from '@/Components/Pagination.vue';
 
 const page = usePage();
 const user = computed(() => page.props.auth.user);
 
 const props = defineProps({
     invoices: {
         type: Object,
         required: true,
     },
 });

 // filtros reactivos (se envían por query params)
 const filters = reactive({
     search: page.props.filters?.search ?? '',
     date_from: page.props.filters?.date_from ?? '',
     date_to: page.props.filters?.date_to ?? '',
     min_total: page.props.filters?.min_total ?? '',
     max_total: page.props.filters?.max_total ?? '',
     order_type: page.props.filters?.order_type ?? '',
     status: page.props.filters?.status ?? '',
     sort_by: page.props.filters?.sort_by ?? 'created_at',
     sort_dir: page.props.filters?.sort_dir ?? 'desc',
});

function applyFilters() {
    // construir objeto query sin valores vacíos
    const q = {};
    Object.keys(filters).forEach(k => {
        const v = filters[k];
        if (v !== '' && v !== null && v !== undefined) q[k] = v;
    });
    router.get(route('invoices.index'), q, { preserveState: true, replace: true });
}

function clearFilters() {
    Object.assign(filters, {
        search: '', date_from: '', date_to: '', min_total: '', max_total: '',
        order_type: '', status: '', sort_by: 'created_at', sort_dir: 'desc',
    });
    applyFilters();
}

function toggleSort(field) {
    if (filters.sort_by === field) {
        filters.sort_dir = filters.sort_dir === 'desc' ? 'asc' : 'desc';
    } else {
        filters.sort_by = field;
        filters.sort_dir = 'desc';
    }
    applyFilters();
}
 
 // --- FUNCIONES PARA ESTILIZAR EL ESTADO ---
 
 function getStatusClasses(status) {
     switch (status) {
         case 'created':
             return 'bg-green-100 text-green-800';
         case 'cancelled':
             return 'bg-red-100 text-red-800';
         default:
             return 'bg-gray-100 text-gray-800';
     }
 }
 
 function getStatusIcon(status) {
     switch (status) {
         case 'created':
             return 'pi pi-check-circle';
         case 'cancelled':
             return 'pi pi-times-circle';
         default:
             return 'pi pi-info-circle';
     }
 }
 
 function getStatusText(status) {
     switch (status) {
         case 'created':
             return 'Pagada';
         case 'cancelled':
             return 'Anulada';
         default:
             return status;
     }
 }
 
 
 function viewInvoice(invoice) {
     const invoiceHTML = getInvoiceHtml(invoice);
     if (!invoiceHTML) return;
 
     const printWindow = window.open('', '_blank');
     if (!printWindow) {
         alert('Por favor, permite las ventanas emergentes para ver la factura.');
         return;
     }
 
     printWindow.document.open();
     printWindow.document.write(invoiceHTML);
     printWindow.document.close();
 }
 
 function getInvoiceHtml(invoice) {
     if (!invoice?.order?.order_items) {
         console.error("Datos de la factura incompletos.", invoice);
         Swal.fire('Error', 'Los datos de esta factura están incompletos y no se puede generar la vista.', 'error');
         return null;
     }
 
     const date = formatDate(invoice.created_at);
 
     const productsHTML = invoice.order.order_items.map(item => `
         <tr>
             <td style="text-align: center; vertical-align: top;">${item.quantity}</td>
             <td style="vertical-align: top;">${item.product.name}</td>
             <td style="text-align: right; vertical-align: top;">C$${(item.price * item.quantity).toFixed(2)}</td>
         </tr>
     `).join('');
 
     let discountHTML = '';
     if (invoice.discount_type && invoice.discount_value > 0) {
         const discountLabel = invoice.discount_type === 'percent'
             ? `${invoice.discount_value}%`
             : `C$${parseFloat(invoice.discount_value).toFixed(2)}`;
         
         const discountAmount = invoice.discount_amount ?? (invoice.subtotal - invoice.total);
 
         discountHTML = `
             <div class="total">Descuento (${discountLabel}): -C$${parseFloat(discountAmount).toFixed(2)}</div>
         `;
     }
 
     return `
         <html>
             <head>
                 <meta charset="UTF-8">
                 <title>Factura N° ${invoice.invoice_number}</title>
                  <style>
                     body { width: 57mm; font-size: 14px; margin: 0; padding: 4px; font-family: Arial, sans-serif; line-height: 1.2; }
                     .center { text-align: center; }
                     .bold { font-weight: bold; }
                     table { width: 100%; border-collapse: collapse; font-size: 12px; }
                     th, td { text-align: left; }
                     .total { text-align: right; font-weight: bold; font-size: 14px; margin-top: 10px; }
                     .footer { margin-top: 20px; font-size: 16px; text-align: center; color: black; }
                     img { max-width: 70%; height: auto; }
                     @media print { html, body { width: 57mm; max-height: 300mm; overflow: hidden; margin: 0; padding: 0; } }
                 </style>
             </head>
             <body>
                 <div class="center">
                     <img src="/images/SopasLogo.png" alt="Logo" />
                     <p class="bold">Sopas Nikas</p>
                     <p>Del Busto José Martí<br>2 cuadras al Este, 10 vrs al Norte.</p>
                     <p>Teléfono: +505 8352 9705</p>
                     <p><strong>RUC:0011602970002Q</strong></p>
                        <p><strong>Factura N°: ${invoice.invoice_number}</strong></p>
                     
                 </div>
                 <hr>
                 <p><strong>Fecha:</strong> ${date}</p>
                 <p><strong>Cliente:</strong> ${invoice.fiscal_name || 'Consumidor Final'}</p>
                 <p><strong>RUC:</strong> ${invoice.fiscal_ruc || ''}</p>
                 <hr>
                 <table>
                     <thead>
                         <tr>
                             <th style="text-align: center;">Cant.</th>
                             <th style="text-align: left;">Producto</th>
                             <th style="text-align: right;">Total</th>
                         </tr>
                     </thead>
                     <tbody>${productsHTML}</tbody>
                 </table>
                 <hr>
                 <div class="total">Subtotal: C$${parseFloat(invoice.subtotal).toFixed(2)}</div>
                 ${discountHTML}
                 <div class="total" style="font-size: 14pt;">Total: C$${parseFloat(invoice.total).toFixed(2)}</div>
                 <div class="footer">
                     <strong>¡Gracias por su compra!</strong>
                 </div>
                 <div style="margin-top: 50px;">.</div>
                 <script>
                     window.onload = () => {
                         window.print();
                     };
                 <\/script>
             </body>
         </html>
     `;
 }
 
 
 // --- FUNCIONES EXISTENTES (sin cambios) ---
 
 // Función para formatear fecha
 function formatDate(isoString) {
     if (!isoString) return '';
     const d = new Date(isoString);
     return d.toLocaleString('es-MX', {
         day: '2-digit', month: '2-digit', year: 'numeric',
         hour: '2-digit', minute: '2-digit',
     });
 }
 
 // Anular factura
 async function annulInvoice(invoice) {
     const result = await Swal.fire({
         title: '¿Anular factura?',
         text: `Factura N° ${invoice.invoice_number ?? invoice.id}`,
         icon: 'warning',
         showCancelButton: true,
         confirmButtonText: 'Sí, anular',
         cancelButtonText: 'Cancelar',
     });
 
     if (!result.isConfirmed) return;
 
     try {
         await axios.post(route('invoices.annul', invoice.id));
         Swal.fire('Anulada', 'La factura fue anulada correctamente', 'success');
         router.reload({ preserveScroll: true });
     } catch (e) {
         console.error(e);
         const errorMessage = e.response?.data?.error || 'No se pudo anular la factura';
         Swal.fire('Error', errorMessage, 'error');
     }
 }
</script>




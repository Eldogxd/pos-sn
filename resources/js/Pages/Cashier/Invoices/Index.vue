<template>
    <AppLayout title="Facturas Historial">
        <template #header>
            <NavCashier />
        </template>

        <div class="p-3 mx-auto space-y-4 max-w-7xl sm:p-6">
            <!-- Barra de búsqueda y filtros -->
            <div class="p-3.5 card sm:p-5">
                <div class="flex flex-col gap-3 sm:flex-row sm:items-end">
                    <div class="flex-1 min-w-0">
                        <label class="label">Buscar factura o cliente</label>
                        <div class="relative">
                            <i class="pi pi-search text-xs text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
                            <input
                                v-model="filters.search"
                                @keyup.enter="applyFilters"
                                type="text"
                                placeholder="Nº factura, cliente o RUC..."
                                class="pl-9 input"
                            >
                        </div>
                    </div>

                    <div class="flex items-center gap-2 shrink-0">
                        <button
                            type="button"
                            @click="showMobileFilters = !showMobileFilters"
                            class="btn btn-secondary md:hidden"
                        >
                            <i class="pi pi-sliders-h text-xs"></i>
                            <span>Filtros</span>
                            <span v-if="activeFiltersCount > 0" class="badge bg-mantis-600 text-white">{{ activeFiltersCount }}</span>
                        </button>

                        <button type="button" @click="applyFilters" class="btn btn-primary flex-1 sm:flex-initial">
                            <i class="pi pi-search text-xs"></i>
                            <span>Buscar</span>
                        </button>

                        <button
                            v-if="activeFiltersCount > 0 || filters.search"
                            type="button"
                            @click="clearFilters"
                            class="btn btn-secondary"
                            title="Limpiar filtros"
                        >
                            <i class="pi pi-filter-slash text-xs"></i>
                            <span class="hidden sm:inline">Limpiar</span>
                        </button>
                    </div>
                </div>

                <!-- Filtros avanzados (colapsables en móvil, visibles en desktop) -->
                <div
                    class="grid-cols-1 gap-3 pt-3 mt-3 border-t border-gray-100 sm:grid-cols-2 lg:grid-cols-6"
                    :class="showMobileFilters ? 'grid' : 'hidden md:grid'"
                >
                    <div>
                        <label class="label">Desde</label>
                        <input v-model="filters.date_from" type="date" class="input">
                    </div>
                    <div>
                        <label class="label">Hasta</label>
                        <input v-model="filters.date_to" type="date" class="input">
                    </div>
                    <div>
                        <label class="label">Mínimo (C$)</label>
                        <input v-model.number="filters.min_total" type="number" step="0.01" placeholder="0.00" class="input">
                    </div>
                    <div>
                        <label class="label">Máximo (C$)</label>
                        <input v-model.number="filters.max_total" type="number" step="0.01" placeholder="0.00" class="input">
                    </div>
                    <div>
                        <label class="label">Tipo de orden</label>
                        <select v-model="filters.order_type" class="input">
                            <option value="">Todos</option>
                            <option value="mesa">Mesa</option>
                            <option value="delivery">Delivery</option>
                            <option value="llevar">Para llevar</option>
                            <option value="pedidosya">PedidosYa</option>
                        </select>
                    </div>
                    <div>
                        <label class="label">Estado / Orden</label>
                        <div class="flex gap-1.5">
                            <select v-model="filters.status" class="input flex-1 min-w-0">
                                <option value="">Todos</option>
                                <option value="created">Pagada</option>
                                <option value="cancelled">Anulada</option>
                            </select>
                            <button
                                type="button"
                                @click="toggleSortDirection"
                                class="btn btn-secondary px-2.5 shrink-0"
                                :title="`Orden actual: ${filters.sort_dir === 'asc' ? 'Ascendente' : 'Descendente'}`"
                            >
                                <i :class="filters.sort_dir === 'asc' ? 'pi pi-sort-amount-up' : 'pi pi-sort-amount-down'" class="text-xs"></i>
                            </button>
                        </div>
                    </div>

                    <div class="flex items-center justify-between gap-2 sm:col-span-2 lg:col-span-6 md:hidden pt-1">
                        <select v-model="filters.sort_by" class="input flex-1">
                            <option value="created_at">Ordenar: Fecha</option>
                            <option value="total">Ordenar: Total</option>
                            <option value="invoice_number">Ordenar: Nº Factura</option>
                        </select>
                        <button type="button" @click="applyFilters(); showMobileFilters = false" class="btn btn-primary">
                            Aplicar
                        </button>
                    </div>
                </div>

                <div class="flex items-center justify-between pt-3 mt-3 text-xs text-gray-500 border-t border-gray-100">
                    <span>
                        Mostrando <strong class="text-gray-800">{{ invoices.data.length }}</strong> de
                        <strong class="text-gray-800">{{ invoices.total }}</strong> facturas
                    </span>
                    <div class="hidden md:flex items-center gap-2">
                        <span>Ordenar por:</span>
                        <select v-model="filters.sort_by" @change="applyFilters" class="px-2 py-1 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mantis-500">
                            <option value="created_at">Fecha</option>
                            <option value="total">Total</option>
                            <option value="invoice_number">Nº Factura</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Vista Móvil: Tarjetas compactas -->
            <div class="space-y-2.5 md:hidden">
                <div v-if="invoices.data.length === 0" class="p-8 text-center text-sm text-gray-500 card">
                    No hay facturas registradas
                </div>

                <div
                    v-for="invoice in invoices.data"
                    :key="`m-${invoice.id}`"
                    class="p-3.5 card space-y-2.5"
                >
                    <div class="flex items-start justify-between gap-2">
                        <div class="min-w-0">
                            <div class="flex items-center gap-2 flex-wrap">
                                <span class="font-bold text-gray-900">N° {{ invoice.invoice_number }}</span>
                                <span
                                    class="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-full"
                                    :class="getStatusClasses(invoice.status)"
                                >
                                    <i :class="getStatusIcon(invoice.status)" class="text-[10px]"></i>
                                    {{ getStatusText(invoice.status) }}
                                </span>
                            </div>
                            <p class="mt-0.5 text-sm font-medium text-gray-800 truncate">
                                {{ invoice.fiscal_name ?? 'Sin Nombre' }}
                            </p>
                            <p class="text-xs text-gray-500">
                                RUC: {{ invoice.fiscal_ruc ?? 'Sin RUC' }} · {{ formatDate(invoice.created_at) }}
                            </p>
                        </div>
                        <div class="text-right shrink-0">
                            <div class="text-base font-extrabold text-mantis-700 tabular-nums">C${{ invoice.total }}</div>
                            <div class="text-[11px] text-gray-400 tabular-nums">Sub: C${{ invoice.subtotal }}</div>
                        </div>
                    </div>

                    <div class="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                        <button
                            @click="viewInvoice(invoice)"
                            class="btn btn-outline flex-1 py-2 text-xs"
                        >
                            <i class="pi pi-eye text-xs"></i>
                            <span>Ver / Imprimir</span>
                        </button>
                        <button
                            v-if="user && user.role === 'admin' && invoice.status !== 'cancelled'"
                            @click="annulInvoice(invoice)"
                            class="btn btn-danger py-2 px-3 text-xs"
                        >
                            <i class="pi pi-ban text-xs"></i>
                            <span>Anular</span>
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
                                <th class="px-5 py-3.5 text-center">N° Factura</th>
                                <th class="px-5 py-3.5 text-left">Cliente</th>
                                <th class="px-5 py-3.5 text-center">RUC Cliente</th>
                                <th class="px-5 py-3.5 text-right">SubTotal</th>
                                <th @click="toggleSort('total')" class="px-5 py-3.5 text-right cursor-pointer select-none hover:text-mantis-700">
                                    Total
                                    <i
                                        v-if="filters.sort_by === 'total'"
                                        :class="filters.sort_dir === 'desc' ? 'pi pi-sort-down' : 'pi pi-sort-up'"
                                        class="ml-1 text-[10px]"
                                    ></i>
                                </th>
                                <th class="px-5 py-3.5 text-center">Estado</th>
                                <th class="px-5 py-3.5 text-center">Fecha y Hora</th>
                                <th class="px-5 py-3.5 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            <tr v-for="invoice in invoices.data" :key="invoice.id" class="transition hover:bg-gray-50/70">
                                <td class="px-5 py-3.5 font-semibold text-center text-gray-900 tabular-nums">{{ invoice.invoice_number }}</td>
                                <td class="px-5 py-3.5 text-left">{{ invoice.fiscal_name ?? 'Sin Nombre' }}</td>
                                <td class="px-5 py-3.5 text-center text-gray-600">{{ invoice.fiscal_ruc ?? 'Sin RUC' }}</td>
                                <td class="px-5 py-3.5 font-medium text-right tabular-nums">C${{ invoice.subtotal }}</td>
                                <td class="px-5 py-3.5 font-bold text-right text-gray-900 tabular-nums">C${{ invoice.total }}</td>
                                <td class="px-5 py-3.5 text-center">
                                    <span
                                        class="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full"
                                        :class="getStatusClasses(invoice.status)"
                                    >
                                        <i :class="getStatusIcon(invoice.status)" class="text-[11px]"></i>
                                        {{ getStatusText(invoice.status) }}
                                    </span>
                                </td>
                                <td class="px-5 py-3.5 text-center text-gray-600 whitespace-nowrap">{{ formatDate(invoice.created_at) }}</td>
                                <td class="px-5 py-3.5">
                                    <div class="flex items-center justify-center gap-2">
                                        <button
                                            @click="viewInvoice(invoice)"
                                            class="btn btn-outline py-1.5 px-3 text-xs"
                                            title="Ver Factura"
                                        >
                                            <i class="pi pi-eye text-xs"></i>
                                            <span>Ver</span>
                                        </button>

                                        <button
                                            v-if="user && user.role === 'admin' && invoice.status !== 'cancelled'"
                                            @click="annulInvoice(invoice)"
                                            class="btn btn-danger py-1.5 px-3 text-xs"
                                            title="Anular Factura"
                                        >
                                            <i class="pi pi-ban text-xs"></i>
                                            <span>Anular</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="invoices.data.length === 0">
                                <td colspan="8" class="px-6 py-10 text-center text-gray-500">No hay facturas registradas</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <Pagination :links="invoices.links" />
        </div>
    </AppLayout>
</template>
<script setup>
import { computed, reactive, ref } from 'vue';
 import { usePage, router } from '@inertiajs/vue3';
 import { route } from 'ziggy-js';
 import axios from 'axios';
 import Swal from 'sweetalert2';
 import AppLayout from '@/Layouts/AppLayout.vue';
 import NavCashier from '@/Layouts/NavCashier.vue';
 import Pagination from '@/Components/Pagination.vue';
 import { escapeHtml } from '@/Utils/thermalPrinter';
 
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

const showMobileFilters = ref(false);
const activeFiltersCount = computed(() => {
    const keys = ['date_from', 'date_to', 'min_total', 'max_total', 'order_type', 'status'];
    return keys.filter(k => filters[k] !== '' && filters[k] !== null && filters[k] !== undefined).length;
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

function toggleSortDirection() {
    filters.sort_dir = filters.sort_dir === 'desc' ? 'asc' : 'desc';
    applyFilters();
}
 
 // --- FUNCIONES PARA ESTILIZAR EL ESTADO ---
 
 function getStatusClasses(status) {
     switch (status) {
         case 'created':
             return 'bg-mantis-100 text-mantis-800';
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
     const itemsToPrint = invoice?.order_items?.length
         ? invoice.order_items
         : (invoice?.order?.order_items || []);

     if (!itemsToPrint.length) {
         console.error("Datos de la factura incompletos.", invoice);
         Swal.fire('Error', 'Los datos de esta factura están incompletos y no se puede generar la vista.', 'error');
         return null;
     }
 
     const date = formatDate(invoice.created_at);
 
     const productsHTML = itemsToPrint.map(item => `
         <tr>
             <td style="text-align: center; vertical-align: top;">${escapeHtml(item.quantity)}</td>
             <td style="vertical-align: top;">${escapeHtml(item.product?.name || 'Producto')}</td>
             <td style="text-align: right; vertical-align: top;">C$${(item.price * item.quantity).toFixed(2)}</td>
         </tr>
     `).join('');
 
     let discountHTML = '';
     if (invoice.discount_type && invoice.discount_value > 0) {
         const discountLabel = invoice.discount_type === 'percent'
             ? `${escapeHtml(invoice.discount_value)}%`
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
                 <title>Factura N° ${escapeHtml(invoice.invoice_number)}</title>
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
                      
                        <p><strong>Factura N°: ${escapeHtml(invoice.invoice_number)}</strong></p>
                     
                 </div>
                 <hr>
                 <p><strong>Fecha:</strong> ${escapeHtml(date)}</p>
                 <p><strong>Cliente:</strong> ${escapeHtml(invoice.fiscal_name || 'Consumidor Final')}</p>
                 <p><strong>RUC:</strong> ${escapeHtml(invoice.fiscal_ruc || '')}</p>
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




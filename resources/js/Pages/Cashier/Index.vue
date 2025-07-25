
<template>
  <AppLayout title="Caja">
    <template #header>
      <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
              Panel de Caja
            </h2>
           <NavCashier />
            </div>
     

      
    </template>

    
    <div class="min-h-screen p-8 bg-gray-100">

      <div class="flex items-end justify-end gap-4 mb-8">
        <button
          @click="openTakeawayModal"
          class="px-6 py-3 text-white rounded-lg bg-mantis-500 hover:bg-mantis-600"
        >
          Venta Para Llevar
        </button>
        <button
          @click="openPedidosYaModal"
          class="px-6 py-3 text-white bg-red-500 rounded-lg hover:bg-red-600"
        >
          Venta Pedidos Ya
        </button>
      </div>

      <h1 class="mb-8 text-3xl font-bold text-center">Mesas</h1>

     <div class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <div
          v-for="table in tables"
          :key="table.id"
          @click="openTableModal(table)"
          class="flex flex-col items-center p-6 transition duration-300 bg-white shadow-md cursor-pointer rounded-2xl hover:shadow-xl"
        >
          <div
            class="flex items-center justify-center w-20 h-20 text-2xl font-bold rounded-full"
            :class="table.status === 'Libre' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'"
          >
            {{ table.number }}
          </div>
          <p class="mt-4 font-semibold text-gray-700 capitalize">
            {{ table.status }}
          </p>
        </div>
      </div> 

       <!-- Modal -->
       <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <div class="relative w-full max-w-4xl mx-2 md:mx-4 bg-white rounded-xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">

     <!-- Botón Cerrar (X) -->
     <button @click="closeModal"
            class="absolute text-white transition top-3 right-3 hover:text-red-600"
            aria-label="Cerrar">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none"
           viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    
    <!-- Header -->
    <div class="p-4 text-white bg-mantis-400">
      <h2 class="text-xl font-bold md:text-2xl">{{ orderType }} {{ selectedTable?.number }}</h2>
      <div class="mt-3">
        <label class="block mb-1 text-sm font-medium text-white">Nombre del Cliente</label>
        <input v-model="customerName" type="text"
               class="w-full p-2 text-white placeholder-white bg-white border border-white rounded-lg bg-opacity-20 focus:ring-2 focus:ring-white"
               placeholder="Ingrese nombre">
      </div>
    </div>

    <!-- Content -->
    <div class="flex flex-col flex-1 overflow-hidden md:flex-row">

      <!-- Productos (Scrollable) -->
      <div class="w-full p-4 overflow-y-auto border-b md:w-1/2 md:border-b-0 md:border-r max-h-64 md:max-h-full">
        <h3 class="mb-4 text-lg font-semibold text-gray-800">Todos los Productos</h3>
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-2">
          <div v-for="product in products" :key="product.id" 
               @click="addProduct(product)"
               class="p-3 transition-colors border rounded-lg cursor-pointer hover:bg-blue-50">
            <div class="flex items-start">
              <div class="flex-1">
                <p class="font-medium text-gray-800">{{ product.name }}</p>
                <p class="text-sm text-gray-500">C${{ product.price }}</p>
              </div>
              <div class="p-1 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Productos Seleccionados -->
      <div class="w-full p-4 overflow-y-auto md:w-1/2 bg-gray-50 max-h-64 md:max-h-full">
        <h3 class="mb-4 text-lg font-semibold text-gray-800">Tu Orden</h3>
        
        <div v-if="selectedProducts.length === 0" class="py-8 text-center text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p>Agrega productos a la orden</p>
        </div>

        <div v-else class="space-y-3">
          <div v-for="p in selectedProducts" :key="p.id" :class="[
       'flex flex-wrap items-center justify-between p-3 rounded-lg shadow-sm md:flex-nowrap bg-white',
       p.payment_status === 'paid' ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : ''
     ]">
            <div class="flex-1 min-w-[50%]">
              <p class="font-light">{{ p.name }}</p>
              <p class="text-sm text-gray-500">C${{ p.price }} c/u</p>
              <p v-if="p.payment_status === 'paid' " class="text-sm text-red-500">Pagado</p>
            </div>

            <div v-if="p.payment_status !== 'paid'" class="flex items-center my-2 md:my-0">
              <button @click.stop="decreaseQuantity(p.id)" class="text-gray-500 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
              </div>
              
              <span class="w-6 mx-2 text-center">{{ p.quantity }}</span>

              <div v-if="p.payment_status !== 'paid'" class="flex items-center my-2 md:my-0">
              <button @click.stop="increaseQuantity(p.id)" class="text-gray-500 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>

            <div class="w-20 font-medium text-right">C${{ (p.price * p.quantity).toFixed(2) }}</div>

            <button v-if="p.payment_status !== 'paid'" @click.stop="removeProduct(p.id)" class="p-1 text-red-500 hover:text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Indicaciones -->
    <div class="p-4 border-t border-gray-200">
      <label class="block mb-2 text-sm font-medium text-gray-700">Indicaciones Especiales</label>
      <textarea v-model="indications"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="3">
      </textarea>
    </div>

    <!-- Total y Acciones -->
    <div class="bg-white border-t">
      <div class="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
        
        <div class="space-y-1 text-right">
  <!-- Si hay descuento -->
  <div v-if="selectedTable?.active_order?.discount_type" class="space-y-1 text-sm">
    <p class="text-gray-600">Subtotal: C$ {{ calculateOrderTotal().toFixed(2) }}</p>
<p class="text-green-600">
  Descuento (
    {{ selectedTable.active_order.discount_type === 'percent' 
      ? `${selectedTable.active_order.discount_value}%` 
      : 'C$' + parseFloat(selectedTable.active_order.discount_value).toFixed(2) }}
  ):
  -C$ {{ selectedTable.active_order.calculated_discount?.toFixed(2) }}
</p>
<p class="text-xl font-bold text-blue-800">
  Total Final: C$ {{
    (calculateOrderTotal() - (selectedTable?.active_order?.calculated_discount || 0)).toFixed(2)
  }}
</p>
  </div>

  <!-- Si no hay descuento -->
  <div v-else class="text-xl font-bold text-blue-800">
    Total: C$ {{ total }}
  </div>
</div>


        <div class="flex flex-wrap justify-end gap-2">


          <!-- Modal para factura parcial -->
<div v-if="showPartialInvoiceModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <div class="w-full max-w-4xl mx-4 overflow-hidden bg-white shadow-lg rounded-xl">
    <!-- Cabecera -->
    <div class="p-6 text-white bg-blue-500">
      <h2 class="text-2xl font-bold">Factura Parcial</h2>
    </div>

    <!-- Campo de nombre solo para factura parcial -->
  <div class="p-3 mb-4">
  <label class="block mb-1 text-sm font-medium text-gray-700">Nombre del Cliente (Factura Parcial)</label>
  <input 
    v-model="fiscal_name"
    type="text"
    class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  </div>
  <div class="p-3 mb-4">
  <label class="block mb-1 text-sm font-medium text-gray-700">Numero RUC </label>
  <input 
    v-model="fiscal_ruc"
    type="text"
    class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  </div>
  <p>Número de factura: {{ nextInvoiceNumber}}</p>

    <!-- Contenido -->
    <div class="p-6 space-y-4">
      <p class="text-sm text-gray-600">Selecciona cuánto pagar de cada producto:</p>

      <!-- Tabla de productos con input de cantidad -->
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th class="px-4 py-2 text-left">Producto</th>
            <th class="px-4 py-2 text-center">Cant.</th>
            <th class="px-4 py-2 text-right">Pagar Cant.</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="item in selectedItemsForPartial" :key="item.id">
            <td class="px-4 py-2">{{ item.name }}</td>
            <td class="px-4 py-2 text-center">{{ item.quantity }}</td>
            <td class="px-4 py-2 text-right">
              <input 
                type="number" 
                min="0" 
                :max="item.quantity"
                v-model.number="item.payQuantity"
                class="w-16 p-1 border rounded"
              >
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Total -->
      <div class="pt-4 mt-4 border-t">
        <p class="font-bold text-right">
          Total a Pagar: C${{ partialTotal.toFixed(2) }}
        </p>
      </div>

      <!-- Acciones -->
      <div class="flex justify-end space-x-3">
        <button 
          @click="showPartialInvoiceModal = false"
          class="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
        >
          Cancelar
        </button>
        <button 
          @click="generatePartialInvoice"
          class="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          Imprimir Factura Parcial
        </button>
      </div>
    </div>
  </div>
</div>


<!-- Aplicar Descuento -->
<button v-if="selectedTable?.active_order && orderType === 'mesa' && !isOrderClosed"
  @click="openDiscountModal"
        class="px-5 py-3 text-sm font-medium text-white transition-colors duration-200 bg-orange-400 rounded-lg hover:bg-orange-500 focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 min-w-[140px]">
  Aplicar Descuento
</button>  

<!-- Modal para descuento -->
<div v-if="showDiscountInput" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <div class="relative w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl">
    
    <!-- Botón de cierre (X) -->
    <button @click="closeDiscountModal" class="absolute text-gray-500 top-3 right-3 hover:text-gray-700">
      <span class="text-xl font-bold">×</span>
    </button>

    <h3 class="mb-4 text-lg font-semibold">Aplicar Descuento</h3>

    <!-- Tipo -->
    <div class="mb-4">
      <label class="block mb-2 text-sm font-medium text-gray-700">Tipo de descuento</label>
      <select v-model="discountType" class="w-full px-3 py-2 border rounded-md">
        <option value="amount">Monto fijo</option>
        <option value="percent">Porcentaje (%)</option>
      </select>
    </div>

    <!-- Valor -->
    <div class="mb-4">
      <label class="block mb-2 text-sm font-medium text-gray-700">Valor</label>
      <input v-model.number="discountValue" type="number" min="0" step="0.01" class="w-full px-3 py-2 border rounded-md" />
    </div>

    <!-- Razón -->
    <div class="mb-4">
      <label class="block mb-2 text-sm font-medium text-gray-700">Razón del descuento</label>
      <input v-model="discountReason" type="text" placeholder="Ej: Cliente frecuente" class="w-full px-3 py-2 border rounded-md" />
    </div>

    <!-- Acciones -->
    <div class="flex justify-end gap-3">
      <button @click="cancelDiscount" class="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300">Anular Descuento</button>
      <button @click="applyDiscount" class="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700">Aplicar</button>
    </div>
  </div>
</div>

<!-- Botón para abrir el modal -->
<button v-if="selectedTable?.active_order && orderType === 'mesa' && !isOrderClosed" 
  @click="showModalcuenta = true"
        class="px-5 py-3 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
  Opciones de Cuenta
</button>

<!-- Modal -->
<div v-if="showModalcuenta" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <div class="relative w-full max-w-md p-6 bg-white shadow-xl rounded-2xl">

    <!-- Botón para cerrar el modal -->
    <button @click="showModalcuenta = false"
            class="absolute text-xl font-bold text-gray-500 top-3 right-3 hover:text-gray-700">&times;</button>

    <h2 class="mb-5 text-xl font-semibold text-gray-800">Opciones de Cuenta</h2>

    <div class="space-y-3">
      <!-- Cancelar -->
      <button v-if="selectedTable?.active_order && orderType === 'mesa' && !isOrderClosed"
              @click="cancelOrder"
              class="w-full px-5 py-3 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800">
        Cancelar
      </button>

      <!-- Factura Parcial -->
      <button v-if="selectedTable?.active_order && orderType === 'mesa' && !isOrderClosed"
              @click="openPartialInvoiceModal"
              class="w-full px-5 py-3 text-sm font-medium text-white rounded-lg bg-sky-500 hover:bg-sky-600">
        Factura Parcial
      </button>

      <!-- Factura -->
      <button v-if="selectedTable?.active_order && orderType === 'mesa' && !isOrderClosed"
              @click="generateInvoicePreview"
              class="w-full px-5 py-3 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600">
        Factura
      </button>

      <!-- Cerrar Cuenta -->
      <button v-if="selectedTable?.active_order && orderType === 'mesa' && !isOrderClosed"
              @click="generateFinalInvoice(selectedTable.active_order.id); recargarPaginaDespuesDeUnSegundo()"
              class="w-full px-5 py-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">
        Cerrar Cuenta
      </button>
    </div>
  </div>
</div>


          <button @click="submitOrder"
                  class="px-4 py-2 text-white border rounded-lg"
                  :class="{
                    'border-green-600 bg-green-500 hover:bg-green-600': !editingOrderId,
                    'border-mantis-600 bg-mantis-500 hover:bg-mantis-600': editingOrderId
                  }">
            {{ editingOrderId ? 'Actualizar Orden' : 'Crear Orden' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  </AppLayout>
</template>


<script setup>
import NavCashier from '@/Layouts/NavCashier.vue'
import { ref, computed, } from 'vue'
import AppLayout from '@/Layouts/AppLayout.vue'
import { router } from '@inertiajs/vue3'
import { usePage } from '@inertiajs/vue3'
import { route } from 'ziggy-js';
import axios from 'axios';
import Swal from 'sweetalert2';




const props = defineProps({
  tables: Array,
  products: Array,
})

const selectedTable = ref(null)
const showModal = ref(false)
const orderType = ref('') // "mesa", "llevar", "pedidosya"
const customerName = ref('')
const fiscal_name = ref('')
const fiscal_ruc = ref('')
const indications = ref('')
const selectedProducts = ref([])
const editingOrderId = ref(null)
const selectedItemsForPartial = ref([]);
const showPartialInvoiceModal = ref(false)
const showModalcuenta = ref(false)
const nextInvoiceNumber = ref('');
const showFinalInvoiceModal = ref(false); 
const showDiscountInput = ref(false);
const discountType = ref('amount'); // 'amount' o 'percent'
const discountValue = ref(0);
const discountReason = ref('');
const appliedDiscount = ref(null); // Para guardar descuento aplicado
const partialTotal = computed(() => {
  return selectedItemsForPartial.value.reduce((sum, p) => sum + (p.price * p.payQuantity), 0);
})



//modal para mesas
function openTableModal(table) {
  selectedTable.value = table;
  orderType.value = 'mesa';
  customerName.value = table.active_order?.customer_name || '';
  indications.value = table.active_order?.indications || '';
  selectedProducts.value = [];
  editingOrderId.value = table.active_order?.id || null;

  // Cargar productos
  if (table.active_order) {
    for (const item of table.active_order.order_items) {
      selectedProducts.value.push({
        id: item.product.id,        // ✅ Usar product.id para el campo 'id'
        order_item_id: item.id,     // ✅ Mantener order_item.id aquí
        product_id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        payment_status: item.payment_status,
      });
    }
  

    // Calcular descuento si existe
    if (table.active_order.discount_type && table.active_order.discount_value !== null) {
      const currentTotal = calculateOrderTotal();

      let calculatedDiscount = 0;

      if (table.active_order.discount_type === 'amount') {
        calculatedDiscount = Math.min(parseFloat(table.active_order.discount_value), currentTotal);
      } else {
        const percent = Math.min(parseFloat(table.active_order.discount_value), 100);
        calculatedDiscount = (currentTotal * percent) / 100;
      }

      // Asignamos temporalmente para mostrarlo
      table.active_order.calculated_discount = calculatedDiscount;
    } else {
      delete table.active_order.calculated_discount;
    }
  }

  showModal.value = true;
}

//modal para llevar
function openTakeawayModal() {
  selectedTable.value = null
  orderType.value = 'llevar'
  customerName.value = ''
  indications.value = ''
  selectedProducts.value = []
  showModal.value = true
}

//modal para pedidos ya
function openPedidosYaModal() {
  selectedTable.value = null
  orderType.value = 'pedidosya'
  customerName.value = ''
  indications.value = ''
  selectedProducts.value = []
  showModal.value = true
}

//verifica si la orden esta cerrada
const isOrderClosed = computed(() => {
  return selectedTable.value?.active_order?.status === 'cerrada'
})

//aumentar cantidad
const increaseQuantity = (productId) => {
  const product = selectedProducts.value.find(p => p.id === productId);
  if (product) product.quantity++;
};

//restar cantidad
const decreaseQuantity = (productId) => {
  const product = selectedProducts.value.find(p => p.id === productId);
  if (product) {
    if (product.quantity > 1) {
      product.quantity--;
    } else {
      removeProduct(productId);
    }
  }
};

//agregar producto
const addProduct = (product) => {
  const existingProduct = selectedProducts.value.find(p => p.id === product.id);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    selectedProducts.value.push({ 
      ...product, 
      quantity: 1 
    });
  }
};

//quitar producto
const removeProduct = (productId) => {
  selectedProducts.value = selectedProducts.value.filter(p => p.id !== productId);
};

//creacion de ordenes
function submitOrder() {
  if (selectedTable.value?.active_order) {
    console.log("Actualizando orden existente:", selectedTable.value.active_order.id);
    router.put(route('orders.update', selectedTable.value.active_order.id), {
      table_id: selectedTable.value.id,
      customer_name: customerName.value,
      products: selectedProducts.value
        .filter(p => p.payment_status !== 'paid') // Excluir productos pagados
        .map(p => ({
          id: p.id,
          quantity: p.quantity,
          payment_status: p.payment_status || 'pending', // Asegurar que el estado de pago esté definido
        })),
      indications: indications.value,
      discount_type: appliedDiscount.value?.type || null,
      discount_value: appliedDiscount.value?.value || null,
      discount_reason: appliedDiscount.value?.reason || null,
    }, {
      onSuccess: () => {
        closeModal();
        const confirmPrint = window.confirm('¿Desea imprimir la comanda?');
        if (confirmPrint) {
          generateKitchenCommand();
        }
      },
      onError: (errors) => {
        console.error("Errores al actualizar:", errors);
        alert("Hubo un error al actualizar la orden.");
      }
    });
  } else {
    router.post(route('orders.store'), {
      type: orderType.value,
      table_id: selectedTable.value?.id || null,
      customer_name: customerName.value,
      indications: indications.value,
      products: selectedProducts.value.map(p => ({
        id: p.id,
        quantity: p.quantity,
      })),
    }, {
      onSuccess: (response) => {
        closeModal();
        generateKitchenCommand();
      }
    });
  }
}

//comanda cocina
function generateKitchenCommand() {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  const date = new Date().toLocaleString('es-AR', options);
  const tipoOrdenTexto = orderType.value === 'mesa'
    ? `Mesa ${selectedTable.value?.number ?? '-'}` 
    : ucfirst(orderType.value);

  const commandHTML = `
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Comanda</title>
        <style>
          body {
            width: 57mm;
            font-family: Arial, sans-serif;
            font-size: 12px;
            margin: 0 auto;
            padding: 4px;
            line-height: 1.2;
          }
          .center { text-align: center; }
          .bold { font-weight: bold; }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
          }
          th, td { text-align: left; }
          @page {
            margin: 0;
            size: auto;
            margin-top: 0mm !important;
          }
        </style>
      </head>
      <body>
        <!-- Empresa -->
        <div class="center bold">Sopas Nikas</div>
        <p class="center">Del Busto José Martí<br>2 cuadras al Este, 10 vrs al Norte.</p>

        <hr class="space">

        <p><strong>Fecha:</strong> ${date}</p>
        <p><strong>Tipo:</strong> ${tipoOrdenTexto}</p>
        ${customerName.value ? `<p><strong>Cliente:</strong> ${customerName.value}</p>` : ''}
        ${indications.value ? `<p><strong>Indicaciones:</strong> ${indications.value}</p>` : ''}

        <table class="space">
          <thead>
            <tr>
              <th>Cant.</th>
              <th>Producto</th>
            </tr>
          </thead>
          <tbody>
            ${selectedProducts.value.map(p => `
              <tr>
                <td>${p.quantity}</td>
                <td>${p.name}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <script>
          window.onload = function() {
            window.print();
            // window.onafterprint = window.close;
          };
        <\/script>
      </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');

  if (!printWindow) {
    alert('Por favor, permite las ventanas emergentes.');
    return;
  }

  printWindow.document.open();
  printWindow.document.write(commandHTML);
  printWindow.document.close();
}

//cerrar modal
function closeModal() {
  showModal.value = false
}

//funcion vistra previa de la factura
function generateInvoicePreview() {
  const invoiceHTML = getInvoiceHTML(customerName.value, indications.value);
  const printWindow = window.open('', '_blank');

  if (!printWindow) {
    alert('Por favor, permite ventanas emergentes.');
    return;
  }

  printWindow.document.open();
  printWindow.document.write(invoiceHTML);
  printWindow.document.close();
}

//factura
function getInvoiceHTML(customerNameVal, indicatesVal) {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  const date = new Date().toLocaleString('es-MX', options); 

  const tipoOrdenTexto = orderType.value === 'mesa' 
    ? `Mesa ${selectedTable.value?.number ?? '-'}` 
    : ucfirst(orderType.value);

  return `
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Factura</title>
        <style>
          body {
            width: 57mm;
            font-size: 14px;
            margin: 0;
            padding: 4px;
            line-height: 1.2;
            font-family: Arial, sans-serif;
          }
          .center { text-align: center; }
          .bold { font-weight: bold; }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
          }
          th, td {
            text-align: left;
          }
          .total {
            text-align: right;
            font-weight: bold;
            font-size: 14px;
            margin-top: 10px;
          }
          .footer {
            margin-top: 20px;
            font-size: 16px;
            text-align: center;
            color: black;
          }
          img {
            max-width: 25%;
            height: auto;
          }
          @media print {
            html, body {
              width: 57mm;
              max-height: 300mm;
              overflow: hidden;
              margin: 0;
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        <!-- Logo -->
        <div class="center">
          <img src="/images/sopas nikasn.png" alt="Logo" />
        </div>

        <!-- Empresa -->
        <div class="center space">
          <p class="bold">Sopas Nikas</p>
          <p><strong>Dirección: Del Busto José Martí 2 cuadras al Este, 10 vrs al Norte.</strong></p>
          <p>Teléfono: +505 8352 9705</p>
        </div>

        <hr class="space">

        <p><strong>Fecha:</strong> ${date}</p>
        <p><strong>Tipo:</strong> ${tipoOrdenTexto}</p>
        ${customerNameVal ? `<p><strong>Cliente:</strong> ${customerNameVal}</p>` : ''}

        <table class="space">
          <thead>
            <tr>
              <th>Cant.</th>
              <th>Producto</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${selectedProducts.value.map(p => `
              <tr>
                <td>${p.quantity}</td>
                <td>${p.name}</td>
                <td>C$${(p.price * p.quantity).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <!-- Mostrar subtotal, descuento y razón -->
        ${appliedDiscount.value ? `
          <div class="total">
            Subtotal: C$${parseFloat(orderTotal.value).toFixed(2)}
          </div>

          <div class="total">
            Descuento: ${appliedDiscount.value.type === 'percent' ? appliedDiscount.value.value + '%' : 'C$' + parseFloat(appliedDiscount.value.value).toFixed(2)}
          </div>

          <div class="total">
            Razón: ${appliedDiscount.value.reason || 'Sin razón'}
          </div>

          <div class="total">
            Total Final: C$${(parseFloat(orderTotal.value) - parseFloat(appliedDiscount.value.calculated)).toFixed(2)}
          </div>
        ` : `
          <div class="total">
            Total: C$${parseFloat(orderTotal.value).toFixed(2)}
          </div>
        `}

        <div class="footer space">
          <strong>¡Gracias por tu visita!</strong>
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        <\/script>
      </body>
    </html>
  `;
}
//siguente numero de factura
async function fetchNextInvoiceNumber() {
  try {
    const res = await fetch('/next-invoice-number');
    const data = await res.json();
    nextInvoiceNumber.value = data.invoice_number;
  } catch (error) {
    console.error('Error al obtener número de factura:', error);
    alert('No se pudo obtener el número de factura.');
  }
}

//abrir modal de factura parcial
async function openPartialInvoiceModal() {
  if (!selectedProducts.value.length) {
    alert('No hay productos en la orden.');
    return;
  }

selectedItemsForPartial.value = selectedProducts.value.map(p => ({
  id: p.order_item_id,              
  name: p.name,
  price: p.price,        
  quantity: p.quantity,
  payQuantity: p.quantity
}));

 

  showPartialInvoiceModal.value = true;
  showModalcuenta.value =false;

  
  fiscal_name.value = '';
  fiscal_ruc.value = '';

  // Obtener nuevo número de factura
  await fetchNextInvoiceNumber();
}

//funcion para generar factura parcial
async function generatePartialInvoice() {
  const selectedForPayment = selectedItemsForPartial.value.filter(p => p.payQuantity > 0);

  if (!selectedForPayment.length) {
    alert('Debes seleccionar al menos un producto con cantidad mayor a 0');
    return;
  }

  const totalToPay = parseFloat(
    selectedForPayment.reduce((sum, p) => sum + (p.price * p.payQuantity), 0).toFixed(2)
  );

   const items = Array.isArray(selectedItemsForPartial.value)
    ? selectedItemsForPartial.value
        .filter(item => item.payQuantity > 0)
        .map(item => ({
          order_item_id: item.id,
          pay_quantity: item.payQuantity
        }))
    : [];

  if (items.length === 0) {
    alert('Selecciona al menos un producto a pagar.');
    return;
  }

  const dataToSend = {
    invoice_number: nextInvoiceNumber.value,
    fiscal_name: fiscal_name.value,
    fiscal_ruc: fiscal_ruc.value,
    subtotal: totalToPay,
    discount_type: null, // No se aplica descuento en factura parcial
    discount_value: 0,
    discount_reason: '',
    total: totalToPay,
    order_id: selectedTable.value?.active_order?.id || null,
    items
  };

  console.log('Datos enviados:', dataToSend);

  if (!dataToSend.order_id) {
    alert('No se encontró una orden activa para esta mesa.');
    return;
  }

  try {
    const res = await fetch('/partial-invoices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
      },
      body: JSON.stringify(dataToSend)
    });

    if (!res.ok) {
      const text = await res.text(); // Ver respuesta detallada
      console.error('Respuesta del servidor:', text);
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const result = await res.json();
    console.log('Factura guardada:', result);

    const partialInvoiceHTML = getPartialInvoiceHTML(selectedForPayment, totalToPay);
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(partialInvoiceHTML);
    printWindow.document.close();

    selectedProducts.value.forEach(p => p.payQuantity = 1);
    showPartialInvoiceModal.value = false;

  } catch (err) {
    alert('Hubo un problema al guardar la factura parcial. Ver consola para detalles.');
    console.error('Error al guardar factura:', err);
  }
}

//factura parcial
function getPartialInvoiceHTML(items, total) {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  const date = new Date().toLocaleString('es-AR', options); 

  const tipoOrdenTexto = orderType.value === 'mesa'
    ? `Mesa ${selectedTable.value?.number ?? '-'}` 
    : ucfirst(orderType.value);

  let productsHTML = '';
  for (const p of items) {
    productsHTML += `
      <tr>
        <td>${p.payQuantity}</td>
        <td>${p.name}</td>
        <td>C$${(p.price * p.payQuantity).toFixed(2)}</td>
      </tr>
    `;
  }

  

  return `
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Factura</title>
        <style>
          body {
      width: 57mm;
      
      font-size: 14px;
      margin: 0;
      padding: 4px;
      line-height: 1.2;
      font-family: Arial, sans-serif;
    }

    .center { text-align: center; }
    .bold { font-weight: bold; }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
    }

    th, td {
      text-align: left;
    }

    .total {
      text-align: right;
      font-weight: bold;
      font-size: 14px;
      margin-top: 10px;
    }

    .footer {
      margin-top: 20px;
      font-size: 16px;
      text-align: center;
      color: black;
    }

    img {
      max-width: 25%;
      height: auto;
    }

    /* Estilo especial solo para impresión */
    @media print {
      html, body {
        width: 57mm;
        max-height: 300mm;
        overflow: hidden;
        margin: 0;
        padding: 0;
      }
    }
        </style>
      </head>
      <body>
        <!-- Logo -->
        <div class="center">
          <img src="/images/sopas nikasn.png" alt="Logo" />
        </div>

        <!-- Empresa -->
        <div class="center space">
          <p class="bold">Sopas Nikas</p>
          <p><strong>Dirección: Del Busto José Martí 2 cuadras al Este, 10 vrs al Norte.</strong></p>
          <p>Teléfono: +505 8352 9705</p>
          <p><strong>Factura N°: ${nextInvoiceNumber.value}</strong></p>
        </div>

        <hr class="space">

        

        <p><strong>Fecha:</strong> ${date}</p>
        <p><strong>Tipo:</strong> ${tipoOrdenTexto}</p>
        ${fiscal_name.value ? `<p><strong>Cliente:</strong> ${fiscal_name.value}</p>` : ''}
        ${fiscal_ruc.value ? `<p><strong>RUC:</strong> ${fiscal_ruc.value}</p>` : ''}
        
        <table class="space">
          <thead>
            <tr>
              <th>Cant.</th>
              <th>Producto</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${productsHTML}
          </tbody>
        </table>

        <div class="total">
          Total: C$${parseFloat(total).toFixed(2)}
        </div>

        <div class="footer space">
          <strong>¡Gracias por tu visita!</strong>
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        <\/script>
      </body>
    </html>
  `;
}

function ucfirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

//cancelar orden
function cancelOrder() {
  const confirmCancel = window.confirm('¿Estás seguro de que deseas cancelar esta cuenta?');

  if (!confirmCancel) return;

  // Si ya está guardada, mandamos al servidor
  router.post(route('orders.cancel'), {
    order_id: editingOrderId.value,
    table_id: selectedTable.value?.id || null
  }, {
    onSuccess: () => {
      selectedTable.value.active_order.status = 'cancelada';
      closeModal();
      alert('Orden marcada como cancelada.');
    },
    onError: () => {
      alert('No se pudo cancelar la orden.');
    }
  });
}

//factura final
function getFinalInvoiceHTML(items, total) {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  const date = new Date().toLocaleString('es-AR', options); 

  const tipoOrdenTexto = orderType.value === 'mesa'
    ? `Mesa ${selectedTable.value?.number ?? '-'}` 
    : ucfirst(orderType.value);

  let productsHTML = '';
  for (const p of items) {
    productsHTML += `
      <tr>
        <td>${p.payQuantity}</td>
        <td>${p.name}</td>
        <td>C$${(p.price * p.payQuantity).toFixed(2)}</td>
      </tr>
    `;
  }

  return `
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Factura Final</title>
        <style>
          body {
            width: 57mm;
            font-size: 14px;
            margin: 0;
            padding: 4px;
            line-height: 1.2;
            font-family: Arial, sans-serif;
          }
          .center { text-align: center; }
          .bold { font-weight: bold; }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
          }
          th, td {
            text-align: left;
          }
          .total {
            text-align: right;
            font-weight: bold;
            font-size: 14px;
            margin-top: 10px;
          }
          .footer {
            margin-top: 20px;
            font-size: 16px;
            text-align: center;
            color: black;
          }
          img {
            max-width: 25%;
            height: auto;
          }
          @media print {
            html, body {
              width: 57mm;
              max-height: 300mm;
              overflow: hidden;
              margin: 0;
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        <!-- Logo -->
        <div class="center">
          <img src="/images/sopas nikasn.png" alt="Logo" />
        </div>

        <!-- Empresa -->
        <div class="center">
          <p class="bold">Sopas Nikas</p>
          <p><strong>Dirección:</strong> Del Busto José Martí</p>
          <p>Teléfono: +505 8352 9705</p>
          <p><strong>Factura N°:</strong> ${nextInvoiceNumber.value}</p>
        </div>

        <hr />

        <p><strong>Fecha:</strong> ${date}</p>
        <p><strong>Tipo:</strong> ${tipoOrdenTexto}</p>
        ${fiscal_name.value ? `<p><strong>Cliente:</strong> ${fiscal_name.value}</p>` : ''}
        ${fiscal_ruc.value ? `<p><strong>RUC:</strong> ${fiscal_ruc.value}</p>` : ''}

        <table>
          <thead>
            <tr>
              <th>Cant.</th>
              <th>Producto</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${productsHTML}
          </tbody>
        </table>

        ${appliedDiscount.value?.calculated ? `
  <div class="total">
    Descuento (${appliedDiscount.value.type === 'amount' ? 'C$' : ''}${appliedDiscount.value.value}${appliedDiscount.value.type === 'percent' ? '%' : ''}): -C$${parseFloat(appliedDiscount.value.calculated).toFixed(2)}
  </div>
` : ''}
<div class="total">
  Total: C$${parseFloat(total).toFixed(2)}
</div>

        <div class="footer">
          <strong>¡Gracias por tu visita!</strong>
        </div>

        <script>
          window.onload = () => window.print();
        <\/script>
      </body>
    </html>
  `;

  

}

//generar final 
async function generateFinalInvoice(orderId) {
  const table = selectedTable.value;

  if (!table || !table.active_order) {
    alert('No hay una orden activa en esta mesa.');
    return;
  }

  const order = table.active_order;

  const items = getOrderItemsWithNames(order, props.products);

  if (!items.length) {
    alert('No hay productos en esta orden.');
    return;
  }

  const subtotal = items.reduce((sum, p) => sum + (p.price * p.payQuantity), 0);
  const discountAmount = appliedDiscount.value?.calculated || 0;
  const totalToPay = parseFloat(subtotal - discountAmount).toFixed(2);

  if (!nextInvoiceNumber.value) {
    await fetchNextInvoiceNumber();
  }

  const dataToSend = {
    invoice_number: nextInvoiceNumber.value,
    fiscal_name: fiscal_name.value,
    fiscal_ruc: fiscal_ruc.value,
    subtotal: subtotal.toFixed(2),
    discount_type: appliedDiscount.value?.type || null,
    discount_value: appliedDiscount.value?.value || null,
    discount_reason: appliedDiscount.value?.reason || null,
    total: totalToPay,
    order_id: orderId
  };

  console.log('Datos enviados:', dataToSend);

  try {
    const res = await fetch('/invoices/Final', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
      },
      body: JSON.stringify(dataToSend)
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Respuesta del servidor:', text);
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const result = await res.json();
    console.log('Factura guardada:', result);

    const finalInvoiceHTML = getFinalInvoiceHTML(items, totalToPay);
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(finalInvoiceHTML);
    printWindow.document.close();

    showFinalInvoiceModal.value = false;

  } catch (err) {
    alert('Hubo un problema al generar la factura final. Ver consola para detalles.');
    console.error('Error al guardar factura:', err);
  }
}
// Obtener los items de la orden con nombres y precios
function getOrderItemsWithNames(order, products) {
  const orderItems = order.order_items || [];

  return orderItems.map(item => {
    const product = products.find(p => p.id === item.product_id);
    return {
      ...item,
      name: product?.name || 'Producto desconocido',
      price: item.price || product?.price || 0,
      payQuantity: item.quantity
    };
  });
}
// Recargar la página después de un segundo
function recargarPaginaDespuesDeUnSegundo() {
  setTimeout(() => {
    location.reload(); 
  }, 500); 
}

//modal de descuento
function openDiscountModal() {
  loadDiscount(); // Cargar datos del descuento actual
  showDiscountInput.value = true;
}

//cerrar modal de descuento
function closeDiscountModal() {
  showDiscountInput.value = false;
  
}

// Calcular el total de la orden
function calculateOrderTotal() {
  if (!selectedTable.value?.active_order?.order_items?.length) return 0;

  return selectedTable.value.active_order.order_items
    .filter(item => item.payment_status !== 'paid') // excluye los pagados
    .reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
}

// Total de la orden con descuento aplicado
const orderTotal = computed(() => {
  if (!selectedProducts.value.length) return 0;

  const total = selectedProducts.value.reduce((sum, p) => sum + (p.price * p.quantity), 0);

  return parseFloat(total).toFixed(2); // Devuelve string con decimales
});

// Total de los productos seleccionados
const total = computed(() => {
  if (!selectedProducts.value.length) return 0;

  return selectedProducts.value
  .filter(p => p.payment_status !== 'paid') // Excluye los pagados
  .reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
});

/**const finalTotal = computed(() => {
  const subtotal = calculateOrderTotal(); 
  const discount = selectedTable.value?.active_order?.calculated_discount || 0;
  return (subtotal - discount).toFixed(2);
});
*/

// Cargar descuento
function loadDiscount(){
  const order = selectedTable.value?.active_order;
  if (!order) return;

  discountValue.value = order.discount_value || 0;
  discountReason.value = order.discount_reason || '';
  discountType.value = order.discount_type || '';
}

// cancelar descuento
async function cancelDiscount() {
  showDiscountInput.value = false;
  discountValue.value = 0;
  discountReason.value = '';
  discountType.value = '';
  appliedDiscount.value = null;

  const orderId = selectedTable.value?.active_order?.id;

  if (!orderId) {
    alert("No se encontró una orden activa.");
    return;
  }

  try {
    await axios.post(`/orders/${orderId}/remove-discount`);
    
    // Limpia los campos en la orden activa también si quieres reflejarlo en pantalla
    selectedTable.value.active_order.discount_type = null;
    selectedTable.value.active_order.discount_value = null;
    selectedTable.value.active_order.discount_reason = null;

    alert("Descuento eliminado correctamente.");
  } catch (error) {
    console.error("Error al eliminar el descuento:", error);
    alert("Hubo un problema al eliminar el descuento.");
  }
}

// aplicar descuento
function applyDiscount() {
  if (discountValue.value <= 0) {
    alert("El valor del descuento debe ser mayor a 0.");
    return;
  }

  const currentTotal = calculateOrderTotal(); 

  let calculatedDiscount = 0;

  if (discountType.value === 'amount') {
    calculatedDiscount = Math.min(discountValue.value, currentTotal);
  } else {
    const percent = Math.min(discountValue.value, 100);
    calculatedDiscount = (currentTotal * percent) / 100;
  }

  // Guardar el descuento dentro de la mesa actual
  selectedTable.value.active_order.discount_type = discountType.value;
  selectedTable.value.active_order.discount_value = parseFloat(discountValue.value);
  selectedTable.value.active_order.discount_reason = discountReason.value;
  selectedTable.value.active_order.calculated_discount = calculatedDiscount;

  // Enviar al backend
  const orderId = selectedTable.value?.active_order?.id;

  if (!orderId) {
    alert("No hay una orden activa en esta mesa.");
    return;
  }

  axios.post(route('orders.updateDiscount', { order: orderId }), {
    discount_type: discountType.value,
    discount_value: discountValue.value,
    discount_reason: discountReason.value
  })
  .then(response => {
    alert(`Descuento aplicado: C$${calculatedDiscount.toFixed(2)}\nRazón: ${discountReason.value}`);
    showDiscountInput.value = false;
    discountReason.value = '';
  })
  .catch(error => {
    console.error("Error al guardar descuento:", error);
    alert("Hubo un problema al aplicar el descuento.");
  });
}

</script>

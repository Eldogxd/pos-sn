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
  <div class="relative w-full h-[90vh] md:max-w-4xl mx-2 md:mx-4 bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">

    <!-- Botón Imprimir -->
    <button v-if="selectedTable?.active_order && orderType === 'mesa' && !isOrderClosed"
      @click="generateKitchenCommand"
      class="absolute flex items-center justify-center w-10 h-10 text-white bg-transparent rounded-lg top-3 right-12"
      aria-label="Imprimir">
      <i class="text-lg pi pi-print"></i>
    </button>

    <!-- Botón Cerrar -->
    <button @click="closeModal"
            class="absolute text-white transition top-3 right-3 hover:text-red-600"
            aria-label="Cerrar">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none"
           viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Header -->
    <div class="p-4 text-white bg-mantis-400"
         :class="{
           'bg-mantis-400': orderType !== 'pedidosya',
           'bg-red-500': orderType === 'pedidosya'
         }">
      <h2 class="text-xl font-bold md:text-2xl">
        {{ orderType }} {{ selectedTable?.number }}
      </h2>
      <div v-if="orderType === 'mesa'" class="mt-3">
        <label class="block mb-1 text-sm font-medium text-white">Nombre del Cliente</label>
        <input v-model="customerName" type="text"
               class="w-full p-2 text-white placeholder-white bg-white border border-white rounded-lg bg-opacity-20 focus:ring-2 focus:ring-white"
               placeholder="Ingrese nombre">
      </div>
      <div v-if="orderType === 'llevar' || orderType === 'pedidosya'" class="grid grid-cols-2 gap-3 mt-2">
      <div>
        <label class="block mb-1 text-sm font-medium text-white">Nombre del Cliente</label>
        <input v-model="fiscal_name" type="text" class="w-full p-2 text-white placeholder-white bg-white border border-white rounded-lg bg-opacity-20 focus:ring-2 focus:ring-white" />
      </div>
      <div>
        <label class="block mb-1 text-sm font-medium text-white">Número RUC</label>
        <input v-model="fiscal_ruc" type="text" class="w-full p-2 text-white placeholder-white bg-white border border-white rounded-lg bg-opacity-20 focus:ring-2 focus:ring-white" />
      </div>
    </div>
      
      <div v-if="orderType === 'pedidosya'" class="mt-3">
        <label class="block mb-1 text-sm font-medium text-white">Numero de Pedido</label>
        <input v-model="externalNumber" type="text"
               class="w-1/3 p-2 text-white placeholder-white bg-white border border-white rounded-lg bg-opacity-20 focus:ring-2 focus:ring-white"
               placeholder="Ingrese numero de pedido"
               required>
      </div>

    </div>

    <!-- Contenido principal -->
    <div class="flex flex-col flex-1 overflow-hidden md:flex-row md:gap-4">

      <!-- Productos disponibles (más compacto en móvil) -->
      <div v-if="orderType === 'mesa' || orderType === 'llevar'" class="w-full md:w-1/2 p-2 md:p-4 overflow-y-auto border-b md:border-b-0 md:border-r flex-1 max-h-[25vh] md:max-h-full">
        <div v-for="(items, category) in groupedProducts" :key="category" class="mb-4 md:mb-6">
          <h4 class="mb-2 font-bold text-gray-700 text-md">{{ category }}</h4>
          <div class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2">
            <div v-for="product in items" :key="product.id"
                 @click="addProduct(product)"
                 class="p-2 transition-colors border rounded-lg cursor-pointer md:p-3 hover:bg-blue-50">
              <div class="flex items-start">
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-800 md:text-base">{{ product.name }}</p>
                  <p class="text-xs text-gray-500 md:text-sm">C${{ product.price }}</p>
                </div>
                <div class="p-1 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="orderType === 'pedidosya'" class="w-full md:w-1/2 p-2 md:p-4 overflow-y-auto bg-gray-50 flex-1 max-h-[40vh] md:max-h-full">
  <div v-for="(items, category) in pedidosYaProducts" :key="category" class="mb-4 md:mb-6">
    <h4 class="mb-2 font-bold text-gray-700 text-md">{{ category }}</h4>
    <div class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2">
      <div v-for="product in items" :key="product.id"
           @click="addProduct(product)"
           class="p-2 transition-colors border rounded-lg cursor-pointer md:p-3 hover:bg-blue-50">
        <div class="flex items-start">
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-800 md:text-base">{{ product.name }}</p>
            <p class="text-xs text-gray-500 md:text-sm">C${{ product.py_price }}</p> <!-- 🔹 precio PY -->
          </div>
          <div class="p-1 text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


      <!-- Productos seleccionados / "Tu Orden" (más grande en móvil) -->
      <div v-if="orderType === 'mesa' || orderType === 'llevar'" class="w-full md:w-1/2 p-2 md:p-4 overflow-y-auto bg-gray-50 flex-1 max-h-[40vh] md:max-h-full">
        <h3 class="mb-2 text-lg font-semibold text-gray-800">Tu Orden</h3>

        <div v-if="selectedProducts.length === 0" class="py-6 text-sm text-center text-gray-400">
          <p>Agrega productos a la orden</p>
        </div>

        <div v-else class="space-y-2 md:space-y-3">
          <div
            v-for="p in selectedProducts"
            :key="p.id"
            :class="[
              'flex flex-wrap items-center justify-between p-2 md:p-3 rounded-lg shadow-sm bg-white',
              p.payment_status === 'paid' ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : ''
            ]"
          >
            <div class="flex-1 min-w-[50%]">
              <p class="text-sm font-light md:text-base">{{ p.name }}</p>
              <p class="text-xs text-gray-500 md:text-sm">C${{ p.price }} c/u</p>
              <p v-if="p.payment_status === 'paid'" class="text-xs text-red-500 md:text-sm">Pagado</p>
            </div>

            <div v-if="p.payment_status !== 'paid'" class="flex items-center gap-1 my-2 md:my-0">
              <!-- minus -->
              <button @click.stop="decreaseQuantity(p.id)" class="text-gray-500 hover:text-blue-600" aria-label="Disminuir">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
                </svg>
              </button>

              <span class="w-6 text-sm text-center">{{ p.quantity }}</span>

              <!-- plus -->
              <button @click.stop="increaseQuantity(p.id)" class="text-gray-500 hover:text-blue-600" aria-label="Aumentar">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
              </button>

              <!-- borrar -->
              <button @click.stop="removeProduct(p.id)" class="p-1 text-red-500 hover:text-red-600" aria-label="Eliminar">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>

            <div class="w-20 text-sm font-medium text-right md:text-base">
              C${{ (p.price * p.quantity).toFixed(2) }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="orderType === 'pedidosya'" class="w-full md:w-1/2 p-2 md:p-4 overflow-y-auto bg-gray-50 flex-1 max-h-[40vh] md:max-h-full">
        <h3 class="mb-2 text-lg font-semibold text-gray-800">Tu Orden</h3>

        <div v-if="selectedProducts.length === 0" class="py-6 text-sm text-center text-gray-400">
          <p>Agrega productos a la orden</p>
        </div>

        <div v-else class="space-y-2 md:space-y-3">
          <div
            v-for="p in selectedProducts"
            :key="p.id"
            :class="[
              'flex flex-wrap items-center justify-between p-2 md:p-3 rounded-lg shadow-sm bg-white',
              p.payment_status === 'paid' ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : ''
            ]"
          >
            <div class="flex-1 min-w-[50%]">
              <p class="text-sm font-light md:text-base">{{ p.name }}</p>
              <p class="text-xs text-gray-500 md:text-sm">C${{ p.py_price }} c/u</p>
              <p v-if="p.payment_status === 'paid'" class="text-xs text-red-500 md:text-sm">Pagado</p>
            </div>

            <div v-if="p.payment_status !== 'paid'" class="flex items-center gap-1 my-2 md:my-0">
              <!-- minus -->
              <button @click.stop="decreaseQuantity(p.id)" class="text-gray-500 hover:text-blue-600" aria-label="Disminuir">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
                </svg>
              </button>

              <span class="w-6 text-sm text-center">{{ p.quantity }}</span>

              <!-- plus -->
              <button @click.stop="increaseQuantity(p.id)" class="text-gray-500 hover:text-blue-600" aria-label="Aumentar">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
              </button>

              <!-- borrar -->
              <button @click.stop="removeProduct(p.id)" class="p-1 text-red-500 hover:text-red-600" aria-label="Eliminar">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>

            <div class="w-20 text-sm font-medium text-right md:text-base">
              C${{ (p.py_price * p.quantity).toFixed(2) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Indicaciones (compacto en móvil) -->
    <div class="p-1 md:p-2 border-t border-gray-200 max-h-[10vh] md:max-h-full overflow-y-auto">
      <label class="block mb-1 text-sm font-medium text-gray-700">Indicaciones Especiales</label>
      <textarea v-model="indications"
                class="w-full p-1 border border-gray-300 rounded-lg md:p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="2">
      </textarea>
    </div>

      <!-- Checkbox y descuento -->
    <div v-if="orderType === 'llevar' " class="p-3 mt-2 border-t">
      <div class="flex items-center gap-2">
        <input type="checkbox" v-model="toggleTakeAwayDiscount" class="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-400" />
        <label class="text-sm font-medium text-gray-700 select-none">Aplicar descuento</label>
      </div>

      <div v-if="toggleTakeAwayDiscount" class="p-3 mt-3 space-y-2 border rounded-lg bg-orange-50">
        <div class="flex items-center gap-2">
          <label class="w-32 text-sm font-medium text-gray-700">Tipo de Descuento</label>
          <select v-model="takeAwayDiscountType" class="flex-1 px-2 py-1 text-sm border rounded-md">
            <option value="amount">Monto fijo</option>
            <option value="percent">Porcentaje (%)</option>
          </select>
        </div>
        <div class="flex items-center gap-2">
          <label class="w-32 text-sm font-medium text-gray-700">Monto / %</label>
          <input v-model.number="takeAwayDiscountValue" type="number" min="0" step="0.01" class="flex-1 px-2 py-1 text-sm border rounded-md" placeholder="Ej: 10.00" />
        </div>
        <div class="flex items-center gap-2">
          <label class="w-32 text-sm font-medium text-gray-700">Razón</label>
          <input v-model="takeAwayDiscountReason" type="text" class="flex-1 px-2 py-1 text-sm border rounded-md" placeholder="Ej: Cliente frecuente" />
        </div>
        <button @click="applyDiscountTakeAway" class="px-3 py-1 mt-1 text-sm text-white bg-green-400 rounded hover:bg-green-500">Aplicar</button>
      </div>
    </div>

    <div v-if="orderType === 'pedidosya' " class="p-3 mt-2 border-t">
      <div class="flex items-center gap-2">
        <input type="checkbox" v-model="togglePedidosYaDiscount" class="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-400" />
        <label class="text-sm font-medium text-gray-700 select-none">Aplicar descuento</label>
      </div>

      <div v-if="togglePedidosYaDiscount" class="p-3 mt-3 space-y-2 border rounded-lg bg-orange-50">
        <div class="flex items-center gap-2">
          <label class="w-32 text-sm font-medium text-gray-700">Tipo de Descuento</label>
          <select v-model="pedidosYaDiscountType" class="flex-1 px-2 py-1 text-sm border rounded-md">
            <option value="amount">Monto fijo</option>
            <option value="percent">Porcentaje (%)</option>
          </select>
        </div>
        <div class="flex items-center gap-2">
          <label class="w-32 text-sm font-medium text-gray-700">Monto / %</label>
          <input v-model.number="pedidosYaDiscountValue" type="number" min="0" step="0.01" class="flex-1 px-2 py-1 text-sm border rounded-md" placeholder="Ej: 10.00" />
        </div>
        <div class="flex items-center gap-2">
          <label class="w-32 text-sm font-medium text-gray-700">Razón</label>
          <input v-model="pedidosYaDiscountReason" type="text" class="flex-1 px-2 py-1 text-sm border rounded-md" placeholder="Ej: Cliente frecuente" />
        </div>
        <button @click="applyDiscountPedidosYa" class="px-3 py-1 mt-1 text-sm text-white bg-green-400 rounded hover:bg-green-500">Aplicar</button>
      </div>
    </div>

    <!-- Footer: Totales + Acciones -->
    <div class="flex flex-col gap-2 p-2 bg-white border-t md:p-4 md:flex-row md:justify-between md:items-center">
      <!-- Totales (con/ sin descuento) -->
      <div v-if="orderType === 'mesa'" class="text-right space-y-1 md:min-w-[260px]">
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
            Total Final: C$ {{ (calculateOrderTotal() - (selectedTable?.active_order?.calculated_discount || 0)).toFixed(2) }}
          </p>
        </div>
        <div v-else class="text-xl font-bold text-blue-800">
          Total: C$ {{ total }}
        </div>
      </div>
      
      <div v-if="orderType === 'llevar'" class="text-right space-y-1 md:min-w-[260px]">
        <div class="space-y-1 text-sm">
          <p class="text-xl font-bold text-gray-600">Subtotal: C$ {{ takeAwayTotal.toFixed(2) }}</p>
        </div>
        <div v-if="appliedTakeAwayDiscount" class="text-xl font-bold text-blue-800">
          Total: C$ {{ takeAwayTotalWithDiscount.toFixed(2) }}
        </div>
      </div>

       <div v-if="orderType === 'pedidosya'" class="text-right space-y-1 md:min-w-[260px]">
        <div class="space-y-1 text-sm">
          <p class="text-xl font-bold text-gray-600">Subtotal: C$ {{ pedidosYaTotal.toFixed(2) }}</p>
        </div>
        <div v-if="appliedPedidosYaDiscount" class="text-xl font-bold text-blue-800">
          Total: C$ {{ pedidosYaDiscount.toFixed(2) }}
        </div>
      </div>


      


      <!-- Botones -->
      <div class="flex flex-col gap-2 md:flex-row">
        <button v-if="selectedTable?.active_order && orderType === 'mesa' && !isOrderClosed"
          @click="openDiscountModal"
          class="px-5 py-3 text-sm font-medium text-white bg-orange-400 rounded-lg hover:bg-orange-500">
          Aplicar Descuento
        </button>
        <button v-if="selectedTable?.active_order && orderType === 'mesa' && !isOrderClosed"
          @click="showModalcuenta = true"
          class="px-5 py-3 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600">
          Opciones de Cuenta
        </button>
         <button v-if="orderType === 'mesa' " @click="submitOrder"
                class="px-4 py-2 text-white border rounded-lg"
                :class="{
                  'border-green-600 bg-green-500 hover:bg-green-600': !editingOrderId,
                  'border-mantis-600 bg-mantis-500 hover:bg-mantis-600': editingOrderId
                }">
          {{ editingOrderId ? 'Actualizar Orden' : 'Crear Orden' }}
        </button> 
        
        <button v-if="orderType === 'llevar'" @click="submitTakeawayOrder"
                class="px-4 py-2 text-white bg-green-500 border border-green-600 rounded-lg hover:bg-green-600">
                Crear Orden

        </button>

        <button v-if="orderType === 'pedidosya'" @click="submitPedidosYaOrder"
                class="px-4 py-2 text-white bg-green-500 border border-green-600 rounded-lg hover:bg-green-600">
                Crear Orden

        </button>

      </div>
    </div>

  </div>
</div>








         <!-- Modal para factura parcial -->
<div v-if="showPartialInvoiceModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <div class="w-full max-w-3xl mx-4 overflow-hidden bg-white shadow-lg rounded-xl max-h-[90vh] overflow-y-auto">
    
    <!-- Cabecera -->
    <div class="p-4 text-white bg-blue-500">
      <h2 class="text-xl font-bold">Factura Parcial</h2>
    </div>

    <!-- Campos cliente -->
    <div class="grid grid-cols-2 gap-3 p-3">
      <div>
        <label class="block mb-1 text-xs font-medium text-gray-700">Nombre del Cliente</label>
        <input v-model="fiscal_name" type="text" class="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label class="block mb-1 text-xs font-medium text-gray-700">Número RUC</label>
        <input v-model="fiscal_ruc" type="text" class="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
    </div>

    <!-- Tabla de productos -->
    <div class="p-3">
      <p class="mb-2 text-sm text-gray-600">Selecciona cuánto pagar de cada producto:</p>
      <table class="min-w-full text-sm divide-y divide-gray-200">
        <thead>
          <tr>
            <th class="px-2 py-1 text-left">Producto</th>
            <th class="px-2 py-1 text-center">Cant.</th>
            <th class="px-2 py-1 text-right">Pagar Cant.</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="item in selectedItemsForPartial" :key="item.id">
            <td class="px-2 py-1">{{ item.name }}</td>
            <td class="px-2 py-1 text-center">{{ item.quantity }}</td>
            <td class="px-2 py-1 text-right">
              <input type="number" min="0" :max="item.quantity" v-model.number="item.payQuantity" class="w-16 p-1 text-sm border rounded" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Checkbox y descuento -->
    <div class="p-3 mt-2 border-t">
      <div class="flex items-center gap-2">
        <input type="checkbox" v-model="togglePartialDiscount" class="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-400" />
        <label class="text-sm font-medium text-gray-700 select-none">Aplicar descuento</label>
      </div>

      <div v-if="togglePartialDiscount" class="p-3 mt-3 space-y-2 border rounded-lg bg-orange-50">
        <div class="flex items-center gap-2">
          <label class="w-32 text-sm font-medium text-gray-700">Tipo de Descuento</label>
          <select v-model="partialDiscountType" class="flex-1 px-2 py-1 text-sm border rounded-md">
            <option value="amount">Monto fijo</option>
            <option value="percent">Porcentaje (%)</option>
          </select>
        </div>
        <div class="flex items-center gap-2">
          <label class="w-32 text-sm font-medium text-gray-700">Monto / %</label>
          <input v-model.number="partialDiscountValue" type="number" min="0" step="0.01" class="flex-1 px-2 py-1 text-sm border rounded-md" placeholder="Ej: 10.00" />
        </div>
        <div class="flex items-center gap-2">
          <label class="w-32 text-sm font-medium text-gray-700">Razón</label>
          <input v-model="partialDiscountReason" type="text" class="flex-1 px-2 py-1 text-sm border rounded-md" placeholder="Ej: Cliente frecuente" />
        </div>
        <button @click="applyPartialDiscount" class="px-3 py-1 mt-1 text-sm text-white bg-green-400 rounded hover:bg-green-500">Aplicar</button>
      </div>
    </div>

    <!-- Totales -->
    <div class="p-3 mt-2 space-y-1 border-t">
      <p class="text-sm font-bold text-right">Subtotal: C${{ partialTotal.toFixed(2) }}</p>
      <p v-if="appliedPartialDiscount" class="text-sm font-bold text-right text-green-600">
        Total con Descuento: C${{ partialTotalWithDiscount.toFixed(2) }}
      </p>
    </div>

    <!-- Acciones -->
    <div class="flex justify-end gap-2 p-3 border-t">
      <button @click="showPartialInvoiceModal = false" class="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200">Cancelar</button>
      <button @click="generatePartialInvoice" class="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700">Imprimir Factura Parcial</button>
    </div>

  </div>
</div>


<!-- Modal para precio manual -->
<div v-if="showCustomModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <div class="w-11/12 p-6 mx-auto bg-white rounded-lg shadow-xl md:w-1/3">
    <h3 class="text-lg font-bold">Precio Manual</h3>
    <p class="mt-1 text-sm text-gray-600">Producto: <strong>{{ selectedProduct?.name }}</strong></p>

    <label class="block mt-4 mb-2 text-sm font-medium">Precio (C$)</label>
    <input
      id="custom-price-input"
      v-model="customPrice"
      type="number"
      step="0.01"
      class="w-full p-2 border border-gray-300 rounded"
      placeholder="0.00"
      @keyup.enter="addWithCustomPrice"
    />

    <div class="flex justify-end gap-2 mt-6">
      <button
        @click="showCustomModal = false"
        class="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
      >
        Cancelar
      </button>
      <button
        @click="addWithCustomPrice"
        class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Agregar
      </button>
    </div>
  </div>
</div>

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


<!--Modal tranferencia de mesa-->
  <div v-if="showTransferModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
      <h3 class="mb-4 text-lg font-semibold">Transferir Orden</h3>
      <p class="mb-2">Seleccione la mesa a la que desea transferir la orden:</p>

      <select v-model="selectedTableToTransfer" class="w-full px-3 py-2 mb-4 border rounded-md">
        <option disabled value="">-- Seleccione mesa --</option>
        <option
          v-for="table in tables"
          :key="table.number"
          :value="table.number"
          :disabled="table.number === selectedTable?.number"
        >
          Mesa {{ table.number }}
        </option>
      </select>

      <div class="flex justify-end gap-3">
        <button @click="closeTransferModal" class="px-4 py-2 text-sm text-gray-600 hover:underline">Cancelar</button>
        <button
          @click="transferTable"
          :disabled="!selectedTableToTransfer"
          class="px-4 py-2 text-sm text-white bg-green-600 rounded hover:bg-green-700"
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>

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

       <!-- Transferir Orden -->
  <button v-if="selectedTable?.active_order && orderType === 'mesa' && !isOrderClosed"
          @click="openTransferOrderModal"
          class="w-full px-5 py-3 text-sm font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600">
    Transferir Orden
  </button>

      <!-- Cerrar Cuenta -->
      <button v-if="selectedTable?.active_order && orderType === 'mesa' && !isOrderClosed"
              @click="confirmCloseOrder(selectedTable.active_order.id); "
              class="w-full px-5 py-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">
        Cerrar Cuenta
      </button>
    </div>
  </div>
</div>

    </div>
  </AppLayout>
  <Toast />
  <ConfirmDialog group="pos" />
 
</template>


<script setup>
import NavCashier from '@/Layouts/NavCashier.vue'
import { ref, computed, watch } from 'vue'
import AppLayout from '@/Layouts/AppLayout.vue'
import { router } from '@inertiajs/vue3'
import { usePage } from '@inertiajs/vue3'
import { route } from 'ziggy-js';
import axios from 'axios';
import Swal from 'sweetalert2';
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import Button from 'primevue/button';



const toast = useToast();
const confirm = useConfirm();

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
const externalNumber = ref('');
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
const showTransferModal = ref(false)
const selectedTableToTransfer = ref(null)
const showCustomModal = ref(false);
const customPrice = ref(0);
const selectedProduct = ref(null);
const togglePartialDiscount = ref(false);
const partialDiscountType = ref(''); // 'amount' o 'percent'
const partialDiscountValue = ref(0);
const partialDiscountReason = ref('');
const appliedPartialDiscount = ref(null);
const toggleTakeAwayDiscount = ref(false);
const takeAwayDiscountType = ref(''); // 'amount' o 'percent'
const takeAwayDiscountValue = ref(0);
const takeAwayDiscountReason = ref('');
const appliedTakeAwayDiscount = ref(null);
const togglePedidosYaDiscount = ref(false);
const pedidosYaDiscountType = ref(''); // 'amount' o 'percent'
const pedidosYaDiscountValue = ref(0);
const pedidosYaDiscountReason = ref('');
const appliedPedidosYaDiscount = ref(null);
const partialTotal = computed(() => {
  return selectedItemsForPartial.value.reduce((sum, p) => {
    const price = parseFloat(p.price) || 0;
    const qty = parseFloat(p.payQuantity) || 0;
    return sum + (price * qty);
  }, 0);
});
const takeAwayTotal = computed(() => {
  return selectedProducts.value.reduce((sum, p) => {
    if (p.payment_status !== 'paid') {
      return sum + (p.price * p.quantity);
    }
    return sum;
  }, 0);
});
const pedidosYaTotal = computed(() => {
  return selectedProducts.value.reduce((sum, p) => {
    if (p.payment_status !== 'paid') {
      return sum + (p.py_price * p.quantity);
    }
    return sum;
  }, 0);
});



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
        id: item.product.id,
        order_item_id: item.id,
        product_id: item.product.id,
        name: item.product.name,
        price: item.price,
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
  fiscal_name.value = ''
  fiscal_ruc.value = ''
  indications.value = ''
  selectedProducts.value = []
  showModal.value = true
}

//modal para pedidos ya
function openPedidosYaModal() {
  selectedTable.value = null
  orderType.value = 'pedidosya'
  fiscal_name.value = ''
  fiscal_ruc.value = ''
  externalNumber.value = ''
  indications.value = ''
  selectedProducts.value = []
  showModal.value = true
}

//verifica si la orden esta cerrada
const isOrderClosed = computed(() => {
  return selectedTable.value?.active_order?.status === 'cerrada'
})

// Agrupamos productos por categoría
const groupedProducts = computed(() => {
  return props.products.reduce((groups, product) => {
    const category = product.category || 'Sin categoría'
    if (!groups[category]) groups[category] = []
    groups[category].push(product)
    return groups
  }, {})
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
  // Si es un producto genérico (precio manual)
  if (product.is_generic) {
    openCustomPriceModal(product);
  } else {
    // Lógica normal para productos con precio fijo
    const existingPending = selectedProducts.value.find(
      p => p.id === product.id && p.payment_status !== 'paid'
    );

    if (existingPending) {
      existingPending.quantity++;
    } else {
      selectedProducts.value.push({
        ...product,
        quantity: 1,
        payment_status: 'pending'
      });
    }
  }
};


//quitar producto
const removeProduct = (productId) => {
  selectedProducts.value = selectedProducts.value.filter(p => p.id !== productId);
};

//creacion de ordenes
function submitOrder() {
  if (selectedTable.value?.active_order) {
    

    router.put(route('orders.update', selectedTable.value.active_order.id), {
      table_id: selectedTable.value.id,
      customer_name: customerName.value,
      indications: indications.value,
      products: selectedProducts.value
        .filter(p => p.payment_status !== 'paid')
        .map(p => ({
          id: p.id,
          quantity: p.quantity,
          price: p.price,
          payment_status: p.payment_status || 'pending',
        })),

    }, {
      preserveState: true, 
      onSuccess: () => {
        closeModal();
        
        confirm.require({
          group: 'pos',
          message: '¿Desea imprimir la comanda?',
          header: 'Imprimir Comanda',
          icon: 'pi pi-print',
          acceptLabel: 'Sí',
          rejectLabel: 'No',
          accept: () => {
            generateKitchenCommand();
          },
          reject: () => {
            toast.add({
              severity: 'info',
              summary: 'Comanda no impresa',
              detail: 'La comanda no se imprimió.',
              life: 3000
            });
          }
        });

        
      },
      onError: (errors) => {
        console.error("Errores al actualizar:", errors);
        toast.add({
          severity: 'error',
          summary: 'Error al actualizar la orden',
          detail: 'Hubo un error al actualizar la orden. Revisa la consola.',
          life: 3000
        });
        //alert("Hubo un error al actualizar la orden. Revisa la consola.");
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
        price: p.price,
      })),

    
      

    }, {
      preserveState: true, // Mantiene el estado
      onSuccess: () => {
        closeModal();
        generateKitchenCommand();
        recargarPaginaDespuesDeUnSegundo();
       
      },
      onError: (errors) => {
        console.error("Errores al crear:", errors);
        toast.add({
          severity: 'error',
          summary: 'Error al crear la orden',
          detail: 'Hubo un error al crear la orden. Revisa la consola.',
          life: 3000
        });
        //alert("Hubo un error al crear la orden.");
      }
    });
  }
}

//creacion de ordenes llevar
function submitTakeawayOrder() {
  if (selectedProducts.value.length === 0) {
    toast.add({
      severity: 'warn',
      summary: 'No hay productos',
      detail: 'Agrega al menos un producto para crear la orden.',
      life: 3000
    });
    return;
  }

  router.post(route('orders.storeTakeAway'), {
    type: orderType.value,
    customer_name: fiscal_name.value,
    fiscal_ruc: fiscal_ruc.value,
    indications: indications.value,
    externalNumber: externalNumber.value,
    discount_type: toggleTakeAwayDiscount.value ? takeAwayDiscountType.value : null,
    discount_value: toggleTakeAwayDiscount.value ? takeAwayDiscountValue.value : null,
    discount_reason: toggleTakeAwayDiscount.value ? takeAwayDiscountReason.value : null,
    products: selectedProducts.value.map(p => ({
      id: p.id,
      quantity: p.quantity,
      price: p.price,
    })),
  }, {
    
    onSuccess: (page) => {
      const orderId = page.props.flash?.order_id || null;
      generateKitchenCommand();
      
      // Crear la factura y luego preguntar si se imprime
      createAndPrintTakeawayInvoice(orderId);

      toast.add({
        severity: 'success',
        summary: 'Orden creada',
        detail: 'La orden de llevar se ha creado exitosamente.',
        life: 8000
      });
    },
    onError: (errors) => {
      console.error("Errores al crear:", errors);
      toast.add({
        severity: 'error',
        summary: 'Error al crear la orden',
        detail: 'Hubo un error al crear la orden. Revisa la consola.',
        life: 3000
      });
    }
  });
}

//creacion de ordenes pedidosya
function submitPedidosYaOrder(){
  if (selectedProducts.value.length === 0) {
    toast.add({
      severity: 'warn',
      summary: 'No hay productos',
      detail: 'Agrega al menos un producto para crear la orden.',
      life: 3000
    });
    return;
  }

  router.post(route('orders.storePedidosYa'), {
    type: orderType.value,
    customer_name: fiscal_name.value,
    fiscal_ruc: fiscal_ruc.value,
    external_number: externalNumber.value,
    indications: indications.value,
    discount_type: togglePedidosYaDiscount.value ? pedidosYaDiscountType.value : null,
    discount_value: togglePedidosYaDiscount.value ? pedidosYaDiscountValue.value : null,
    discount_reason: togglePedidosYaDiscount.value ? pedidosYaDiscountReason.value : null,
    products: selectedProducts.value.map(p => ({
      id: p.id,
      quantity: p.quantity,
      price: p.py_price,
    })),
  }, {
     
    onSuccess: (page) => {
      const orderId = page.props.flash?.order_id || null;
      closeModal();
      //console.log('Orden de PedidosYa creada exitosamente.');
      
      confirm.require({
        group: 'pos',
        message: '¿Desea generar la factura de PedidosYa?',
        header: 'Factura PedidosYa',
        icon: 'pi pi-receipt',
        acceptLabel: 'Sí',
        rejectLabel: 'No',
        accept: () => {
          (orderId);
          generatePedidosYaInvoice(orderId);
          closeModal(); // Aquí se abre window.open
        },
        reject: () => {
          toast.add({
            severity: 'info',
            summary: 'Factura no generada',
            detail: 'La factura de PedidosYa no se imprimió.',
            life: 3000
          });
        }
      });

    },
    onError: (errors) => {
      console.error("Errores al crear:", errors);
      toast.add({
        severity: 'error',
        summary: 'Error al crear la orden',
        detail: 'Hubo un error al crear la orden. Revisa la consola.',
        life: 3000
      });
      //alert("Hubo un error al crear la orden.");
    }
  });
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

 
  // Determinar qué nombre de cliente usar según el tipo de orden
  let nameForCommand = '';
  if (orderType.value === 'mesa') {
    nameForCommand = customerName.value;
  } else if (orderType.value === 'llevar' || orderType.value === 'pedidosya') {
    // Para 'llevar' y 'pedidosya', usamos el nombre fiscal
    nameForCommand = fiscal_name.value;
  }
  

  const commandHTML = `
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Comanda</title>
        <style>
          body {
            width: 57mm;
            font-family: Arial, sans-serif;
            font-size: 20px;
            margin: 0 auto;
            padding: 4px;
            line-height: 1.2;
          }
          .center { text-align: center; }
          .bold { font-weight: bold; }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 20px;
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
        <div class="center bold">COMANDA</div>
        

        <hr class="space">

        <p><strong>Fecha:</strong> ${date}</p>
        <p><strong>Tipo:</strong> ${tipoOrdenTexto}</p>
        
        <!-- Usamos la nueva variable que contiene el nombre correcto -->
        ${nameForCommand ? `<p><strong>Cliente:</strong> ${nameForCommand}</p>` : ''}

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
      <div style="margin-top: 50px;">.</div>
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

  const pendingItems = selectedProducts.value.filter(p => p.payment_status !== 'paid');
  if (!pendingItems.length) {
    //alert('No hay productos pendientes de pago.');
    toast.add({
      severity: 'warn',
      summary: 'No hay productos pendientes',
      detail: 'No hay productos pendientes de pago para generar la factura.',
      life: 3000
    });
    return '';
  }

  const tipoOrdenTexto = orderType.value === 'mesa' 
    ? `Mesa ${selectedTable.value?.number ?? '-'}` 
    : ucfirst(orderType.value);

  // Tomar los datos de descuento de la orden activa
  const discountType = selectedTable.value?.active_order?.discount_type;
  const discountValue = selectedTable.value?.active_order?.discount_value;
  const calculatedDiscount = selectedTable.value?.active_order?.calculated_discount || 0;

  const subtotal = orderTotal.value;
  const totalFinal = subtotal - calculatedDiscount;

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
            max-width: 50%;
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
          <img src="/images/SopasLogo.png" alt="Logo" />
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
            ${pendingItems.map(p => `
              <tr>
                <td>${p.quantity}</td>
                <td>${p.name}</td>
                <td>C$${(p.price * p.quantity).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="total">Subtotal: C$${subtotal}</div>

        ${discountType ? `
          <div class="total">
            Descuento (${discountType === 'percent' ? discountValue + '%' : 'C$' + parseFloat(discountValue).toFixed(2)}):
            -C$${calculatedDiscount.toFixed(2)}
          </div>
          <div class="total">Total Final: C$${totalFinal}</div>
        ` : `
          <div class="total">Total: C$${subtotal}</div>
        `}

        <div class="footer space">
          <strong>¡Gracias por tu visita!</strong>
        </div>
        <div style="margin-top: 50px;">.</div>

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
    //alert('No se pudo obtener el número de factura.');
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo obtener el número de factura.',
      life: 3000
    });
  }
}

//abrir modal de factura parcial
async function openPartialInvoiceModal() {
  if (!selectedProducts.value.length) {
    //alert('No hay productos en la orden.');
    toast.add({
      severity: 'warn',
      summary: 'No hay productos',
      detail: 'No hay productos en la orden para generar una factura parcial.',
      life: 3000
    });

    return;
  }

  const pendingItems = selectedProducts.value.filter(p => p.payment_status !== 'paid');
  
  if (!pendingItems.length) {
    //alert('No hay productos pendientes de pago.');
    toast.add({
      severity: 'warn',
      summary: 'No hay productos pendientes',
      detail: 'No hay productos pendientes de pago.',
      life: 3000
    });
    return;
  }

selectedItemsForPartial.value = pendingItems.map(p => ({
  id: p.order_item_id,
  name: p.name,
  price: p.price,        
  quantity: p.quantity,
  payment_status: p.payment_status,
  payQuantity: 0

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
  const selectedForPayment = selectedItemsForPartial.value
    .filter(p => (Number(p.payQuantity) || 0) > 0);

  if (!selectedForPayment.length) {
    alert('Debes seleccionar al menos un producto con cantidad mayor a 0');
    return;
  }

  // Subtotal consistente
  const subtotal = selectedForPayment.reduce((sum, p) => {
    const price = Number(p.price) || 0;
    const qty = Number(p.payQuantity) || 0;
    return sum + price * qty;
  }, 0);

  // Preparar descuento
  const hasToggled = !!togglePartialDiscount.value;
  const rawVal = Number(partialDiscountValue.value) || 0;
  const discount = (hasToggled && rawVal > 0)
    ? {
        type: partialDiscountType.value, // 'amount' o 'percent'
        value: rawVal,
        reason: partialDiscountReason.value || ''
      }
    : null;

  // Calcular descuento
  let discountAmount = 0;
  if (discount) {
    if (discount.type === 'percent') {
      const pct = Math.min(Math.max(discount.value, 0), 100);
      discountAmount = +(subtotal * (pct / 100)).toFixed(2);
    } else {
      discountAmount = +Math.min(Math.max(discount.value, 0), subtotal).toFixed(2);
    }
  }

  const total = +(subtotal - discountAmount).toFixed(2);

  // Datos para backend
  const items = selectedForPayment.map(item => ({
    order_item_id: item.id,
    pay_quantity: Number(item.payQuantity) || 0
  }));

  const dataToSend = {
    invoice_number: nextInvoiceNumber.value,
    fiscal_name: fiscal_name.value,
    fiscal_ruc: fiscal_ruc.value,
    subtotal: subtotal.toFixed(2),
    discount_type: discount ? discount.type : null,
    discount_value: discount ? discount.value : null,
    discount_reason: discount ? discount.reason : null,
    discount_amount: discountAmount.toFixed(2),
    total: total.toFixed(2),
    order_id: selectedTable.value?.active_order?.id || null,
    items
  };

  try {
    const response = await axios.post('/partial-invoices', dataToSend);
    console.log('Parcial guardada:', response.data);

    // Generar HTML e imprimir
    const partialInvoiceHTML = getPartialInvoiceHTML(selectedForPayment, discount);
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(partialInvoiceHTML);
    printWindow.document.close();
    recargarPaginaDespuesDeUnSegundo();
  } catch (error) {
    console.error('Error al generar la factura parcial:', error);
    toast.add({
      severity: 'error',
      summary: 'Error al generar factura parcial',
      detail: 'Hubo un error al generar la factura parcial. Revisa la consola.',
      life: 3000
    });
    //alert('Error al generar la factura parcial.');
  }
}

//parcial
function getPartialInvoiceHTML(items, discount) {
  const date = new Date().toLocaleString('es-AR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true
  });

  const tipoOrdenTexto = orderType.value === 'mesa'
    ? `Mesa ${selectedTable.value?.number ?? '-'}`
    : ucfirst(orderType.value);

  const productsHTML = items
    .filter(p => p.payment_status !== 'paid') // Solo productos no pagados
    .map(p => {
      const qty = Number(p.payQuantity) || 0;
      const price = Number(p.price) || 0;
      return `
        <tr>
          <td>${qty}</td>
          <td>${p.name}</td>
          <td>C$${(price * qty).toFixed(2)}</td>
        </tr>
      `;
    }).join('');

  const subtotal = items
    .filter(p => p.payment_status !== 'paid') // Solo productos no pagados
    .reduce((sum, p) => {
      const qty = Number(p.payQuantity) || 0;
      const price = Number(p.price) || 0;
      return sum + (price * qty);
    }, 0);

  let discountAmount = 0;
  let discountLabel = '';
  let reason = '';
  if (discount && (discount.type === 'percent' || discount.type === 'amount')) {
    const rawVal = Number(discount.value) || 0;

    if (discount.type === 'percent') {
      const pct = Math.min(Math.max(rawVal, 0), 100);
      discountAmount = +(subtotal * (pct / 100)).toFixed(2);
      discountLabel = `${pct}%`;
    } else {
      const amt = Math.min(Math.max(rawVal, 0), subtotal);
      discountAmount = +amt.toFixed(2);
      discountLabel = `C$${amt.toFixed(2)}`;
    }
    reason = (discount.reason || '').trim();
  }

  const totalFinal = +(subtotal - discountAmount).toFixed(2);
  const hasDiscount = discountAmount > 0;

  return `
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Factura Parcial</title>
        <style>
          body { width: 57mm; font-size: 14px; margin: 0; padding: 4px; font-family: Arial, sans-serif; line-height: 1.2; }
          .center { text-align: center; }
          .bold { font-weight: bold; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; }
          th, td { text-align: left; }
          .total { text-align: right; font-weight: bold; font-size: 14px; margin-top: 10px; }
          .footer { margin-top: 20px; font-size: 16px; text-align: center; color: black; }
          img { max-width: 50%; height: auto; }
          @media print { html, body { width: 57mm; max-height: 300mm; overflow: hidden; margin: 0; padding: 0; } }
        </style>
      </head>
      <body>
        <div class="center">
          <img src="/images/SopasLogo.png" alt="Logo" />
        </div>

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

        <div class="total">Subtotal: C$${subtotal.toFixed(2)}</div>

        ${hasDiscount ? `
          <div class="total">Descuento (${discountLabel}): -C$${discountAmount.toFixed(2)}</div>
          
          <div class="total">Total Final: C$${totalFinal.toFixed(2)}</div>
        ` : `
          <div class="total">Total: C$${subtotal.toFixed(2)}</div>
        `}

        <div class="footer space">
          <strong>¡Gracias por tu visita!</strong>
        </div>

        <div style="margin-top: 50px;">.</div>

        <script>window.onload = () => window.print();<\/script>
      </body>
    </html>
  `;
}

// Crear y potencialmente imprimir factura para llevar
async function createAndPrintTakeawayInvoice(orderId) {
  if (!orderId) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'No se encontró la orden.', life: 3000 });
    return;
  }

  const items = selectedProducts.value;
  const subtotal = items.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  const discount = appliedTakeAwayDiscount.value;

  let discountAmount = 0;
  if (discount && discount.value > 0) {
    if (discount.type === 'percent') {
      discountAmount = subtotal * (discount.value / 100);
    } else {
      discountAmount = Math.min(discount.value, subtotal);
    }
  }
  const total = subtotal - discountAmount;

  if (!nextInvoiceNumber.value) {
    await fetchNextInvoiceNumber();
  }

  const dataToSend = {
    invoice_number: nextInvoiceNumber.value,
    order_id: orderId,
    fiscal_name: fiscal_name.value || null,
    fiscal_ruc: fiscal_ruc.value || null,
    subtotal: subtotal.toFixed(2),
    discount_type: discount ? discount.type : null,
    discount_value: discount ? discount.value : null,
    discount_reason: discount ? discount.reason : null,
    discount_amount: discountAmount.toFixed(2),
    total: total.toFixed(2),
    status: 'created'
  };

  try {
    // 1. Crear la factura en el backend
    await axios.post('/invoices/takeaway', dataToSend);

    // 2. Preguntar si se desea imprimir
    confirm.require({
      group: 'pos',
      message: '¿Desea imprimir la factura de Llevar?',
      header: 'Imprimir Factura',
      icon: 'pi pi-print',
      acceptLabel: 'Sí, Imprimir',
      rejectLabel: 'No',
      accept: () => {
        // 3. Si acepta, solo genera el HTML e imprime
        const invoiceHTML = getTakeawayInvoiceHTML(items, discount, subtotal, discountAmount, total);
        const printWindow = window.open('', '_blank');
        printWindow.document.write(invoiceHTML);
        printWindow.document.close();
        recargarPaginaDespuesDeUnSegundo();
      },
      reject: () => {
        // 4. Si rechaza, solo notifica y recarga
        toast.add({
          severity: 'info',
          summary: 'Factura no impresa',
          detail: 'La factura fue creada en el sistema pero no se imprimió.',
          life: 3000
        });
        recargarPaginaDespuesDeUnSegundo();
      }
    });

  } catch (error) {
    const msg = error.response?.data?.error || error.message;
    toast.add({ severity: 'error', summary: 'Error en Factura', detail: msg, life: 3000 });
    console.error('Error en factura:', error);
  }
}


// HTML para factura para llevar
function getTakeawayInvoiceHTML(items, discount, subtotal, discountAmount, total) {
  const date = new Date().toLocaleString('es-AR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true
  });

  // Etiqueta del descuento (muestra porcentaje o monto)
  let discountLabel = '';
  if (discount) {
    discountLabel = discount.type === 'percent'
      ? `${discount.value}%`                  // valor ingresado por el usuario
      : `C$${discountAmount.toFixed(2)}`;   // monto fijo
  }

  return `
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Factura Para Llevar</title>
        <style>
          body { width: 57mm; font-size: 14px; margin: 0; padding: 4px; font-family: Arial, sans-serif; line-height: 1.2; }
          .center { text-align: center; }
          .bold { font-weight: bold; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; }
          th, td { text-align: left; }
          .total { text-align: right; font-weight: bold; font-size: 14px; margin-top: 10px; }
          .footer { margin-top: 20px; font-size: 16px; text-align: center; color: black; }
          img { max-width: 50%; height: auto; }
          @media print { html, body { width: 57mm; max-height: 300mm; overflow: hidden; margin: 0; padding: 0; } }
        </style>
      </head>
      <body>
        <div class="center">
          <img src="/images/SopasLogo.png" alt="Logo" />
        </div>
        <div class="center space">
          <p class="bold">Sopas Nikas</p>
          <p><strong>Dirección: Del Busto José Martí 2 cuadras al Este, 10 vrs al Norte.</strong></p>
          <p>Teléfono: +505 8352 9705</p>
           
          <p><strong>Factura N°: ${nextInvoiceNumber.value}</strong></p>
          
        </div>
        <hr class="space">
        <p><strong>Fecha:</strong> ${date}</p>
        <p><strong>Tipo:</strong> Para Llevar</p>
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
            ${items.map(p => `
              <tr>
                <td>${p.quantity}</td>
                <td>${p.name}</td>
                <td>C$${(p.price * p.quantity).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="total">Subtotal: C$${subtotal.toFixed(2)}</div>
        ${discount ? `
          <div class="total">Descuento (${discountLabel}): -C$${discountAmount.toFixed(2)}</div>
          <div class="total">Total Final: C$${total.toFixed(2)}</div>
        ` : `
          <div class="total">Total: C$${subtotal.toFixed(2)}</div>
        `}
        <div class="footer space">
          <strong>¡Gracias por tu visita!</strong>
        </div>

        <div style="margin-top: 50px;">.</div>
        <script>window.onload = () => window.print();<\/script>
      </body>
    </html>
  `;
}


function ucfirst(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

//generar factura pedidos
async function generatePedidosYaInvoice(orderId) {
  if (!orderId) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se encontró la orden de PedidosYa.',
      life: 3000
    });
    return;
  }

  // Preparar items con precio PedidosYa
  const items = selectedProducts.value.map(p => ({
    ...p,
    price: p.py_price
  }));

  // Calcular subtotal
  const subtotal = items.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  // Calcular descuento
  const discount = appliedPedidosYaDiscount.value;
  let discountAmount = 0;

if (discount && discount.value > 0) {
  if (discount.type === 'percent') {
    discountAmount = (subtotal * discount.value) / 100; // usa value
  } else {
    discountAmount = Math.min(discount.value, subtotal); // usa value
  }
}

  // Total final
  const total = subtotal - discountAmount;

  // Traer número de factura si no existe
  if (!nextInvoiceNumber.value) {
    await fetchNextInvoiceNumber();
  }

  const dataToSend = {
    invoice_number: nextInvoiceNumber.value,
    order_id: orderId,
    fiscal_name: fiscal_name.value || null,
    fiscal_ruc: fiscal_ruc.value || null,
    external_number: externalNumber.value || null,
    subtotal: subtotal.toFixed(2),
    discount_type: discount?.type || null,
    discount_value: discount?.value || null,  // antes era amount
    discount_reason: discount?.reason || null,
    discount_amount: discountAmount.toFixed(2),
    total: total.toFixed(2)
  };

  try {
    await axios.post('/invoices/pedidosya', dataToSend);

    // Generar el HTML de la factura
    const invoiceHTML = getPedidosYaInvoiceHTML(
      items,
      discount,
      subtotal,
      discountAmount,
      total,
      nextInvoiceNumber.value
    );

    // Abrir ventana de impresión
    const printWindow = window.open('', '_blank');
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();

    recargarPaginaDespuesDeUnSegundo();

  } catch (error) {
    const msg = error.response?.data?.error || error.message;
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: msg,
      life: 3000
    });
    console.error('Error en factura PedidosYa:', error);
  }
}

function getPedidosYaInvoiceHTML(items, discount, subtotal, discountAmount, total, invoiceNumber) {
  const options = {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true
  };
  const date = new Date().toLocaleString('es-MX', options);

  // Construcción de la lista de productos
  const productsHTML = items.map(p => `
    <tr>
      <td>${p.quantity}</td>
      <td>${p.name}</td>
      <td>C$${(p.price * p.quantity).toFixed(2)}</td>
    </tr>
  `).join('');

  // Manejo seguro del descuento
  const hasDiscount = discount && discount.value > 0;   // usa value
  let discountLabel = "";

  if (hasDiscount) {
    discountLabel = discount.type === "percent"
      ? `${discount.value}%`                  // porcentaje ingresado por el usuario
      : `C$${discountAmount.toFixed(2)}`;   // monto fijo calculado
  }

  return `
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Factura PedidosYa</title>
        <style>
          body { width: 57mm; font-size: 14px; margin: 0; padding: 4px; font-family: Arial, sans-serif; line-height: 1.2; }
          .center { text-align: center; }
          .bold { font-weight: bold; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; }
          th, td { text-align: left; }
          .total { text-align: right; font-weight: bold; font-size: 14px; margin-top: 10px; }
          .footer { margin-top: 20px; font-size: 16px; text-align: center; color: black; }
          img { max-width: 50%; height: auto; }
          @media print { html, body { width: 57mm; max-height: 300mm; overflow: hidden; margin: 0; padding: 0; } }
        </style>
      </head>
      <body>
        <div class="center">
          <img src="/images/SopasLogo.png" alt="Logo" />
        </div>

        <div class="center space">
          <p class="bold">Sopas Nikas</p>
          <p><strong>Dirección: Del Busto José Martí 2 cuadras al Este, 10 vrs al Norte.</strong></p>
          <p>Teléfono: +505 8352 9705</p>
           
          <p><strong>Factura N°: ${invoiceNumber}</strong></p>
          
        </div>

        <hr class="space">

        <p><strong>Fecha:</strong> ${date}</p>
        <p><strong>Tipo:</strong> Pedidos Ya</p>
        ${fiscal_name.value ? `<p><strong>Cliente:</strong> ${fiscal_name.value}</p>` : ''}
        ${fiscal_ruc.value ? `<p><strong>RUC:</strong> ${fiscal_ruc.value}</p>` : ''}
        ${externalNumber.value ? `<p><strong>N° Pedido:</strong># ${externalNumber.value}</p>` : ''}

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

        <div class="total">Subtotal: C$${subtotal.toFixed(2)}</div>

        ${hasDiscount ? `
          <div class="total">Descuento (${discountLabel}): -C$${discountAmount.toFixed(2)}</div>
          <div class="total">Total Final: C$${total.toFixed(2)}</div>
        ` : `
          <div class="total">Total: C$${subtotal.toFixed(2)}</div>
        `}

        <div class="footer space">
          <strong>¡Gracias por tu visita!</strong>
        </div>
        <div style="margin-top: 50px;">.</div>

        <script>window.onload = () => window.print();<\/script>
      </body>
    </html>
  `;
}


//cancelar orden
function cancelOrder() {
  confirm.require({
    group: 'pos',
    message: '¿Estás seguro de que deseas cancelar esta orden?',
    header: 'Cancelar Orden',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sí, Cancelar',
    rejectLabel: 'No, Volver',
    accept: () => {
      // Si ya está guardada, mandamos al servidor
      router.post(route('orders.cancel'), {
        order_id: editingOrderId.value,
        table_id: selectedTable.value?.id || null
      }, {
        onSuccess: () => {
          selectedTable.value.active_order.status = 'cancelada';
          closeModal();
          showModalcuenta.value = false;
          toast.add({
            severity: 'success',
            summary: 'Orden Cancelada',
            detail: 'La orden ha sido marcada como cancelada.',
            life: 3000
          });
          //alert('Orden marcada como cancelada.');
        },
        onError: () => {
          toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo cancelar la orden.',
            life: 3000
          });
          //alert('No se pudo cancelar la orden.');
        }
      });
    },
    reject: () => {
      toast.add({
        severity: 'info',
        summary: 'No se canceló',
        detail: 'No se canceló la orden.',
        life: 3000
      });
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

  // Obtener datos de descuento desde la orden activa
  const discountType = selectedTable.value?.active_order?.discount_type;
  const discountValue = selectedTable.value?.active_order?.discount_value;
  const calculatedDiscount = selectedTable.value?.active_order?.calculated_discount || 0;

 let productsHTML = '';
for (const p of items.filter(p => p.payment_status !== 'paid')) {
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
            max-width: 50%;
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
          <img src="/images/SopasLogo.png" alt="Logo" />
        </div>

        <!-- Empresa -->
        <div class="center">
          <p class="bold">Sopas Nikas</p>
          <p><strong>Dirección: Del Busto José Martí 2 cuadras al Este, 10 vrs al Norte.</strong></p>
          <p>Teléfono: +505 8352 9705</p>
           
          <p><strong>Factura N°: ${nextInvoiceNumber.value}</strong></p>
          
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

        ${discountType ? `
          <div class="total">
            Descuento (${discountType === 'amount' ? 'C$' : ''}${discountValue}${discountType === 'percent' ? '%' : ''}): 
            -C$${parseFloat(calculatedDiscount).toFixed(2)}
          </div>
        ` : ''}
        
        <div class="total">
          Total: C$${parseFloat(total).toFixed(2)}
        </div>

        <div class="footer">
          <strong>¡Gracias por tu visita!</strong>
        </div>

        <div style="margin-top: 50px;">.</div>

        <script>
          window.onload = () => window.print();
        <\/script>
      </body>
    </html>
  `;
}

//confirmar cierre de cuenta
function confirmCloseOrder(orderId) {
  confirm.require({
    group: 'pos',
    message: '¿Estás seguro de que deseas cerrar la cuenta?',
    header: 'Cerrar Cuenta',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sí',
    rejectLabel: 'No',
    accept: async () => {
      showModalcuenta.value = false;
      await generateFinalInvoice(orderId);
     
      toast.add({
        severity: 'success',
        summary: 'Cuenta cerrada',
        detail: 'La cuenta ha sido cerrada exitosamente.',
        life: 10000,
      
      });
      recargarPaginaDespuesDeUnSegundo();
      
    },
    reject: () => {
      toast.add({
        severity: 'info',
        summary: 'No se cerró',
        detail: 'No se cerró la cuenta.',
        life: 3000
      });
    }
  });
}

// Generar factura final
async function generateFinalInvoice(orderId) {
  const table = selectedTable.value;

  if (!table || !table.active_order) {
    toast.add({
      severity: 'warn',
      summary: 'No hay orden activa',
      detail: 'No hay una orden activa en esta mesa.',
      life: 3000
    });
    //alert('No hay una orden activa en esta mesa.');
    return;
  }

  const order = table.active_order;

  const items = getOrderItemsWithNames(order, props.products);

  if (!items.length) {
    toast.add({
      severity: 'warn',
      summary: 'No hay productos en la orden',
      detail: 'No hay productos en esta orden para generar una factura final.',
      life: 3000
    });
    //alert('No hay productos en esta orden.');
    return;
  }

  const subtotal = items
    .filter(p => p.payment_status !== 'paid')
    .reduce((sum, p) => sum + (p.price * p.payQuantity), 0);
  const discountAmount = table.active_order?.calculated_discount || 0;
  const totalToPay = parseFloat(subtotal - discountAmount).toFixed(2);

  if (!nextInvoiceNumber.value) {
    await fetchNextInvoiceNumber();
  }

  const dataToSend = {
    invoice_number: nextInvoiceNumber.value,
    fiscal_name: fiscal_name.value,
    fiscal_ruc: fiscal_ruc.value,
    subtotal: subtotal.toFixed(2),
    discount_type: table.active_order?.discount_type || null,
    discount_value: table.active_order?.discount_value || null,
    discount_reason: table.active_order?.discount_reason || null,
    total: totalToPay,
    order_id: orderId
  };

  //console.log('Datos enviados:', dataToSend);

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
   // console.log('Factura guardada:', result);

    const finalInvoiceHTML = getFinalInvoiceHTML(items, totalToPay);
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(finalInvoiceHTML);
    printWindow.document.close();

    showFinalInvoiceModal.value = false;

  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Error al guardar factura',
      detail: 'Hubo un problema al generar la factura final. Ver consola para detalles.',
      life: 3000
    });
    //alert('Hubo un problema al generar la factura final. Ver consola para detalles.');
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

  const total = selectedProducts.value
    .filter(p => p.payment_status !== 'paid') // Excluye los pagados
    .reduce((sum, p) => sum + (p.price * p.quantity), 0);

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


  const orderId = selectedTable.value?.active_order?.id;

  if (!orderId) {
    toast.add({
      severity: 'warn',
      summary: 'Orden no encontrada',
      detail: 'No hay una orden activa para cancelar el descuento.',
      life: 3000
    });
    //alert("No se encontró una orden activa.");
    return;
  }

  try {
    await axios.post(`/orders/${orderId}/remove-discount`);
    
    // Limpia los campos en la orden activa también si quieres reflejarlo en pantalla
    selectedTable.value.active_order.discount_type = null;
    selectedTable.value.active_order.discount_value = null;
    selectedTable.value.active_order.discount_reason = null;



    //alert("Descuento eliminado correctamente.");
    toast.add({
      severity: 'success',
      summary: 'Descuento eliminado',
      detail: 'El descuento se ha eliminado correctamente.',
      life: 3000
    });
    
    discountReason.value = '';
    discountValue.value = 0;
    discountType.value = '';
    showDiscountInput.value = false;

  } catch (error) {
    console.error("Error al eliminar el descuento:", error);
    toast.add({
      severity: 'error',
      summary: 'Error al eliminar descuento',
      detail: 'Hubo un problema al eliminar el descuento.',
      life: 3000
    });
    //alert("Hubo un problema al eliminar el descuento.");
  }
}

// aplicar descuento
function applyDiscount() {
  if (discountValue.value <= 0) {
    //alert("El valor del descuento debe ser mayor a 0.");
    toast.add({
      severity: 'warn',
      summary: 'Valor de descuento inválido',
      detail: 'El valor del descuento debe ser mayor a 0.',
      life: 3000
    });
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
    //alert("No hay una orden activa en esta mesa.");
    toast.add({
      severity: 'warn',
      summary: 'Orden no activa',
      detail: 'No hay una orden activa en esta mesa.',
      life: 3000
    });
    return;
  }

  axios.post(route('orders.updateDiscount', { order: orderId }), {
    discount_type: discountType.value,
    discount_value: discountValue.value,
    discount_reason: discountReason.value
  })
  .then(response => {
    //alert(`Descuento aplicado: C$${calculatedDiscount.toFixed(2)}\nRazón: ${discountReason.value}`);
    toast.add({
      severity: 'success',
      summary: 'Descuento aplicado',
      detail: `Descuento aplicado: C$${calculatedDiscount.toFixed(2)}\nRazón: ${discountReason.value}`,
      life: 3000
    });
    showDiscountInput.value = false;
    discountReason.value = '';
  })
  .catch(error => {
    console.error("Error al guardar descuento:", error);
    //alert("Hubo un problema al aplicar el descuento.");
    toast.add({
      severity: 'error',
      summary: 'Error al aplicar descuento',
      detail: 'Hubo un problema al aplicar el descuento.',
      life: 3000
    });
  });
}

const openTransferOrderModal = () => {
  selectedTableToTransfer.value = null
  showTransferModal.value = true
  showModalcuenta.value = false
}

const closeTransferModal = () => {
  showTransferModal.value = false
}

//transferencia mesa
const transferTable = () => {
  if (!selectedTable.value?.active_order?.id || !selectedTableToTransfer.value) {
    toast.add({
      severity: 'warn',
      summary: 'Datos incompletos',
      detail: 'Faltan datos para transferir la orden.',
      life: 3000
    });
    //alert('Faltan datos para transferir.');
    return;
  }

  const orderId = selectedTable.value.active_order.id;
  const newTableId = selectedTableToTransfer.value;

  router.post(route('orders.transfertable', { order: orderId }), {
    new_table_id: newTableId
  }, {
    onSuccess: () => {
      toast.add({
        severity: 'success',
        summary: 'Orden transferida',
        detail: `La orden ha sido transferida a la mesa ${selectedTableToTransfer.value}.`,
        life: 3000
      });
      //alert('Orden transferida correctamente.');
      closeTransferModal();
      recargarPaginaDespuesDeUnSegundo();
    },
    onError: (errors) => {
      console.error("Errores al transferir:", errors);
      toast.add({
        severity: 'error',
        summary: 'Error al transferir orden',
        detail: 'Hubo un error al transferir la orden. Ver consola para detalles.',
        life: 3000
      });
      //alert("Hubo un error al transferir la orden.");
    }
  });
};

// Abrir modal para ingresar precio
const openCustomPriceModal = (product) => {
  selectedProduct.value = product;
  customPrice.value = 0;
  showCustomModal.value = true;

  // Enfocar input
  setTimeout(() => {
    const input = document.getElementById('custom-price-input');
    if (input) input.focus();
  }, 100);
};

const addWithCustomPrice = () => {
  if (customPrice.value <= 0) {
    toast.add({
      severity: 'warn',
      summary: 'Precio inválido',
      detail: 'El precio debe ser mayor a 0.',
      life: 3000
    });
    //alert('El precio debe ser mayor a 0');
    return;
  }

  const newPrice = parseFloat(customPrice.value);

const customProductItem = {
  id: selectedProduct.value.id, // ✅ usa el id real de la DB
  name: selectedProduct.value.name,
  price: newPrice,
  quantity: 1,
  payment_status: 'pending',
  is_manual_price: true,
  temp_id: `CUSTOM-${Date.now()}`, // opcional para frontend
};


  //  Buscar uno PENDIENTE con el MISMO ID y MISMO PRECIO
  const existingSamePrice = selectedProducts.value.find(
  p =>
    p.id === selectedProduct.value.id && // ✅ id real del producto genérico
    p.is_manual_price &&
    p.payment_status !== 'paid' &&
    p.price === newPrice // Solo si el precio es igual
);


  if (existingSamePrice) {
    // Si ya existe uno con este precio, incrementar cantidad
    existingSamePrice.quantity++;
  } else {
    // Si es un precio nuevo, agregar ítem independiente
    selectedProducts.value.push(customProductItem);
  }

  showCustomModal.value = false;
};

function refreshDiscountUI() {
  // Esto simplemente fuerza a Vue a re-renderizar sin cambiar valores
  // Hacemos una reasignación del mismo valor para "despertar" la reactividad
  discountValue.value = discountValue.value;
  discountReason.value = discountReason.value;
  discountType.value = discountType.value;

  // Si quieres asegurarte de que Inertia no toque nada del backend, no llames axios.post
  //console.log("Refrescando campos de descuento sin borrar datos...");
}

// Descuento parcial
const partialTotalWithDiscount = computed(() => {
  if (!appliedPartialDiscount.value) return partialTotal.value;
  
  return partialTotal.value - appliedPartialDiscount.value.amount;
});

// Aplicar descuento parcial
function applyPartialDiscount() {
  if (partialDiscountType.value === 'amount' && partialDiscountValue.value > partialTotal.value) {
    toast.add({
      severity: 'warn',
      summary: 'Descuento inválido',
      detail: 'El descuento no puede ser mayor al subtotal.',
      life: 3000
    });
    //alert('El descuento no puede ser mayor al subtotal');
    return;
  }

  appliedPartialDiscount.value = {
    type: partialDiscountType.value,
    amount: partialDiscountType.value === 'percent'
      ? (partialTotal.value * partialDiscountValue.value) / 100
      : partialDiscountValue.value,
    reason: partialDiscountReason.value
  };
}

// Limpiar descuento parcial si se desactiva el toggle
watch(togglePartialDiscount, (newVal) => {
  if (!newVal) {
    partialDiscountValue.value = 0;
    partialDiscountReason.value = '';
    discountType.value = '';
    appliedPartialDiscount.value = null;
  }
});

//descuento llevar
const takeAwayTotalWithDiscount = computed(() => {
  const discount = appliedTakeAwayDiscount.value;

  if (!discount) return takeAwayTotal.value;

  let discountAmount = 0;

  if (discount.value > 0) {
    if (discount.type === 'percent') {
      discountAmount = takeAwayTotal.value * (discount.value / 100);
    } else {
      discountAmount = Math.min(discount.value, takeAwayTotal.value);
    }
  }

  return takeAwayTotal.value - discountAmount;
});


//aplicar descuento llevar
function applyDiscountTakeAway() {
  // Validación: el descuento fijo no puede superar el total
  if (takeAwayDiscountType.value === 'amount' && takeAwayDiscountValue.value > takeAwayTotal.value) {
    toast.add({
      severity: 'warn',
      summary: 'Descuento inválido',
      detail: 'El descuento no puede ser mayor al subtotal.',
      life: 3000
    });
    return;
  }

  // Guardamos el valor ingresado, no el monto calculado
  appliedTakeAwayDiscount.value = {
    type: takeAwayDiscountType.value,      // 'percent' o 'amount'
    value: takeAwayDiscountValue.value,    // porcentaje o monto
    reason: takeAwayDiscountReason.value   // motivo
  };
}


// Limpiar descuento llevar si se desactiva el toggle
watch(toggleTakeAwayDiscount, (newVal) => {
  if (!newVal) {
    takeAwayDiscountValue.value = 0;
    takeAwayDiscountReason.value = '';
    takeAwayDiscountType.value = '';
    appliedTakeAwayDiscount.value = null;
  }
});


const pedidosYaProducts = computed(() => {
  const result = {}
  props.products.forEach(product => {
    if (product.is_py) {  // 🔹 solo los que son de Pedidos Ya
      if (!result[product.category]) {
        result[product.category] = []
      }
      result[product.category].push(product)
    }
  })
  return result
})

//descuento pedidos ya
const pedidosYaDiscount = computed(() => {
  const discount = appliedPedidosYaDiscount.value;

  if (!discount) return pedidosYaTotal.value;

  let discountAmount = 0;

  if (discount.value > 0) {
    if (discount.type === 'percent') {
      discountAmount = pedidosYaTotal.value * (discount.value / 100);
    } else {
      discountAmount = Math.min(discount.value, pedidosYaTotal.value);
    }
  }

  return pedidosYaTotal.value - discountAmount;
});


// aplicar descuento pedidos ya
function applyDiscountPedidosYa() {
  // Validación: el descuento fijo no puede superar el total
  if (pedidosYaDiscountType.value === 'amount' && pedidosYaDiscountValue.value > pedidosYaTotal.value) {
    toast.add({
      severity: 'warn',
      summary: 'Descuento inválido',
      detail: 'El descuento no puede ser mayor al subtotal.',
      life: 3000
    });
    return;
  }

  // Guardamos el valor ingresado por el usuario, no el monto calculado
  appliedPedidosYaDiscount.value = {
    type: pedidosYaDiscountType.value,     // 'percent' o 'amount'
    value: pedidosYaDiscountValue.value,   // valor ingresado por el usuario
    reason: pedidosYaDiscountReason.value  // motivo
  };
}

// Limpiar descuento pedidos ya si se desactiva el toggle
watch(togglePedidosYaDiscount, (newVal) => {
  if (!newVal) {
    pedidosYaDiscountValue.value = 0;
    pedidosYaDiscountReason.value = '';
    pedidosYaDiscountType.value = '';
    appliedPedidosYaDiscount.value = null;
  }
});

</script>


<style>
/* Asegúrate de que los toasts estén visibles */
.p-toast {
  z-index: 2000 !important;
}
</style>
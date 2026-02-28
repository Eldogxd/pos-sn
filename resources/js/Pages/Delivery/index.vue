<template>
    <AppLayout title="Delivery">
        <template #header>
            <div class="flex items-center justify-between">
                <h2 class="text-xl font-semibold leading-tight text-gray-800">Gestión de Delivery</h2>
                <NavDelivery />
            </div>
        </template>
           
        <div class="flex justify-end p-4">
             <button @click="openModal" class="flex items-center px-6 py-3 text-white transition rounded-lg bg-mantis-500 hover:bg-mantis-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Crear Orden de Delivery
            </button>
        </div>

        <!-- Lista de órdenes activas -->
        <div class="p-6">
    <div class="flex items-center mb-6">
        <div class="p-2 mr-3 text-white rounded-lg bg-mantis-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-800">Órdenes en Curso</h3>
    </div>
    
  <div v-if="props.orders && props.orders.length > 0" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
    <div 
      v-for="order in props.orders" 
      :key="order.id"
      @click="openOrder(order)"
      class="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm cursor-pointer rounded-xl hover:shadow-lg hover:border-mantis-300"
    >
            <!-- Header con número de orden y estado -->
            <div class="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-gray-50 to-gray-100">
                <div class="flex items-center">
                    <span class="p-1 mr-2 text-mantis-600">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </span>
                    <span class="font-bold text-gray-800">#{{ order.id }}</span>
                </div>
                <span 
                    class="px-3 py-1 text-xs font-medium rounded-full"
                    :class="{
                        'bg-yellow-100 text-yellow-800': order.status === 'abierta',
                        'bg-blue-100 text-blue-800': order.status === 'asignada',
                        'bg-indigo-100 text-indigo-800': order.status === 'en_camino',
                        'bg-green-100 text-green-800': order.status === 'entregada'
                    }"
                >
                    {{ order.status.replace('_', ' ') }}
                </span>
            </div>

            <!-- Información del cliente -->
            <div class="px-5 py-4">
                <div class="flex items-start mb-4">
                    <span class="p-1 mr-3 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 008 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </span>
                    <div>
                        <p class="font-semibold text-gray-800">{{ order.customer_name }}</p>
                        <p class="text-sm text-gray-600">📞 {{ order.customer_phone }}</p>
                    </div>
                </div>

                <div class="flex items-start">
                    <span class="p-1 mr-3 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </span>
                    <p class="text-sm text-gray-600">{{ order.delivery_address }}</p>
                </div>

                <!-- Mostrar rider asignado en la card (usa assigned_to como id) -->
                <div v-if="order.assigned_to || order.rider_name" class="flex items-center mt-3 text-sm">
  <span class="p-1 mr-3 text-gray-500">
    <!-- Ícono de moto -->
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bike-icon lucide-bike"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>
  </span>
  <div class="flex flex-col">
    <span class="font-medium text-gray-800">
      {{ (props.riders.find(r => r.id === order.assigned_to)?.name) || order.rider_name || (order.assigned_to ? 'Rider #' + order.assigned_to : '—') }}
    </span>
  </div>
</div>


                <!-- Resumen compacto de productos -->
                <div v-if="order.items && order.items.length" class="mt-4 text-xs">
                  <div class="flex flex-wrap items-center gap-1">
                    <span class="px-2 py-0.5 font-medium tracking-wide text-green-700 bg-green-100 rounded-full">{{ order.items.length }} prod.</span>
                    <span class="text-gray-400">•</span>
                    <span class="text-gray-600 truncate max-w-[200px] sm:max-w-[240px]">
                      {{ order.items.slice(0,2).map(i => (i.product_name || 'Producto') + (i.quantity>1 ? ' x'+i.quantity : '')).join(', ') }}<span v-if="order.items.length>2"> +{{ order.items.length-2 }}</span>
                    </span>
                    <span class="ml-auto text-[10px] font-medium text-mantis-600 uppercase">Ver Detalle</span>
                  </div>
                </div>

            </div>

            <!-- Total y acciones -->
            <div class="px-5 py-4 mt-auto bg-gray-50">
                <div class="flex items-center justify-between gap-3">
                    <div class="flex flex-col">
                      <p class="text-lg font-bold leading-tight text-mantis-600">
                        C${{ parseFloat(order.total).toFixed(2) }}
                      </p>
                      <div v-if="order.discount_amount && order.discount_amount > 0" class="flex items-center mt-1 text-[10px] font-medium text-red-600 gap-1">
                        <span class="px-1.5 py-0.5 bg-red-100 rounded-full">- C${{ parseFloat(order.discount_amount).toFixed(2) }}</span>
                        <span v-if="order.discount_type==='percent'" class="text-red-500">({{ order.discount_value }}%)</span>
                      </div>
                    </div>

          <div class="flex items-center" @click.stop>
            <!-- Botón de acción principal que cambia según el estado -->
            <button 
              v-if="order.status === 'abierta'"
              @click.stop="openRiderModal(order)" 
              class="flex items-center px-3 py-2 text-xs text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Asignar Rider
            </button>

            <button 
              v-if="order.status === 'asignada'"
              @click.stop="changeOrderStatus(order, 'en_camino')"
              class="flex items-center px-3 py-2 text-xs text-white transition bg-indigo-500 rounded-lg hover:bg-indigo-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1zM3 11h10" />
              </svg>
              Marcar En Camino
            </button>

            <button 
              v-if="order.status === 'en_camino'"
              @click.stop="changeOrderStatus(order, 'entregada')"
              class="flex items-center px-3 py-2 text-xs text-white transition bg-green-500 rounded-lg hover:bg-green-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Marcar Entregada
            </button>

            <!-- (Se eliminó el botón pequeño de cambiar rider en la card; usar 'Cambiar Rider' desde el detalle) -->
          </div>
                </div>
            </div>
        </div>
    </div>

    <div v-else class="flex flex-col items-center justify-center p-8 text-center border border-dashed rounded-xl bg-gray-50">
        <div class="p-3 mb-4 text-gray-400 bg-gray-200 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
        </div>
        <h3 class="mb-2 text-lg font-medium text-gray-600">No hay órdenes activas</h3>
        <p class="text-gray-500">Todas las órdenes han sido completadas o no hay pedidos en curso.</p>
    </div>
</div>

        <!-- Modal -->
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70">
    <!-- Modal container -->
    <div class="bg-white w-11/12 sm:w-4/5 lg:w-3/4 max-h-[95vh] sm:max-h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-auto lg:overflow-hidden border border-gray-200">
      
      <!-- Header -->
    <div class="flex items-center justify-between p-5 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <div class="flex items-center">
          <div class="p-2 mr-3 text-white rounded-lg bg-mantis-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
      <h2 class="text-xl font-bold text-gray-800 sm:text-2xl">{{ isEditing ? 'Editar Orden Delivery' : 'Nueva Orden Delivery' }}</h2>
        </div>
        <button @click="showModal = false" class="p-2 text-gray-500 transition-colors rounded-full hover:bg-gray-100 hover:text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Body principal: movil -> scroll del modal; lg -> dos columnas con scroll interno -->
      <div class="flex flex-col flex-1 min-h-0 lg:flex-row lg:overflow-hidden">
        
        <!-- Columna izquierda: Info Cliente -->
        <div class="w-full p-5 border-b lg:w-2/5 lg:border-r bg-gray-50 lg:overflow-y-auto lg:min-h-0">
          <div class="flex items-center mb-5">
            <div class="p-2 mr-2 text-white bg-blue-500 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-700">Información del Cliente</h3>
          </div>

          <!-- Buscador Unificado -->
          <div class="mb-4">
            <label class="flex items-center mb-1 text-sm font-medium text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Buscar Cliente Existente
            </label>
            <div class="relative flex items-center">
              <input
                v-model="searchTerm"
                @input="searchCustomers"
                type="text"
                placeholder="Buscar por nombre, RUC o teléfono..."
                class="w-full p-3 pl-10 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
              />
              <button v-if="customer.id" @click="clearCustomer" class="absolute p-1 text-gray-500 right-2 hover:text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <ul v-if="searchResults.length" class="absolute z-50 w-full mt-1 overflow-y-auto bg-white border rounded-md shadow-lg max-h-40 top-full scroll-smooth">
                <li v-for="c in searchResults" :key="c.id"
                    @click="selectCustomer(c)"
                    class="px-4 py-2 border-b border-gray-100 cursor-pointer hover:bg-blue-50 last:border-0">
                  {{ c.name }} - {{ c.phone }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Formulario de cliente -->
          <div class="p-4 mt-4 border border-gray-200 rounded-lg bg-white/50">
            <p v-if="!customer.id" class="mb-3 text-sm text-center text-gray-600">O complete los datos para un nuevo cliente:</p>
            
            <div class="mb-4">
              <label class="block mb-1 text-sm font-medium text-gray-700">Nombre</label>
              <input v-model="customer.name" type="text" class="w-full p-3 border border-gray-300 rounded-lg" :readonly="!!customer.id" />
            </div>

            <div class="mb-4">
              <label class="block mb-1 text-sm font-medium text-gray-700">Teléfono</label>
              <input v-model="customer.phone" type="text" class="w-full p-3 border border-gray-300 rounded-lg" />
            </div>

            <div class="mb-4">
              <label class="block mb-1 text-sm font-medium text-gray-700">Nombre Fiscal</label>
              <input v-model="customer.fiscal_name" type="text" class="w-full p-3 border border-gray-300 rounded-lg" />
            </div>

            <div class="mb-4">
              <label class="block mb-1 text-sm font-medium text-gray-700">RUC</label>
              <input v-model="customer.fiscal_ruc" type="text" class="w-full p-3 border border-gray-300 rounded-lg" />
            </div>

            <!-- Dirección: textarea en móviles o select si hay direcciones guardadas -->
            <div class="mb-4">
              <label class="flex items-center mb-1 text-sm font-medium text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Dirección de Envío
              </label>
              <textarea
                v-if="!customer.id || !customer.addresses || customer.addresses.length === 0"
                v-model="customer.selectedAddress"
                rows="3"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                placeholder="Escriba la dirección de entrega"
              ></textarea>
              <select
                v-else
                v-model="customer.selectedAddress"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
              >
                <option v-for="address in customer.addresses" :key="address.id" :value="address.address">
                  {{ address.address }}
                </option>
              </select>

              <!-- NUEVOS CAMPOS: indicaciones, método de pago, efectivo y notas de delivery -->
            <div class="mb-4">
              <label class="block mb-1 text-sm font-medium text-gray-700">Indicaciones del pedido</label>
              <textarea v-model="orderInstructions" rows="2" class="w-full p-3 border border-gray-300 rounded-lg" ></textarea>
            </div>

            <div class="mb-4">
              <label class="block mb-1 text-sm font-medium text-gray-700">Método de pago</label>
                <select v-model="paymentMethod" class="w-full p-3 border border-gray-300 rounded-lg">
                <option :value="null" disabled>Seleccione un método de pago</option>
                <option value="cash">Efectivo</option>
                <option value="card">Tarjeta</option>
                <option value="bank_transfer">Transferencia</option>
                </select>
            </div>

            <div class="mb-4">
              <label v-if="paymentMethod === 'cash'" class="block mb-1 text-sm font-medium text-gray-700">Importe en efectivo (recibido)</label>
              <input v-if="paymentMethod === 'cash'" type="number" v-model.number="cashAmount" step="0.01" min="0" class="w-full p-3 border border-gray-300 rounded-lg"  />
            </div>

            <div class="mb-4">
              <label class="block mb-1 text-sm font-medium text-gray-700">Notas para delivery</label>
              <textarea v-model="deliveryNotes" rows="2" class="w-full p-3 border border-gray-300 rounded-lg" placeholder="Notas para el rider..."></textarea>
            </div>

            </div>

            
          </div>
        </div>

        <!-- Columna derecha: Productos -->
        <div class="flex flex-col w-full p-5 lg:w-3/5 lg:overflow-y-auto lg:min-h-0">
          <div class="flex items-center mb-5">
            <div class="p-2 mr-2 text-white bg-green-500 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-700">Productos</h3>
          </div>

          <!-- Lista de productos agrupados -->
          <div class="flex-1 p-4 mb-4 border border-gray-200 rounded-lg bg-gray-50 lg:overflow-y-auto">
             <div v-for="(products, category) in groupedProducts" :key="category">
               <h4 class="px-3 py-2 my-2 text-sm font-bold text-gray-600 uppercase bg-gray-100 rounded">
                 {{ category }}
               </h4>
               <div
                 v-for="product in products"
                 :key="product.id"
                 class="flex items-center justify-between p-4 mb-2 transition-colors bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 last:mb-0"
                 @click="addProduct(product)"
               >
                 <div class="flex items-center">
                   <div class="flex items-center justify-center w-10 h-10 mr-3 bg-blue-100 rounded-lg">
                     <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                     </svg>
                   </div>
                   <div>
                     <span class="font-medium text-gray-800">{{ product.name }}</span>
                   </div>
                 </div>
                 <span class="font-semibold text-mantis-600">C${{ product.price}}</span>
               </div>
             </div>
           </div>

          <!-- Productos seleccionados -->
          <div v-if="selectedProducts.length > 0" class="mb-4">
            <div class="flex items-center mb-3">
              <div class="p-1 mr-2 text-mantis-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 class="font-semibold text-gray-700 text-md">Tu Orden</h4>
            </div>
            <div class="border border-gray-200 divide-y divide-gray-100 rounded-lg">
              <div v-for="(p, index) in selectedProducts" :key="p.temp_id || p.id" class="flex items-center justify-between p-3">
                <!-- Nombre del producto -->
                <span class="font-medium text-gray-800">{{ p.name }}</span>
                
                <div class="flex items-center gap-4">
                    <!-- Controles de cantidad -->
                    <div class="flex items-center gap-2">
                        <button @click="decreaseQuantity(p)" class="p-1 text-gray-500 transition bg-gray-200 rounded-full hover:bg-gray-300 hover:text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                            </svg>
                        </button>
                        <span class="w-6 font-medium text-center text-gray-700">{{ p.quantity }}</span>
                        <button @click="increaseQuantity(p)" class="p-1 text-gray-500 transition bg-gray-200 rounded-full hover:bg-gray-300 hover:text-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>
                    
                    <!-- Precio total del item -->
                    <div class="w-20 font-semibold text-right text-mantis-600">C${{ (p.price * p.quantity).toFixed(2) }}</div>

                    <!-- Botón de eliminar -->
                    <button @click="removeProduct(p)" class="text-gray-400 transition hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
          </div>

          <!-- Total -->
          <div class="flex justify-between p-4 mb-4 text-xl font-bold bg-gray-100 rounded-lg">
            <span class="text-gray-700">Total:</span>
            <span class="text-mantis-600">C${{ deliveryTotalWithDiscount.toFixed(2) }}</span>
          </div>

          <!-- Checkbox y descuento para Delivery -->
    <div v-if="showModal" class="p-3 mt-2 border-t">
      <div class="flex items-center gap-2">
        <input type="checkbox" v-model="toggleDeliveryDiscount" id="delivery-discount-toggle" class="w-4 h-4 text-orange-500 rounded focus:ring-orange-400">
        <label for="delivery-discount-toggle" class="text-sm font-medium text-gray-700">Aplicar Descuento</label>
      </div>

      <div v-if="toggleDeliveryDiscount" class="p-3 mt-3 space-y-2 border rounded-lg bg-orange-50">
        <!-- Tipo de descuento -->
        <div class="flex items-center gap-4">
          <label class="text-sm">Tipo:</label>
          <div class="flex items-center gap-2">
            <input type="radio" id="delivery-discount-amount" value="amount" v-model="deliveryDiscountType">
            <label for="delivery-discount-amount" class="text-sm">Monto Fijo</label>
          </div>
          <div class="flex items-center gap-2">
            <input type="radio" id="delivery-discount-percent" value="percent" v-model="deliveryDiscountType">
            <label for="delivery-discount-percent" class="text-sm">Porcentaje</label>
          </div>
        </div>

        <!-- Valor y Razón -->
        <div class="flex items-center gap-2">
          <input type="number" v-model.number="deliveryDiscountValue" class="w-24 px-2 py-1 border rounded-md" placeholder="Valor">
          <input type="text" v-model="deliveryDiscountReason" class="flex-grow px-2 py-1 border rounded-md" placeholder="Razón del descuento">
        </div>

        <!-- Botón Aplicar -->
        <button @click="applyDiscountDelivery" class="w-full px-3 py-1 mt-2 text-sm text-white bg-orange-500 rounded-md hover:bg-orange-600">
          Aplicar
        </button>
      </div>
    </div>

          <!-- Botones de acción -->
          <div class="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button @click="showModal = false" class="flex items-center px-5 py-3 text-base text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancelar
            </button>
            <button @click="submitOrder" class="flex items-center px-5 py-3 text-base text-white transition-colors rounded-lg bg-mantis-500 hover:bg-mantis-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Guardar Orden
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal para precio manual -->
  <div v-if="showCustomModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50">
    <div class="w-11/12 p-6 mx-auto bg-white rounded-lg shadow-xl md:w-1/3">
      <h3 class="text-lg font-bold">Precio Manual</h3>
      <p class="mt-1 text-sm text-gray-600">Producto: <strong>{{ selectedProduct?.name }}</strong></p>

      <label class="block mt-4 mb-2 text-sm font-medium">Precio (C$)</label>
      <input
        v-model.number="customPrice"
        type="number"
        class="w-full p-2 border border-gray-300 rounded-md"
        placeholder="Ingrese el precio"
        @keyup.enter="addWithCustomPrice"
      />

      <div class="flex justify-end gap-2 mt-6">
        <button @click="showCustomModal = false" class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md">Cancelar</button>
        <button @click="addWithCustomPrice" class="px-4 py-2 text-white rounded-md bg-mantis-500">Agregar</button>
      </div>
    </div>
  </div>
  </div>
    </AppLayout>
    <Toast />
    <ConfirmDialog group="delivery"></ConfirmDialog>

    <!-- Modal detalle de orden -->
    <div v-if="showOrderModal && selectedOrder" class="fixed inset-0 z-40 flex items-start justify-center w-full h-full pt-6 overflow-y-auto bg-black/60 backdrop-blur-sm">
      <div class="w-full max-w-3xl mx-4 mb-10 overflow-hidden bg-white shadow-2xl rounded-xl">
        <!-- Header -->
        <div class="flex items-start justify-between px-6 py-5 border-b bg-gradient-to-r from-gray-50 to-gray-100">
          <div class="space-y-1">
            <div class="flex items-center gap-3">
              <h3 class="text-2xl font-bold tracking-tight text-gray-800">Orden #{{ selectedOrder.id }}</h3>
              <span class="px-2 py-1 text-xs font-medium rounded-full"
                :class="{
                  'bg-yellow-100 text-yellow-800': selectedOrder.status === 'abierta',
                  'bg-blue-100 text-blue-800': selectedOrder.status === 'asignada',
                  'bg-indigo-100 text-indigo-800': selectedOrder.status === 'en_camino',
                  'bg-green-100 text-green-800': selectedOrder.status === 'entregada'
                }"
              >{{ selectedOrder.status.replace('_',' ') }}</span>
            </div>
            <p class="text-sm text-gray-500">Creada: {{ selectedOrder.created_at ? new Date(selectedOrder.created_at).toLocaleString('es-MX', { timeZone: 'America/Mexico_City' }) : '-' }}</p>
          </div>
          <button @click="closeOrderModal" class="p-2 text-gray-500 transition rounded-full hover:bg-gray-100 hover:text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="grid gap-6 px-6 py-6 md:grid-cols-5">
          <!-- Customer Info -->
          <div class="md:col-span-2">
            <h4 class="mb-3 text-xs font-semibold tracking-wide text-gray-500 uppercase">Cliente</h4>
            <div class="p-4 space-y-3 border rounded-lg bg-white/70">
              <div class="space-y-1">
                <p class="text-base font-semibold text-gray-800">{{ selectedOrder.customer_name }}</p>
                <p class="text-sm text-gray-600">📞 {{ selectedOrder.customer_phone || '-' }}</p>
              </div>
              <div class="pt-2 space-y-2 text-xs border-t">
                <p><span class="font-medium text-gray-500">Nombre Fiscal:</span> <span class="text-gray-700">{{ selectedOrder.fiscal_name || '—' }}</span></p>
                <p><span class="font-medium text-gray-500">RUC:</span> <span class="text-gray-700">{{ selectedOrder.fiscal_ruc || '—' }}</span></p>
                <p class="mt-2 text-[11px] leading-snug text-gray-500">Si los datos fiscales están vacíos, puedes completarlos desde edición / facturación.</p>
              </div>
              <div class="pt-2 border-t">
                <p class="mb-1 text-xs font-semibold tracking-wide text-gray-500 uppercase">Dirección</p>
                <p class="text-sm text-gray-700 whitespace-pre-line">{{ selectedOrder.delivery_address }}</p>
              </div>
            </div>

            <!-- Totals / Discount -->
            <div class="p-4 mt-6 space-y-2 border rounded-lg bg-white/70">
              <h4 class="text-xs font-semibold tracking-wide text-gray-500 uppercase">Resumen</h4>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Subtotal</span>
                <span class="font-medium text-gray-700">C${{ (selectedOrder.subtotal ?? (selectedOrder.items ? selectedOrder.items.reduce((a,i)=>a + (parseFloat(i.price)||0)*i.quantity,0) : 0)).toFixed(2) }}</span>
              </div>
              <div v-if="selectedOrder.discount_amount && selectedOrder.discount_amount > 0" class="text-sm">
                <div class="flex justify-between text-red-600">
                  <span>Descuento<span v-if="selectedOrder.discount_type==='percent'"> ({{ selectedOrder.discount_value }}%)</span></span>
                  <span>- C${{ parseFloat(selectedOrder.discount_amount).toFixed(2) }}</span>
                </div>
                <p v-if="selectedOrder.discount_reason" class="mt-0.5 text-[11px] text-red-500">Motivo: {{ selectedOrder.discount_reason }}</p>
              </div>
              <div class="flex justify-between pt-2 text-base font-semibold border-t">
                <span class="text-gray-700">Total</span>
                <span class="text-mantis-600">C${{ parseFloat(selectedOrder.total).toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <!-- Products -->
          <div class="md:col-span-3">
            <h4 class="mb-3 text-xs font-semibold tracking-wide text-gray-500 uppercase">Productos</h4>
            <div v-if="selectedOrder.items && selectedOrder.items.length" class="overflow-hidden border rounded-md">
              <table class="w-full text-sm">
                <thead class="text-xs text-left text-gray-600 bg-gray-100">
                  <tr>
                    <th class="px-3 py-2">Producto</th>
                    <th class="px-3 py-2 text-center">Cant.</th>
                    <th class="px-3 py-2 text-right">Precio</th>
                    <th class="px-3 py-2 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(it,idx) in selectedOrder.items" :key="idx" class="border-t hover:bg-gray-50/60">
                    <td class="px-3 py-2">{{ it.product_name }}</td>
                    <td class="px-3 py-2 text-center">{{ it.quantity }}</td>
                    <td class="px-3 py-2 text-right">C${{ parseFloat(it.price).toFixed(2) }}</td>
                    <td class="px-3 py-2 font-medium text-right">C${{ (parseFloat(it.price) * it.quantity).toFixed(2) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p v-else class="p-4 text-sm text-center text-gray-500 border rounded">No hay items cargados.</p>

            <!-- Estado actions -->
            <div class="flex flex-wrap justify-end gap-2 mt-6">
              <button @click="startEditOrder" class="px-4 py-2 text-xs text-white transition bg-orange-500 rounded hover:bg-orange-600">Editar</button>
              <button 
                v-if="selectedOrder.status !== 'entregada' && selectedOrder.status !== 'anulada'"
                @click="confirmCancelOrder(selectedOrder)" 
                class="px-4 py-2 text-xs text-white transition bg-red-500 rounded hover:bg-red-600">
                Anular Orden
              </button>
              <!-- Botón para abrir modal de asignar/cambiar rider (solo en detalle) -->
              <button @click="openRiderModal(selectedOrder)" class="px-4 py-2 text-xs text-white rounded bg-mantis-600 hover:bg-mantis-700">Cambiar Rider</button>
              <button
                v-if="selectedOrder.status==='asignada'"
                @click="changeOrderStatus(selectedOrder, 'en_camino')"
                class="px-4 py-2 text-xs text-white bg-indigo-500 rounded hover:bg-indigo-600"
              >Marcar En Camino</button>
              <button
                v-if="selectedOrder.status==='en_camino'"
                @click="changeOrderStatus(selectedOrder, 'entregada')"
                class="px-4 py-2 text-xs text-white bg-green-500 rounded hover:bg-green-600"
              >Marcar Entregada</button>
              
              <button @click="closeOrderModal" class="px-4 py-2 text-xs text-gray-700 transition bg-gray-200 rounded hover:bg-gray-300">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Asignar Rider -->
    
    <div
    v-if="showRiderModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
  >
    <div class="w-full max-w-sm p-5 mx-4 bg-white rounded-lg shadow-lg">
      <h3 class="mb-4 text-lg font-semibold">Asignar Rider</h3>
      <label class="block mb-1 text-sm font-medium">Rider</label>
      <select
        v-model="riderForm.rider_id"
        class="w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring focus:ring-mantis-300"
      >
        <option :value="null">Sin asignar</option>
        <option
          v-for="r in props.riders"
          :key="r.id"
          :value="r.id"
        >{{ r.name }}</option>
      </select>
      <div class="flex justify-end gap-2 mt-6">
        <button
          @click="closeRiderModal"
          class="px-3 py-2 text-sm border rounded hover:bg-gray-50"
        >Cancelar</button>
        <button
          @click="submitRider"
          class="px-4 py-2 text-sm text-white rounded bg-mantis-600 hover:bg-mantis-700"
        >Guardar</button>
      </div>
    </div>
  </div>
  
  <!-- Modal detalle existente -->

</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import NavDelivery from '@/Layouts/NavDelivery.vue';
import axios from 'axios';
import { route } from 'ziggy-js';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faWeightScale } from '@fortawesome/free-solid-svg-icons';
import { useConfirm } from 'primevue/useconfirm';
import ConfirmDialog from 'primevue/confirmdialog';

const isMobile = ref(window.innerWidth < 768);

const handleResize = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

const toast = useToast();
const confirm = useConfirm();

const props = defineProps({
  orders: { type: Array, default: () => [] },
  products: { type: Array, default: () => [] },
  riders: { type: Array, default: () => [] }, 
});

// Modal detalle de orden
const showOrderModal = ref(false);
const selectedOrder = ref(null);
const nextInvoiceNumber = ref('');
function openOrder(order){ selectedOrder.value = order; showOrderModal.value = true; }
function closeOrderModal(){ showOrderModal.value = false; selectedOrder.value = null; }


const groupedProducts = computed(() => {
    // 1. Agrupar productos por categoría
    const grouped = props.products.reduce((acc, product) => {
        const category = product.category || 'Sin categoría';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(product);
        return acc;
    }, {});

    // 2. Ordenar las categorías, dando prioridad a "Sopas"
    const sortedCategories = Object.keys(grouped).sort((a, b) => {
        const aIsSopas = a.toLowerCase() === 'sopas';
        const bIsSopas = b.toLowerCase() === 'sopas';

        if (aIsSopas && !bIsSopas) return -1; // 'a' (Sopas) va primero
        if (!aIsSopas && bIsSopas) return 1;  // 'b' (Sopas) va primero
        
        // Para el resto, orden alfabético
        return a.localeCompare(b);
    });

    // 3. Construir el objeto final ordenado
    const sortedGroupedProducts = {};
    for (const category of sortedCategories) {
        sortedGroupedProducts[category] = grouped[category];
    }

    return sortedGroupedProducts;
});

const showModal = ref(false);
const isEditing = ref(false);
const editingOrderId = ref(null);

const getInitialCustomerState = () => ({
  id: null,
  name: '',
  phone: '',
  fiscal_name: '',
  fiscal_ruc: '',
  addresses: [],
  selectedAddress: ''
});

const customer = ref(getInitialCustomerState());
const searchTerm = ref('');
const searchResults = ref([]);
const selectedProducts = ref([]);
let searchTimeout = null;

// Nuevas variables para el descuento de delivery
const toggleDeliveryDiscount = ref(false);
const deliveryDiscountType = ref('amount'); // 'amount' o 'percent'
const deliveryDiscountValue = ref(0);
const deliveryDiscountReason = ref('');
const appliedDeliveryDiscount = ref(null);

const showCustomModal = ref(false);
const selectedProduct = ref(null);
const customPrice = ref(0);

// agrega estas refs cerca de otras refs (por ejemplo después de showCustomModal / before showRiderModal)
const orderInstructions = ref('');
const paymentMethod = ref('');
const cashAmount = ref(0);
const deliveryNotes = ref('');


function openModal() {
    clearCustomer();
    selectedProducts.value = [];
    isEditing.value = false;
    editingOrderId.value = null;

    // reset nuevos campos
    orderInstructions.value = '';
    paymentMethod.value = 'null';
    cashAmount.value = 0;
    deliveryNotes.value = '';
 
    showModal.value = true;
}

function clearCustomer() {
    customer.value = getInitialCustomerState();
    searchTerm.value = '';
    searchResults.value = [];
}

function searchCustomers() {
  clearTimeout(searchTimeout);
  searchResults.value = [];

  if (searchTerm.value.length < 2) {
    return;
  }

  searchTimeout = setTimeout(async () => {
    try {
      const response = await axios.get(route('customers.search'), {
        params: { term: searchTerm.value }
      });
      searchResults.value = response.data;
    } catch (error) {
      console.error('Error buscando clientes:', error);
    }
  }, 300);
}

function selectCustomer(selected) {
  customer.value.id = selected.id;
  customer.value.name = selected.name;
  customer.value.phone = selected.phone;
  customer.value.fiscal_name = selected.fiscal_name;
  customer.value.fiscal_ruc = selected.fiscal_ruc;
  customer.value.addresses = selected.addresses;
  
  if (selected.addresses && selected.addresses.length > 0) {
    customer.value.selectedAddress = selected.addresses[0].address;
  } else {
    customer.value.selectedAddress = '';
  }

  searchTerm.value = selected.name;
  searchResults.value = [];
}

function addProduct(product) {
  // Si el producto es genérico (requiere precio manual) abrimos el modal
  if (product.is_generic) {
    openCustomPriceModal(product);
    return;
  }

  // Caso normal: agrupar por ID (solo productos no manuales)
  const existing = selectedProducts.value.find(p => p.id === product.id && !p.is_manual_price);
  if (existing) {
    existing.quantity += 1;
  } else {
    selectedProducts.value.push({ ...product, quantity: 1, is_manual_price: false });
  }
}

function increaseQuantity(product) {
  const existing = selectedProducts.value.find(p => p.id === product.id);
  if (existing) {
    existing.quantity += 1;
  }
}

function decreaseQuantity(product) {
  const index = selectedProducts.value.findIndex(p => (p.temp_id && p.temp_id === product.temp_id) || (!p.temp_id && p.id === product.id));
  
  if (index !== -1) {
    if (selectedProducts.value[index].quantity > 1) {
      selectedProducts.value[index].quantity -= 1;
    } else {
      removeProduct(product);
    }
  }
}

function removeProduct(product) {
  const index = selectedProducts.value.findIndex(p => (p.temp_id && p.temp_id === product.temp_id) || (!p.temp_id && p.id === product.id));
  if (index !== -1) {
    selectedProducts.value.splice(index, 1);
  }
}

const deliveryTotal = computed(() => {
  return selectedProducts.value.reduce((acc, p) => acc + p.price * p.quantity, 0);
});

const deliveryTotalWithDiscount = computed(() => {
  const total = deliveryTotal.value;
  if (!appliedDeliveryDiscount.value) {
    return total;
  }
  const discountAmount = calculateDiscountAmount(total, appliedDeliveryDiscount.value);
  return total - discountAmount;
});

function calculateDiscountAmount(total, discount) {
  if (!discount || discount.value <= 0) {
    return 0;
  }
  if (discount.type === 'percent') {
    return (total * discount.value) / 100;
  }
  return discount.value;
}

function applyDiscountDelivery() {
  if (deliveryDiscountType.value === 'amount' && deliveryDiscountValue.value > deliveryTotal.value) {
    toast.add({ severity: 'warn', summary: 'Aviso', detail: 'El descuento no puede ser mayor que el total.', life: 3000 });
    return;
  }

  appliedDeliveryDiscount.value = {
    type: deliveryDiscountType.value,
    value: deliveryDiscountValue.value,
    reason: deliveryDiscountReason.value,
  };

  toast.add({ severity: 'success', summary: 'Éxito', detail: 'Descuento de delivery aplicado.', life: 3000 });
}

watch(toggleDeliveryDiscount, (newVal) => {
  if (!newVal) {
    appliedDeliveryDiscount.value = null;
    deliveryDiscountValue.value = 0;
    deliveryDiscountReason.value = '';
    toast.add({ severity: 'info', summary: 'Info', detail: 'Descuento de delivery eliminado.', life: 3000 });
  }
});

function openCustomPriceModal(product) {
  selectedProduct.value = product;
  customPrice.value = 0;
  showCustomModal.value = true;
}

function addWithCustomPrice() {
  if (customPrice.value <= 0) {
    toast.add({ severity: 'warn', summary: 'Precio Inválido', detail: 'El precio debe ser mayor a 0.', life: 3000 });
    return;
  }

  const newProduct = {
    ...selectedProduct.value,
    price: parseFloat(customPrice.value),
    quantity: 1,
    is_manual_price: true,
    // Usamos un ID temporal único para el frontend para diferenciar items con el mismo producto base pero diferente precio
    temp_id: `manual_${Date.now()}` 
  };

  selectedProducts.value.push(newProduct);
  showCustomModal.value = false;
}

function startEditOrder(){
  if(!selectedOrder.value) return;
  const o = selectedOrder.value;
  customer.value = {
    id: null,
    name: o.customer_name || '',
    phone: o.customer_phone || '',
    fiscal_name: o.fiscal_name || '',
    fiscal_ruc: o.fiscal_ruc || '',
    addresses: [],
    selectedAddress: o.delivery_address || ''
  };
  selectedProducts.value = (o.items||[]).map(it => ({
    id: it.product_id,
    name: it.product_name,
    price: parseFloat(it.price),
    quantity: it.quantity,
    is_generic: false,
    is_manual_price: false
  }));

  // cargar descuentos existentes (ya estaba)
  if(o.discount_type && o.discount_value){
    toggleDeliveryDiscount.value = true;
    deliveryDiscountType.value = o.discount_type;
    deliveryDiscountValue.value = parseFloat(o.discount_value);
    deliveryDiscountReason.value = o.discount_reason || '';
    appliedDeliveryDiscount.value = {type:o.discount_type,value:parseFloat(o.discount_value),reason:o.discount_reason};
  } else {
    toggleDeliveryDiscount.value = false;
    appliedDeliveryDiscount.value = null;
    deliveryDiscountValue.value = 0;
    deliveryDiscountReason.value = '';
  }

  // cargar nuevos campos si existen en la orden (nombre de propiedades del backend puede variar)
  orderInstructions.value = o.indications || '';
  paymentMethod.value = o.payment_method || 'cash';
  cashAmount.value = parseFloat(o.cash_amount || 0);
  deliveryNotes.value = o.delivery_notes || '';

  isEditing.value = true;
  editingOrderId.value = o.id;
  showOrderModal.value = false;
  showModal.value = true;
}

function submitOrder() {
  // Validaciones más específicas
  if (!customer.value.name) {
    toast.add({ severity: 'error', summary: 'Error de Validación', detail: 'Por favor, complete el nombre del cliente.', life: 4000 });
    return;
  }

  if (!customer.value.selectedAddress) {
    toast.add({ severity: 'error', summary: 'Error de Validación', detail: 'Debe ingresar una dirección de entrega.', life: 4000 });
    return;
  }

  if (selectedProducts.value.length === 0) {
    toast.add({ severity: 'error', summary: 'Error de Validación', detail: 'Debe agregar al menos un producto a la orden.', life: 4000 });
    return;
  }

  if (!paymentMethod.value || paymentMethod.value === 'null') {
    toast.add({ severity: 'error', summary: 'Error de Validación', detail: 'Debe seleccionar un método de pago.', life: 4000 });
    return;
  }

  if (paymentMethod.value === 'cash' && cashAmount.value > 0 && cashAmount.value < deliveryTotalWithDiscount.value) {
    toast.add({ severity: 'warn', summary: 'Aviso', detail: 'El efectivo recibido es menor que el total de la orden.', life: 5000 });
  }

  const orderData = {
      customer: {
          id: customer.value.id,
          name: customer.value.name,
          phone: customer.value.phone,
          fiscal_name: customer.value.fiscal_name,
          fiscal_ruc: customer.value.fiscal_ruc,
      },
      address: customer.value.selectedAddress,
      products: selectedProducts.value.map(p => ({
        id: p.id,
        quantity: p.quantity,
        price: p.price,
        is_generic: !!p.is_generic,
        is_manual_price: !!p.is_manual_price
      })),
      total: deliveryTotalWithDiscount.value,
      discount_type: appliedDeliveryDiscount.value?.type || null,
      discount_value: appliedDeliveryDiscount.value?.value || 0,
      discount_reason: appliedDeliveryDiscount.value?.reason || '',
      calculated_discount: calculateDiscountAmount(deliveryTotal.value, appliedDeliveryDiscount.value),

      // nuevos campos enviados al backend (uso 'indications' según tu tabla)
      indications: orderInstructions.value,
      payment_method: paymentMethod.value,
      cash_amount: paymentMethod.value === 'cash' ? cashAmount.value : 0,
      delivery_notes: deliveryNotes.value
  };
  const request = isEditing.value
    ? axios.put(route('delivery.update', { order: editingOrderId.value }), orderData)
    : axios.post(route('delivery.store'), orderData);
  request.then(()=>{
    showModal.value = false;
    toast.add({ severity: 'success', summary: 'Éxito', detail: isEditing.value ? 'Orden actualizada.' : 'Orden de delivery creada correctamente.', life: 3000 });
    setTimeout(()=>location.reload(),800);
  }).catch(error => {
    console.error('Error guardando la orden:', error.response?.data || error);
    toast.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al guardar la orden. Revise los datos.', life: 4000 });
  });
}

function confirmCancelOrder(order) {
  confirm.require({
    group: 'delivery',
    message: '¿Estás seguro de que deseas anular esta orden? Esta acción no se puede deshacer y también anulará cualquier factura asociada.',
    header: 'Confirmar Anulación',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sí, Anular',
    rejectLabel: 'No',
    accept: () => {
      cancelOrder(order);
    },
    reject: () => {
      toast.add({ severity: 'info', summary: 'Cancelado', detail: 'La anulación de la orden fue cancelada.', life: 3000 });
    }
  });
}

async function cancelOrder(order) {
  try {
    const response = await axios.post(route('delivery.cancel', { order: order.id }));
    toast.add({ severity: 'success', summary: 'Éxito', detail: response.data.message, life: 4000 });
    closeOrderModal();
    setTimeout(() => location.reload(), 1000);
  } catch (error) {
    console.error('Error al anular la orden:', error.response?.data || error);
    const errorMessage = error.response?.data?.message || 'No se pudo anular la orden.';
    toast.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 5000 });
  }
}

// Rider Management
const showRiderModal = ref(false);
const riderForm = ref({
  orderId: null,
  rider_id: null
});

function openRiderModal(order) {
  riderForm.value.orderId = order.id;
  // si el backend usa assigned_to como id del rider, usarlo
  riderForm.value.rider_id = order.assigned_to ?? (order.rider ? order.rider.id : null);
   showRiderModal.value = true;
}

function closeRiderModal() {
  riderForm.value = { orderId: null, rider_id: null };
  showRiderModal.value = false;
}

async function submitRider() {
  if (!riderForm.value.orderId) return;
  try {
    const res = await axios.put(route('delivery.assignRider', { order: riderForm.value.orderId }), {
      rider_id: riderForm.value.rider_id
    });

    toast.add({ severity: 'success', summary: 'OK', detail: 'Rider asignado', life: 2000 });

    // Intentar obtener la orden actualizada desde la respuesta; si no está, buscarla en props
    const updatedOrder = res.data?.order || props.orders.find(o => o.id === riderForm.value.orderId) || selectedOrder.value;

    // Generar RiderPaper y abrir en nueva pestaña para imprimir
    if (updatedOrder) {
      generateRiderPaper(updatedOrder);
    }

    // recargar para refrescar la lista (mantener comportamiento anterior)
    setTimeout(() => location.reload(), 800);
    closeRiderModal();
  } catch (err) {
    console.error('Error asignando rider', err.response?.data || err);
    toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo asignar el rider', life: 4000 });
  }
}

// Genera el HTML del RiderPaper (papel para el rider) y lo abre en otra pestaña
function generateRiderPaper(order) {
  if (!order) return;

  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  const date = new Date().toLocaleString('es-MX', options);

  const tipoOrdenTexto = 'Delivery';

  const customerName = order.customer_name || order.customer?.name || order.fiscal_name || '—';
  const phone = order.customer_phone || order.customer?.phone || order.phone || '—';
  const address = order.delivery_address || order.address || order.customer?.selectedAddress || '—';
  const indicationsText = order.indications || order.delivery_notes || '';

  const paymentMethodMap = {
    cash: 'Efectivo',
    card: 'Tarjeta',
    bank_transfer: 'Transferencia'
  };
  const paymentMethod = paymentMethodMap[order.payment_method] || (order.payment_method || '—');
  const cash_amount = order.cash_amount || 0;

  // Normalizar items y calcular subtotales
  const items = (order.items || order.order_items || []).map(it => {
    const name = it.product_name || it.name || it.product?.name || 'Producto';
    const qty = Number(it.quantity ?? it.qty ?? 1);
    const price = Number(it.price ?? it.unit_price ?? 0);
    const lineSubtotal = +(qty * price).toFixed(2);
    return { name, qty, price, lineSubtotal };
  });

  const calculatedSubtotal = items.reduce((acc, i) => acc + i.lineSubtotal, 0);
  const total = Number(order.total ?? calculatedSubtotal);

  const itemsHTML = items.map(i => `
    <tr>
      <td style="padding:4px 6px; width:30px;">${i.qty}</td>
      <td style="padding:4px 6px;">${i.name}</td>
      <td style="padding:4px 6px; text-align:right; width:56px;">${i.price.toFixed(2)}</td>
      <td style="padding:4px 6px; text-align:right; width:64px;">${i.lineSubtotal.toFixed(2)}</td>
    </tr>
  `).join('');

  const riderObj = (typeof props !== 'undefined' && props.riders) ? props.riders.find(r => r.id === order.assigned_to) : null;
  const assignedRider = order.rider?.name || riderObj?.name || (order.assigned_to ? `Rider #${order.assigned_to}` : '—');

  // Descuento (si existe)
  const discountAmount = Number(order.discount_amount ?? 0);
  const discountType = order.discount_type || null;
  const discountValue = order.discount_value != null ? Number(order.discount_value) : null;
  const discountLabel = discountType === 'percent' ? `(${discountValue ?? 0}%)` : '';

  const html = `
    <html>
      <head>
        <meta charset="utf-8">
        <title>RiderPaper - Orden #${order.id}</title>
        <style>
          body { width: 57mm; font-family: Arial, sans-serif; font-size: 12px; margin:0; padding:8px; line-height:1.2; }
          .center { text-align:center; }
          .bold { font-weight:700; }
          table { width:100%; border-collapse:collapse; margin-top:8px; font-size:12px; }
          th, td { text-align:left; border-bottom:1px solid #eee; padding:4px 6px; }
          th.right, td.right { text-align:right; }
          .small { font-size:12px; color:#333; }
          .footer { margin-top:12px; font-size:12px; text-align:center; }
          .totals { margin-top:8px; font-weight:700; }
          @media print { @page { margin:0; } body { margin:0; padding:8px; } }
        </style>
      </head>
      <body>
        <div class="center bold">Sopas Nikas</div>
        <div class="mt-2 center small">Papel Delivery</div>
        <hr>

        <p></strong>Fecha:</strong> ${date}</p>
        <p><strong>Tipo:</strong> ${tipoOrdenTexto}</p>

        ${customerName ? `<p><strong>Cliente:</strong> ${customerName}</p>` : ''}
        ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
        ${address ? `<p><strong>Dirección:</strong> ${address}</p>` : ''}
        ${indicationsText ? `<p><strong>Indicaciones:</strong> ${indicationsText}</p>` : ''}
        <p><strong>Método de Pago:</strong> ${paymentMethod}</p>
        ${order.payment_method === 'cash' ? `<p><strong>Efectivo:</strong> C$${Number(cash_amount).toFixed(2)}</p>` : ''}

        <table>
          <thead>
            <tr>
              <th style="width:30px;">Cant.</th>
              <th>Producto</th>
              <th class="right" style="width:56px;">Precio</th>
              <th class="right" style="width:64px;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>

        <div class="totals">
          <div style="display:flex; justify-content:space-between; margin-top:6px;">
            <div>Subtotal:</div><div>C$${calculatedSubtotal.toFixed(2)}</div>
          </div>
          ${discountAmount > 0 ? `
            <div style="display:flex; justify-content:space-between;">
              <div>Descuento ${discountLabel}:</div><div>-C$${Number(discountAmount).toFixed(2)}</div>
            </div>
            ${order.discount_reason ? `<div style="display:flex; justify-content:space-between; font-size: 11px; color: #555;"><div>&nbsp;&nbsp;↳ Razón:</div><div style="text-align:right;">${order.discount_reason}</div></div>` : ''}
          ` : ''}
          <div style="display:flex; justify-content:space-between; margin-top:6px; font-weight:800;">
            <div>Total:</div><div>C$${Number(total).toFixed(2)}</div>
          </div>
        </div>

        <div class="footer">Asignado a Rider: ${assignedRider}</div>
        <div style="margin-top: 50px;">.</div>

        <script>
          window.onload = function() { try { window.print(); } catch(e) {} };
        <\/script>
      </body>
    </html>
  `;

  const w = window.open('', '_blank');
  if (!w) {
    alert('Por favor permite ventanas emergentes para imprimir el RiderPaper.');
    return;
  }
  w.document.open();
  w.document.write(html);
  w.document.close();
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

// Reemplaza o añade la función changeOrderStatus para llamar a la API y generar la factura cuando pase a 'en_camino'
async function changeOrderStatus(order, newStatus) {
  if (!order || !order.id) return;
  try {
    // Actualiza estado en el backend
    const res = await axios.put(route('delivery.updateStatus', { order: order.id }), { status: newStatus });
    toast.add({ severity: 'success', summary: 'OK', detail: 'Estado actualizado', life: 2000 });
    

    // Intentamos obtener una versión completa de la orden desde el backend
    // Reemplaza 'delivery.show' por la ruta real que devuelve la orden con items y relaciones
    let fullOrder = null;
    try {
      const showRes = await axios.get(route('delivery.show', { order: order.id }));
      // Algunos endpoints devuelven { order: {...} }, otros devuelven directamente el objeto
      fullOrder = showRes.data?.order || showRes.data;
    } catch (fetchErr) {
      console.warn('No se pudo obtener la orden completa tras cambiar estado, usando datos locales.', fetchErr);
      fullOrder = res.data?.order || { ...order, status: newStatus };
    }

    // Si pasó a "en_camino", generar la factura con la orden completa
    if (newStatus === 'en_camino') {
      await generateDeliveryInvoice(fullOrder);
      window.location.reload(); // recargar para actualizar la lista
    }

     if (newStatus === 'entregada') {
      
      window.location.reload(); // recargar para actualizar la lista
    }

    // refrescar vista o actualizar estado local según necesites
    // setTimeout(() => location.reload(), 800);
  } catch (err) {
    console.error('Error cambiando estado', err.response?.data || err);
    toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cambiar el estado', life: 4000 });
  }
}

// Ajuste en generateDeliveryInvoice: si recibe una orden sin items, intenta obtener la orden completa antes de continuar
async function generateDeliveryInvoice(order) {
  if (!order || !order.id) {
    console.warn('generateDeliveryInvoice: faltó pasar la orden');
    return;
  }

  // Asegurarse de tener la orden completa (items, customer, fiscal, etc.)
  if (!order.items || !order.items.length) {
    try {
      const showRes = await axios.get(route('delivery.show', { order: order.id }));
      order = showRes.data?.order || showRes.data || order;
    } catch (e) {
      console.warn('No se pudo obtener orden completa dentro de generateDeliveryInvoice, se continúa con lo disponible.', e);
    }
  }

  if (!nextInvoiceNumber.value) {
    await fetchNextInvoiceNumber();
  }
  if (!nextInvoiceNumber.value) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'No se obtuvo número de factura.', life: 4000 });
    return;
  }

  const sourceOrder = (selectedOrder.value && selectedOrder.value.id === order.id) ? selectedOrder.value : order;

  // normalizar items y calcular subtotal si no viene
  const items = sourceOrder.items || sourceOrder.order_items || [];
  const calculatedSubtotal = items.reduce((acc, it) => {
    const price = Number(it.price ?? it.unit_price ?? 0);
    const qty = Number(it.quantity ?? it.qty ?? 1);
    return acc + price * qty;
  }, 0);

  // calcular descuento si hace falta
  const discountType = sourceOrder.discount_type || null;
  const discountValue = sourceOrder.discount_value != null ? Number(sourceOrder.discount_value) : 0;
  let discountAmount = Number(sourceOrder.discount_amount ?? 0);
  if ((!discountAmount || discountAmount === 0) && discountType && discountValue) {
    try {
      discountAmount = calculateDiscountAmount(calculatedSubtotal, { type: discountType === 'percent' ? 'percent' : 'amount', value: discountValue });
    } catch (e) {
      discountAmount = discountType === 'percent' ? (calculatedSubtotal * discountValue) / 100 : discountValue;
    }
  }

  const subtotalToSend = sourceOrder.subtotal != null ? Number(sourceOrder.subtotal) : Number(calculatedSubtotal.toFixed(2));
  const discount_amount_to_send = discountAmount || 0;
  const totalToSend = sourceOrder.total != null
    ? Number(sourceOrder.total)
    : Number((subtotalToSend - discount_amount_to_send).toFixed(2));

  const fiscal_name_to_send = sourceOrder.fiscal_name || (sourceOrder.customer && sourceOrder.customer.fiscal_name) || '';
  const fiscal_ruc_to_send  = sourceOrder.fiscal_ruc  || (sourceOrder.customer && sourceOrder.customer.fiscal_ruc) || '';

  const payload = {
    invoice_number: nextInvoiceNumber.value,
    order_id: sourceOrder.id,
    fiscal_name: fiscal_name_to_send,
    fiscal_ruc: fiscal_ruc_to_send,
    subtotal: subtotalToSend,
    discount_type: discountType,
    discount_value: discountValue,
    discount_reason: sourceOrder.discount_reason || '',
    discount_amount: discount_amount_to_send,
    total: totalToSend
  };

 

  try {
    const res = await axios.post(route('invoices.delivery.store'), payload);

    // Si el backend devuelve la factura completa la usamos
    let invoiceObj = res.data?.invoice ?? res.data;
    if (!invoiceObj || !invoiceObj.items) {
      // Si no devuelve, construimos la factura desde la orden (fallback)
      invoiceObj = {
        invoice_number: nextInvoiceNumber.value,
        created_at: new Date().toISOString(),
        order_id: sourceOrder.id,
        fiscal_name: fiscal_name_to_send,
        fiscal_ruc: fiscal_ruc_to_send,
        customer_name: sourceOrder.customer_name || (sourceOrder.customer && sourceOrder.customer.name) || '',
        customer_phone: sourceOrder.customer_phone || (sourceOrder.customer && sourceOrder.customer.phone) || '',
        delivery_address: sourceOrder.delivery_address || sourceOrder.address || '',
        items: items.map(it => ({
          product_name: it.product_name || it.name || it.product?.name || 'Producto',
          quantity: Number(it.quantity ?? it.qty ?? 1),
          price: Number(it.price ?? it.unit_price ?? 0)
        })),
        subtotal: subtotalToSend,
        discount_amount: discount_amount_to_send,
        discount_type: discountType,
        discount_value: discountValue,
        discount_reason: sourceOrder.discount_reason || '',
        total: totalToSend,
        payment_method: sourceOrder.payment_method || '',
        cash_amount: sourceOrder.cash_amount || 0,
        rider_name: sourceOrder.rider_name || (sourceOrder.assigned_to ? `Rider #${sourceOrder.assigned_to}` : '')
      };
    }

    // Abrir HTML de la factura
    const html = generateInvoiceHTML(invoiceObj);
    const w = window.open('', '_blank');
    if (!w) {
      toast.add({ severity: 'warn', summary: 'Aviso', detail: 'Permita ventanas emergentes para imprimir la factura.', life: 4000 });
      return res.data;
    }
    w.document.open();
    w.document.write(html);
    w.document.close();

    toast.add({ severity: 'success', summary: 'Éxito', detail: 'Factura generada e impresa.', life: 3000 });
    return res.data;
  } catch (err) {
    console.error('Error al generar factura de delivery:', err);
    const resp = err?.response?.data;
    if (resp?.errors) {
      const messages = Object.values(resp.errors).flat().join(' — ');
      toast.add({ severity: 'error', summary: 'Validación', detail: messages, life: 6000 });
    } else {
      const serverMessage = resp?.message || (typeof resp === 'string' ? resp : null) || err?.response?.statusText || 'No se pudo generar la factura de entrega.';
      toast.add({ severity: 'error', summary: 'Error', detail: serverMessage, life: 5000 });
    }
    return null;
  }
}

function formatCurrency(value) {
  return Number(value ?? 0).toFixed(2);
}

function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function generateInvoiceHTML(invoice) {
  if (!invoice) return '';
  const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
  const date = new Date(invoice.created_at || Date.now()).toLocaleString('es-MX', options);

  const items = invoice.items || invoice.order_items || invoice.products || [];
  const itemsHTML = items.map(it => {
    const name = it.product_name || it.name || it.description || 'Producto';
    const qty = Number(it.quantity ?? it.qty ?? 1);
    const unit = Number(it.price ?? it.unit_price ?? 0);
    const line = qty * unit;
    return `
      <tr>
        <td style="padding:6px 4px; width:32px;">${qty}</td>
        <td style="padding:6px 4px;">${escapeHtml(name)}</td>
        <td style="padding:6px 4px; text-align:right; width:60px;">${formatCurrency(unit)}</td>
        <td style="padding:6px 4px; text-align:right; width:70px;">${formatCurrency(line)}</td>
      </tr>
    `;
  }).join('');

  const subtotal = Number(invoice.subtotal ?? items.reduce((s, it) => s + ((Number(it.price ?? it.unit_price ?? 0)) * (Number(it.quantity ?? it.qty ?? 1))), 0));
  const discountAmount = Number(invoice.discount_amount ?? invoice.discount ?? 0);
  const discountType = invoice.discount_type || (invoice.discount_percent ? 'percent' : (invoice.discount_amount ? 'amount' : null));
  const discountValue = invoice.discount_value ?? invoice.discount_percent ?? null;
  const total = Number(invoice.total ?? (subtotal - discountAmount));

  const paymentMap = { cash: 'Efectivo', card: 'Tarjeta', bank_transfer: 'Transferencia' };
  const paymentMethod = paymentMap[invoice.payment_method] || (invoice.payment_method || '—');
  const cashAmount = Number(invoice.cash_amount ?? 0);

  const discountLabel = discountType === 'percent' ? `(${discountValue ?? 0}%)` : '';

  const fiscalName = invoice.fiscal_name || invoice.customer?.fiscal_name || '';
  const fiscalRuc  = invoice.fiscal_ruc  || invoice.customer?.fiscal_ruc  || '';
  const customerName = invoice.customer_name || invoice.customer?.name || '';
  const phone = invoice.customer_phone || invoice.customer?.phone || '';
  const address = invoice.delivery_address || invoice.address || invoice.customer?.selectedAddress || '';

  const html = `
    <html>
  <head>
    <meta charset="utf-8"/>
    <title>Factura N° ${escapeHtml(String(invoice.invoice_number || invoice.invoiceNumber || '—'))}</title>
    <style>
      body { width: 57mm; font-size: 14px; margin: 0; padding: 4px; font-family: Arial, sans-serif; line-height: 1.2; color: #111; }
      .center { text-align: center; }
      .bold { font-weight: bold; }
      table { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 6px; }
      th, td { text-align: left; padding: 2px 0; }
      th { border-bottom: 1px solid #000; } /* línea negra debajo del encabezado */
      td { border-bottom: 1px solid #ddd; } /* líneas finas grises en los productos */
      .right { text-align: right; }
      .total { text-align: right; font-weight: bold; font-size: 14px; margin-top: 6px; }
      .footer { margin-top: 16px; font-size: 14px; text-align: center; color: black; }
      img { max-width: 50%; height: auto; }
      .muted { color: #666; font-size: 11px; }
      @media print { 
        html, body { width: 57mm; max-height: 300mm; overflow: hidden; margin: 0; padding: 0; } 
      }
    </style>
  </head>
  <body>
    <!-- Logo -->
    <div class="center">
      <img src="/images/SopasLogo.png" alt="Logo" />
    </div>

    <!-- Encabezado -->
    <div class="center space">
      <p class="bold">Sopas Nikas</p>
      <p><strong>Dirección: Del Busto José Martí 2 cuadras al Este, 10 vrs al Norte.</strong></p>
      <p>Teléfono: +505 8352 9705</p>
       
      <p><strong>Factura N°:</strong> ${escapeHtml(String(invoice.invoice_number || invoice.invoiceNumber || '—'))}</p>
     
    </div>

    <hr>

    <!-- Datos de factura -->
    <p><strong>Fecha:</strong> ${date}</p>
    ${customerName ? `<p><strong>Cliente:</strong> ${escapeHtml(customerName)}</p>` : ''}
    ${fiscalName ? `<p><strong>Nombre Fiscal:</strong> ${escapeHtml(fiscalName)}</p>` : ''}
    ${fiscalRuc ? `<p><strong>RUC:</strong> ${escapeHtml(fiscalRuc)}</p>` : ''}
    
    
   

    <!-- Tabla de productos -->
    <table>
      <thead>
        <tr>
          <th>Cant.</th>
          <th>Producto</th>
          <th>Precio</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHTML}
      </tbody>
    </table>

    <!-- Totales -->
    <div class="total">Subtotal: C$${formatCurrency(subtotal)}</div>
    ${discountAmount > 0 ? `
      <div class="total">Descuento ${discountLabel}: -C$${formatCurrency(discountAmount)}</div>
      ${invoice.discount_reason ? `<div class="muted"></div>` : ''}
    ` : ''}
    <div class="total">Total: C$${formatCurrency(total)}</div>

    

    <!-- Footer -->
    <div class="footer">
      <strong>¡Gracias por tu compra!</strong>
    </div>
     
    <div style="margin-top: 50px;">.</div>
    
    <script>
      window.onload = () => window.print();
    <\/script>
  </body>
</html>


  `;
  return html;
}

// Modificar generateDeliveryInvoice para abrir la factura recién creada
// async function generateDeliveryInvoice(order) {
//   if (!order || !order.id) {
//     console.warn('generateDeliveryInvoice: faltó pasar la orden');
//     return;
//   }

//   // Asegurarse de tener la orden completa (items, customer, fiscal, etc.)
//   if (!order.items || !order.items.length) {
//     try {
//       const showRes = await axios.get(route('delivery.show', { order: order.id }));
//       order = showRes.data?.order || showRes.data || order;
//     } catch (e) {
//       console.warn('No se pudo obtener orden completa dentro de generateDeliveryInvoice, se continúa con lo disponible.', e);
//     }
//   }

//   if (!nextInvoiceNumber.value) {
//     await fetchNextInvoiceNumber();
//   }
//   if (!nextInvoiceNumber.value) {
//     toast.add({ severity: 'error', summary: 'Error', detail: 'No se obtuvo número de factura.', life: 4000 });
//     return;
//   }

//   const sourceOrder = (selectedOrder.value && selectedOrder.value.id === order.id) ? selectedOrder.value : order;

//   // normalizar items y calcular subtotal si no viene
//   const items = sourceOrder.items || sourceOrder.order_items || [];
//   const calculatedSubtotal = items.reduce((acc, it) => {
//     const price = Number(it.price ?? it.unit_price ?? 0);
//     const qty = Number(it.quantity ?? it.qty ?? 1);
//     return acc + price * qty;
//   }, 0);

//   // calcular descuento si hace falta
//   const discountType = sourceOrder.discount_type || null;
//   const discountValue = sourceOrder.discount_value != null ? Number(sourceOrder.discount_value) : 0;
//   let discountAmount = Number(sourceOrder.discount_amount ?? 0);
//   if ((!discountAmount || discountAmount === 0) && discountType && discountValue) {
//     try {
//       discountAmount = calculateDiscountAmount(calculatedSubtotal, { type: discountType === 'percent' ? 'percent' : 'amount', value: discountValue });
//     } catch (e) {
//       discountAmount = discountType === 'percent' ? (calculatedSubtotal * discountValue) / 100 : discountValue;
//     }
//   }

//   const subtotalToSend = sourceOrder.subtotal != null ? Number(sourceOrder.subtotal) : Number(calculatedSubtotal.toFixed(2));
//   const discount_amount_to_send = discountAmount || 0;
//   const totalToSend = sourceOrder.total != null
//     ? Number(sourceOrder.total)
//     : Number((subtotalToSend - discount_amount_to_send).toFixed(2));

//   const fiscal_name_to_send = sourceOrder.fiscal_name || (sourceOrder.customer && sourceOrder.customer.fiscal_name) || '';
//   const fiscal_ruc_to_send  = sourceOrder.fiscal_ruc  || (sourceOrder.customer && sourceOrder.customer.fiscal_ruc) || '';

//   const payload = {
//     invoice_number: nextInvoiceNumber.value,
//     order_id: sourceOrder.id,
//     fiscal_name: fiscal_name_to_send,
//     fiscal_ruc: fiscal_ruc_to_send,
//     subtotal: subtotalToSend,
//     discount_type: discountType,
//     discount_value: discountValue,
//     discount_reason: sourceOrder.discount_reason || '',
//     discount_amount: discount_amount_to_send,
//     total: totalToSend
//   };

//   console.log('Enviando datos para generar factura (delivery):', payload);

//   try {
//     const res = await axios.post(route('invoices.delivery.store'), payload);

//     // Si el backend devuelve la factura completa la usamos
//     let invoiceObj = res.data?.invoice ?? res.data;
//     if (!invoiceObj || !invoiceObj.items) {
//       // Si no devuelve, construimos la factura desde la orden (fallback)
//       invoiceObj = {
//         invoice_number: nextInvoiceNumber.value,
//         created_at: new Date().toISOString(),
//         order_id: sourceOrder.id,
//         fiscal_name: fiscal_name_to_send,
//         fiscal_ruc: fiscal_ruc_to_send,
//         customer_name: sourceOrder.customer_name || (sourceOrder.customer && sourceOrder.customer.name) || '',
//         customer_phone: sourceOrder.customer_phone || (sourceOrder.customer && sourceOrder.customer.phone) || '',
//         delivery_address: sourceOrder.delivery_address || sourceOrder.address || '',
//         items: items.map(it => ({
//           product_name: it.product_name || it.name || it.product?.name || 'Producto',
//           quantity: Number(it.quantity ?? it.qty ?? 1),
//           price: Number(it.price ?? it.unit_price ?? 0)
//         })),
//         subtotal: subtotalToSend,
//         discount_amount: discount_amount_to_send,
//         discount_type: discountType,
//         discount_value: discountValue,
//         discount_reason: sourceOrder.discount_reason || '',
//         total: totalToSend,
//         payment_method: sourceOrder.payment_method || '',
//         cash_amount: sourceOrder.cash_amount || 0,
//         rider_name: sourceOrder.rider_name || (sourceOrder.assigned_to ? `Rider #${sourceOrder.assigned_to}` : '')
//       };
//     }

//     // Abrir HTML de la factura
//     const html = generateInvoiceHTML(invoiceObj);
//     const w = window.open('', '_blank');
//     if (!w) {
//       toast.add({ severity: 'warn', summary: 'Aviso', detail: 'Permita ventanas emergentes para imprimir la factura.', life: 4000 });
//       return res.data;
//     }
//     w.document.open();
//     w.document.write(html);
//     w.document.close();

//     toast.add({ severity: 'success', summary: 'Éxito', detail: 'Factura generada e impresa.', life: 3000 });
//     return res.data;
//   } catch (err) {
//     console.error('Error al generar factura de delivery:', err);
//     const resp = err?.response?.data;
//     if (resp?.errors) {
//       const messages = Object.values(resp.errors).flat().join(' — ');
//       toast.add({ severity: 'error', summary: 'Validación', detail: messages, life: 6000 });
//     } else {
//       const serverMessage = resp?.message || (typeof resp === 'string' ? resp : null) || err?.response?.statusText || 'No se pudo generar la factura de entrega.';
//       toast.add({ severity: 'error', summary: 'Error', detail: serverMessage, life: 5000 });
//     }
//     return null;
//   }
// }

</script>

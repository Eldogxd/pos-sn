<template>
  <AppLayout title="Delivery">
    <template #header>
      <NavDelivery />
    </template>

    <Toast />
    <ConfirmDialog group="delivery" />

    <div class="p-3 mx-auto space-y-4 max-w-7xl sm:p-6">
      <!-- Barra superior: Título, Filtros de estado y Nueva orden -->
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-xl font-bold text-gray-900 sm:text-2xl">Órdenes Delivery</h1>
          <p class="text-xs text-gray-500">Gestiona pedidos activos, motorizados y facturación</p>
        </div>
        <button @click="openModal" class="w-full btn btn-primary sm:w-auto">
          <i class="text-xs pi pi-plus"></i>
          <span>Nueva orden</span>
        </button>
      </div>

      <!-- Pills de estado (scroll horizontal en móvil) -->
      <div class="flex items-center gap-2 pb-1 overflow-x-auto no-scrollbar">
        <button
          @click="statusFilter = 'all'"
          class="pill shrink-0"
          :class="statusFilter === 'all' ? 'pill-active' : ''"
        >
          Todas ({{ statusCounts.all }})
        </button>
        <button
          @click="statusFilter = 'abierta'"
          class="pill shrink-0"
          :class="statusFilter === 'abierta' ? 'pill-active' : ''"
        >
          Abiertas ({{ statusCounts.abierta }})
        </button>
        <button
          @click="statusFilter = 'asignada'"
          class="pill shrink-0"
          :class="statusFilter === 'asignada' ? 'pill-active' : ''"
        >
          Asignadas ({{ statusCounts.asignada }})
        </button>
        <button
          @click="statusFilter = 'en_camino'"
          class="pill shrink-0"
          :class="statusFilter === 'en_camino' ? 'pill-active' : ''"
        >
          En camino ({{ statusCounts.en_camino }})
        </button>
      </div>

      <!-- Empty state -->
      <div v-if="filteredOrders.length === 0" class="p-10 text-center card">
        <i class="text-3xl text-gray-300 pi pi-truck"></i>
        <p class="mt-2 text-sm font-medium text-gray-600">No hay órdenes en esta vista</p>
        <button v-if="statusFilter !== 'all'" @click="statusFilter = 'all'" class="mt-3 text-xs btn btn-secondary">
          Ver todas las órdenes
        </button>
      </div>

      <!-- Grid de tarjetas de delivery -->
      <div v-else class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="order in filteredOrders"
          :key="order.id"
          @click="openOrder(order)"
          class="flex flex-col justify-between p-4 transition cursor-pointer card hover:shadow-md hover:border-mantis-300 active:scale-[0.99]"
        >
          <div>
            <!-- Encabezado tarjeta -->
            <div class="flex items-start justify-between gap-2">
              <div class="flex items-center min-w-0 gap-2">
                <span class="font-bold text-gray-900">#{{ order.id }}</span>
                <span
                  class="px-2 py-0.5 text-[11px] font-semibold border rounded-full"
                  :class="orderStatusMeta(order.status).badge"
                >
                  {{ orderStatusMeta(order.status).label }}
                </span>
              </div>
              <span class="text-base font-extrabold text-mantis-700 tabular-nums shrink-0">
                C${{ money(order.total) }}
              </span>
            </div>

            <!-- Cliente y dirección -->
            <div class="mt-2.5 space-y-1">
              <div class="flex items-center justify-between gap-2">
                <p class="font-semibold text-gray-900 truncate">{{ order.customer_name || 'Sin cliente' }}</p>
                <span v-if="order.customer_phone" class="text-xs text-gray-500 shrink-0 tabular-nums">
                  <i class="pi pi-phone text-[10px] mr-0.5"></i>{{ order.customer_phone }}
                </span>
              </div>
              <p class="text-xs text-gray-600 line-clamp-2">
                <i class="pi pi-map-marker text-[10px] mr-1 text-gray-400"></i>{{ order.delivery_address || 'Sin dirección' }}
              </p>
            </div>

            <!-- Productos resumidos (máx 3 para evitar tarjetas enormes) -->
            <div v-if="order.items && order.items.length" class="flex flex-wrap gap-1 mt-3">
              <span
                v-for="(it, idx) in order.items.slice(0, 3)"
                :key="idx"
                class="px-2 py-0.5 text-[11px] font-medium text-gray-700 bg-gray-100 rounded-md truncate max-w-[180px]"
              >
                {{ it.quantity }}× {{ it.product_name }}
              </span>
              <span
                v-if="order.items.length > 3"
                class="px-2 py-0.5 text-[11px] font-semibold text-mantis-700 bg-mantis-50 rounded-md"
              >
                +{{ order.items.length - 3 }} más
              </span>
            </div>
          </div>

          <!-- Footer de tarjeta: Rider y acciones rápidas -->
          <div class="flex items-center justify-between gap-2 pt-3 mt-3 border-t border-gray-100" @click.stop>
            <button
              @click="openRiderModal(order)"
              class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg transition"
              :class="order.rider_name ? 'bg-mantis-50 text-mantis-800 hover:bg-mantis-100' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
            >
              <i class="pi pi-user text-[11px]"></i>
              <span class="truncate max-w-[115px]">{{ order.rider_name || 'Asignar rider' }}</span>
            </button>

            <div class="flex items-center gap-1.5">
              <button
                v-if="order.status === 'asignada'"
                @click="changeOrderStatus(order, 'en_camino')"
                class="btn btn-primary py-1.5 px-2.5 text-xs"
              >
                En camino
              </button>
              <button
                v-else-if="order.status === 'en_camino'"
                @click="changeOrderStatus(order, 'entregada')"
                class="btn btn-primary py-1.5 px-2.5 text-xs"
              >
                Entregada
              </button>
              <button
                @click="openOrder(order)"
                class="btn btn-outline py-1.5 px-2.5 text-xs"
              >
                Detalle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL CREAR / EDITAR ORDEN DELIVERY -->
    <div v-if="showModal" class="modal-backdrop">
      <div class="modal-sheet w-full max-w-6xl lg:h-[90vh]">
        <!-- Header del modal -->
        <div class="modal-header shrink-0">
          <div class="flex items-center gap-2.5 min-w-0">
            <h2 class="truncate modal-title">
              {{ isEditing ? `Editar Orden #${editingOrderId}` : 'Nueva Orden Delivery' }}
            </h2>
            <span class="px-2.5 py-0.5 text-xs font-bold rounded-full bg-mantis-100 text-mantis-800 tabular-nums shrink-0">
              C${{ money(deliveryTotalWithDiscount) }}
            </span>
          </div>
          <button @click="showModal = false" class="icon-btn" aria-label="Cerrar">
            <i class="text-sm pi pi-times"></i>
          </button>
        </div>

        <!-- Tabs para móvil y tablet (< lg) -->
        <div class="grid grid-cols-3 border-b border-gray-200 bg-gray-50 shrink-0 lg:hidden">
          <button
            @click="deliveryTab = 'customer'"
            class="tab"
            :class="deliveryTab === 'customer' ? 'tab-active' : ''"
          >
            <i class="text-xs pi pi-user"></i>
            <span>Cliente</span>
            <span v-if="customer.name" class="w-1.5 h-1.5 rounded-full bg-mantis-600"></span>
          </button>
          <button
            @click="deliveryTab = 'menu'"
            class="tab"
            :class="deliveryTab === 'menu' ? 'tab-active' : ''"
          >
            <i class="text-xs pi pi-th-large"></i>
            <span>Menú</span>
          </button>
          <button
            @click="deliveryTab = 'order'"
            class="tab"
            :class="deliveryTab === 'order' ? 'tab-active' : ''"
          >
            <i class="text-xs pi pi-shopping-cart"></i>
            <span>Orden</span>
            <span v-if="pendingUnits > 0" class="text-white badge bg-mantis-600">{{ pendingUnits }}</span>
          </button>
        </div>

        <!-- Cuerpo de 3 paneles (tabs en < lg, columnas independientes en lg+) -->
        <div class="flex flex-col flex-1 min-h-0 overflow-hidden lg:grid lg:grid-cols-12">
          <!-- COL 1: Cliente, Dirección y Pago -->
          <div
            class="flex-col min-h-0 p-4 space-y-3 overflow-y-auto border-gray-200 lg:col-span-4 lg:border-r lg:flex"
            :class="deliveryTab === 'customer' ? 'flex flex-1' : 'hidden'"
          >
            <!-- Buscar cliente -->
            <div class="relative">
              <label class="label">Buscar cliente existente</label>
              <div class="flex gap-1.5">
                <div class="relative flex-1">
                  <i class="absolute text-xs text-gray-400 -translate-y-1/2 pointer-events-none pi pi-search left-3 top-1/2"></i>
                  <input
                    v-model="searchTerm"
                    @input="searchCustomers"
                    type="text"
                    placeholder="Nombre o teléfono..."
                    class="pl-8 input"
                  >
                </div>
                <button
                  v-if="customer.id || searchTerm"
                  @click="clearCustomer"
                  type="button"
                  class="px-3 btn btn-secondary shrink-0"
                  title="Limpiar cliente"
                >
                  <i class="text-xs pi pi-times"></i>
                </button>
              </div>

              <!-- Dropdown resultados -->
              <ul
                v-if="searchResults.length > 0"
                class="absolute left-0 right-0 z-20 mt-1 overflow-y-auto bg-white border border-gray-200 divide-y divide-gray-100 shadow-lg rounded-xl max-h-52"
              >
                <li
                  v-for="c in searchResults"
                  :key="c.id"
                  @click="selectCustomer(c)"
                  class="px-3 py-2.5 text-sm cursor-pointer hover:bg-mantis-50"
                >
                  <p class="font-semibold text-gray-900">{{ c.name }}</p>
                  <p class="text-xs text-gray-500">{{ c.phone || 'Sin teléfono' }}</p>
                </li>
              </ul>
            </div>

            <!-- Datos básicos -->
            <div class="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div>
                <label class="label">Nombre *</label>
                <input v-model="customer.name" type="text" placeholder="Nombre completo" class="input">
              </div>
              <div>
                <label class="label">Teléfono</label>
                <input v-model="customer.phone" type="text" inputmode="tel" placeholder="8888-8888" class="input">
              </div>
            </div>

            <!-- Dirección -->
            <div>
              <label class="label">Dirección de entrega *</label>
              <div v-if="customer.addresses && customer.addresses.length" class="flex flex-wrap gap-1.5 mb-1.5">
                <button
                  v-for="(addr, idx) in customer.addresses"
                  :key="addr.id || idx"
                  type="button"
                  @click="customer.selectedAddress = addr.address"
                  class="px-2.5 py-1 text-xs font-medium rounded-lg border transition text-left"
                  :class="customer.selectedAddress === addr.address ? 'bg-mantis-50 border-mantis-500 text-mantis-800' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'"
                >
                  {{ addr.address }}
                </button>
              </div>
              <textarea
                v-model="customer.selectedAddress"
                rows="2"
                placeholder="Dirección exacta y referencias..."
                class="resize-none input"
              ></textarea>
            </div>

            <!-- Datos fiscales colapsables -->
            <div class="border border-gray-200 rounded-xl bg-gray-50/70">
              <button
                type="button"
                @click="showFiscalFields = !showFiscalFields"
                class="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-gray-700"
              >
                <span>Datos fiscales (Opcional)</span>
                <i :class="showFiscalFields ? 'pi pi-chevron-up' : 'pi pi-chevron-down'" class="text-[11px]"></i>
              </button>
              <div v-if="showFiscalFields" class="grid grid-cols-1 gap-2 px-3 pb-3 sm:grid-cols-2 lg:grid-cols-1">
                <input v-model="customer.fiscal_name" type="text" placeholder="Nombre fiscal / Razón social" class="input">
                <input v-model="customer.fiscal_ruc" type="text" placeholder="RUC / Cédula" class="input">
              </div>
            </div>

            <!-- Método de pago -->
            <div>
              <label class="label">Método de pago *</label>
              <div class="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  @click="paymentMethod = 'cash'"
                  class="flex flex-col items-center gap-1 px-2 py-2 text-xs font-semibold transition border rounded-xl"
                  :class="paymentMethod === 'cash' ? 'bg-mantis-50 border-mantis-500 text-mantis-800' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'"
                >
                  <i class="text-sm pi pi-money-bill"></i>
                  <span>Efectivo</span>
                </button>
                <button
                  type="button"
                  @click="paymentMethod = 'card'"
                  class="flex flex-col items-center gap-1 px-2 py-2 text-xs font-semibold transition border rounded-xl"
                  :class="paymentMethod === 'card' ? 'bg-mantis-50 border-mantis-500 text-mantis-800' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'"
                >
                  <i class="text-sm pi pi-credit-card"></i>
                  <span>Tarjeta</span>
                </button>
                <button
                  type="button"
                  @click="paymentMethod = 'bank_transfer'"
                  class="flex flex-col items-center gap-1 px-2 py-2 text-xs font-semibold transition border rounded-xl"
                  :class="paymentMethod === 'bank_transfer' ? 'bg-mantis-50 border-mantis-500 text-mantis-800' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'"
                >
                  <i class="text-sm pi pi-building-columns"></i>
                  <span>Transf.</span>
                </button>
              </div>
              <div v-if="paymentMethod === 'cash'" class="mt-2">
                <label class="label">Con cuánto paga (C$)</label>
                <input v-model.number="cashAmount" type="number" step="0.01" min="0" placeholder="0.00" class="input">
              </div>
            </div>

            <!-- Indicaciones -->
            <div class="grid grid-cols-1 gap-2">
              <div>
                <label class="label">Indicaciones de cocina / orden</label>
                <input v-model="orderInstructions" type="text" placeholder="Ej: Sin cebolla, cubiertos..." class="input">
              </div>
              <div>
                <label class="label">Notas para el motorizado</label>
                <input v-model="deliveryNotes" type="text" placeholder="Ej: Casa portón verde, llamar al llegar..." class="input">
              </div>
            </div>

            <!-- Botón continuar en móvil -->
            <div class="pt-2 mt-auto lg:hidden">
              <button @click="deliveryTab = 'menu'" type="button" class="w-full btn btn-primary">
                <span>Continuar al menú</span>
                <i class="text-xs pi pi-arrow-right"></i>
              </button>
            </div>
          </div>

          <!-- COL 2: Catálogo de productos -->
          <div
            class="flex-col min-h-0 border-gray-200 lg:col-span-4 xl:col-span-5 lg:border-r lg:flex"
            :class="deliveryTab === 'menu' ? 'flex flex-1' : 'hidden'"
          >
            <!-- Buscador y categorías sticky -->
            <div class="p-3 space-y-2.5 bg-white border-b border-gray-200 shrink-0">
              <div class="relative">
                <i class="absolute text-xs text-gray-400 -translate-y-1/2 pointer-events-none pi pi-search left-3 top-1/2"></i>
                <input
                  v-model="productSearch"
                  type="text"
                  placeholder="Buscar producto..."
                  class="pl-8 pr-8 input"
                >
                <button
                  v-if="productSearch"
                  @click="productSearch = ''"
                  type="button"
                  class="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <i class="text-xs pi pi-times"></i>
                </button>
              </div>

              <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                <button
                  @click="activeCategory = 'all'"
                  type="button"
                  class="pill shrink-0"
                  :class="activeCategory === 'all' ? 'pill-active' : ''"
                >
                  Todos
                </button>
                <button
                  v-for="cat in deliveryCategories"
                  :key="cat"
                  @click="activeCategory = cat"
                  type="button"
                  class="pill shrink-0"
                  :class="activeCategory === cat ? 'pill-active' : ''"
                >
                  {{ cat }}
                </button>
              </div>
            </div>

            <!-- Lista de productos -->
            <div class="flex-1 min-h-0 p-3 space-y-4 overflow-y-auto">
              <div v-if="visibleDeliveryCatalog.length === 0" class="py-10 text-sm text-center text-gray-500">
                No se encontraron productos
              </div>

              <div v-for="group in visibleDeliveryCatalog" :key="group.category" class="space-y-2">
                <h4 class="text-xs font-bold tracking-wider text-gray-400 uppercase">{{ group.category }}</h4>
                <div class="grid grid-cols-2 gap-2 xl:grid-cols-3">
                  <button
                    v-for="item in group.items"
                    :key="item.id"
                    @click="addProduct(item)"
                    type="button"
                    class="product-tile"
                    :class="qtyInDeliveryOrder[item.id] ? 'border-mantis-400 bg-mantis-50/40' : ''"
                  >
                    <div class="flex items-start justify-between gap-1">
                      <span class="text-xs font-semibold text-left text-gray-800 line-clamp-2">{{ item.name }}</span>
                      <span
                        v-if="qtyInDeliveryOrder[item.id]"
                        class="px-1.5 py-0.5 text-[10px] font-bold text-white rounded-full bg-mantis-600 shrink-0 tabular-nums"
                      >
                        {{ qtyInDeliveryOrder[item.id] }}
                      </span>
                    </div>
                    <div class="flex items-center justify-between w-full pt-2 mt-auto">
                      <span class="text-xs font-bold text-mantis-700 tabular-nums">
                        {{ item.is_generic ? 'Precio manual' : `C$${money(item.price)}` }}
                      </span>
                      <i v-if="item.is_generic" class="pi pi-sliders-h text-[11px] text-amber-600"></i>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <!-- Barra inferior flotante móvil/tablet para pasar a Orden -->
            <div v-if="pendingUnits > 0" class="p-3 bg-white border-t border-gray-200 shrink-0 lg:hidden">
              <button @click="deliveryTab = 'order'" type="button" class="justify-between w-full btn btn-primary">
                <span>Ver orden ({{ pendingUnits }})</span>
                <span class="font-extrabold tabular-nums">C${{ money(deliveryTotalWithDiscount) }}</span>
              </button>
            </div>
          </div>

          <!-- COL 3: Tu Orden (compacto 1 fila por producto) -->
          <div
            class="flex-col min-h-0 bg-gray-50/60 lg:col-span-4 xl:col-span-3 lg:flex"
            :class="deliveryTab === 'order' ? 'flex flex-1' : 'hidden'"
          >
            <!-- Lista compacta de productos -->
            <div class="flex-1 min-h-0 overflow-y-auto bg-white divide-y divide-gray-200/80">
              <div v-if="selectedProducts.length === 0" class="flex flex-col items-center justify-center h-40 p-6 text-center text-gray-400">
                <i class="pi pi-shopping-bag text-2xl mb-1.5"></i>
                <p class="text-xs">Agrega productos del menú</p>
              </div>

              <div
                v-for="(p, idx) in selectedProducts"
                :key="itemKey(p, idx)"
                class="flex items-center justify-between gap-2 px-3 py-2"
              >
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-1.5 min-w-0">
                    <p class="text-xs font-semibold text-gray-900 truncate">{{ p.name }}</p>
                    <span v-if="p.is_active === false" class="px-1.5 py-0.5 text-[10px] font-semibold text-amber-700 bg-amber-100 rounded shrink-0">Inactivo</span>
                  </div>
                  <p class="text-[11px] text-gray-500 tabular-nums">C${{ money(p.price) }} c/u</p>
                </div>

                <div class="flex items-center gap-2 shrink-0">
                  <div class="stepper">
                    <button @click="decreaseQuantity(p)" type="button" aria-label="Disminuir">
                      <i class="pi pi-minus text-[10px]"></i>
                    </button>
                    <span>{{ p.quantity }}</span>
                    <button @click="increaseQuantity(p)" :class="p.is_active === false ? '!opacity-45' : ''" type="button" aria-label="Aumentar">
                      <i class="pi pi-plus text-[10px]"></i>
                    </button>
                  </div>
                  <span class="text-xs font-bold text-right text-gray-900 w-14 tabular-nums">
                    C${{ money(p.price * p.quantity) }}
                  </span>
                  <button
                    @click="removeProduct(p)"
                    type="button"
                    class="p-1 text-gray-400 transition hover:text-red-600"
                    title="Quitar"
                  >
                    <i class="text-xs pi pi-trash"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Descuento y resumen sticky -->
            <div class="p-3 space-y-2.5 bg-white border-t border-gray-200 shrink-0">
              <!-- Toggle descuento -->
              <label class="flex items-center justify-between cursor-pointer select-none">
                <span class="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                  <i class="pi pi-percentage text-[11px] text-amber-600"></i>
                  Aplicar descuento
                </span>
                <input v-model="toggleDeliveryDiscount" type="checkbox" class="checkbox">
              </label>

              <div v-if="toggleDeliveryDiscount" class="p-2.5 space-y-2 rounded-xl bg-amber-50/70 border border-amber-200">
                <div class="flex items-center gap-2">
                  <div class="segmented shrink-0">
                    <button
                      type="button"
                      @click="deliveryDiscountType = 'amount'"
                      :class="deliveryDiscountType === 'amount' ? 'bg-white shadow-sm text-gray-900' : ''"
                    >C$</button>
                    <button
                      type="button"
                      @click="deliveryDiscountType = 'percent'"
                      :class="deliveryDiscountType === 'percent' ? 'bg-white shadow-sm text-gray-900' : ''"
                    >%</button>
                  </div>
                  <input
                    v-model.number="deliveryDiscountValue"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Valor"
                    class="input flex-1 py-1.5 text-xs"
                  >
                </div>
                <input
                  v-model="deliveryDiscountReason"
                  type="text"
                  placeholder="Motivo del descuento (opcional)"
                  class="input py-1.5 text-xs"
                >
              </div>

              <!-- Totales -->
              <div class="space-y-1 text-xs">
                <div class="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span class="font-medium tabular-nums">C${{ money(deliveryTotal) }}</span>
                </div>
                <div v-if="deliveryDiscountAmount > 0" class="flex justify-between text-amber-700">
                  <span>Descuento</span>
                  <span class="font-medium tabular-nums">-C${{ money(deliveryDiscountAmount) }}</span>
                </div>
                <div class="flex justify-between pt-1.5 text-base font-extrabold text-gray-900 border-t border-gray-100">
                  <span>Total</span>
                  <span class="text-mantis-700 tabular-nums">C${{ money(deliveryTotalWithDiscount) }}</span>
                </div>
              </div>

              <!-- Botones -->
              <div class="flex gap-2 pt-1 pb-safe">
                <button @click="showModal = false" type="button" class="flex-1 btn btn-secondary">
                  Cancelar
                </button>
                <button @click="submitOrder" type="button" class="btn btn-primary flex-[2]">
                  <i class="text-xs pi pi-check"></i>
                  <span>{{ isEditing ? 'Actualizar' : 'Crear Orden' }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL DETALLE DE ORDEN -->
    <div v-if="showOrderModal && selectedOrder" class="modal-backdrop">
      <div class="modal-sheet w-full max-w-3xl lg:h-auto lg:max-h-[90vh]">
        <div class="modal-header shrink-0">
          <div class="flex items-center gap-2.5">
            <h3 class="modal-title">Orden #{{ selectedOrder.id }}</h3>
            <span
              class="px-2.5 py-0.5 text-xs font-semibold border rounded-full"
              :class="orderStatusMeta(selectedOrder.status).badge"
            >
              {{ orderStatusMeta(selectedOrder.status).label }}
            </span>
          </div>
          <button @click="closeOrderModal" class="icon-btn">
            <i class="text-sm pi pi-times"></i>
          </button>
        </div>

        <div class="flex-1 min-h-0 p-4 space-y-4 overflow-y-auto sm:p-5">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-5">
            <!-- Cliente y resumen -->
            <div class="space-y-3 md:col-span-2">
              <div class="p-3.5 space-y-2 border border-gray-200 rounded-xl bg-gray-50/60">
                <p class="text-[11px] font-bold tracking-wider text-gray-400 uppercase">Cliente</p>
                <p class="font-bold text-gray-900">{{ selectedOrder.customer_name }}</p>
                <p v-if="selectedOrder.customer_phone" class="text-xs text-gray-600">
                  <i class="pi pi-phone text-[10px] mr-1"></i>{{ selectedOrder.customer_phone }}
                </p>
                <p class="text-xs text-gray-700 whitespace-pre-line">
                  <i class="pi pi-map-marker text-[10px] mr-1 text-gray-400"></i>{{ selectedOrder.delivery_address }}
                </p>
                <div class="pt-2 space-y-1 text-xs text-gray-600 border-t border-gray-200">
                  <p><span class="text-gray-400">Fiscal:</span> {{ selectedOrder.fiscal_name || '—' }}</p>
                  <p><span class="text-gray-400">RUC:</span> {{ selectedOrder.fiscal_ruc || '—' }}</p>
                  <p v-if="selectedOrder.rider_name">
                    <span class="text-gray-400">Rider:</span> <strong class="text-mantis-700">{{ selectedOrder.rider_name }}</strong>
                  </p>
                </div>
              </div>

              <div class="p-3.5 space-y-1.5 border border-gray-200 rounded-xl bg-white">
                <p class="text-[11px] font-bold tracking-wider text-gray-400 uppercase">Resumen</p>
                <div class="flex justify-between text-xs text-gray-600">
                  <span>Subtotal</span>
                  <span class="font-medium tabular-nums">
                    C${{ money(selectedOrder.subtotal ?? (selectedOrder.items ? selectedOrder.items.reduce((a, i) => a + (parseFloat(i.price) || 0) * i.quantity, 0) : 0)) }}
                  </span>
                </div>
                <div v-if="selectedOrder.discount_amount && selectedOrder.discount_amount > 0" class="text-xs text-amber-700">
                  <div class="flex justify-between">
                    <span>Descuento<span v-if="selectedOrder.discount_type === 'percent'"> ({{ selectedOrder.discount_value }}%)</span></span>
                    <span class="tabular-nums">-C${{ money(selectedOrder.discount_amount) }}</span>
                  </div>
                  <p v-if="selectedOrder.discount_reason" class="text-[11px] text-amber-600 mt-0.5">
                    Motivo: {{ selectedOrder.discount_reason }}
                  </p>
                </div>
                <div class="flex justify-between pt-1.5 text-base font-extrabold border-t border-gray-100">
                  <span>Total</span>
                  <span class="text-mantis-700 tabular-nums">C${{ money(selectedOrder.total) }}</span>
                </div>
              </div>
            </div>

            <!-- Lista de productos -->
            <div class="md:col-span-3">
              <p class="mb-2 text-[11px] font-bold tracking-wider text-gray-400 uppercase">Productos</p>
              <div v-if="selectedOrder.items && selectedOrder.items.length" class="overflow-hidden bg-white border border-gray-200 divide-y divide-gray-100 rounded-xl">
                <div
                  v-for="(it, idx) in selectedOrder.items"
                  :key="idx"
                  class="flex items-center justify-between gap-3 px-3.5 py-2.5 text-sm"
                >
                  <div class="min-w-0">
                    <p class="font-medium text-gray-900 truncate">{{ it.product_name }}</p>
                    <p class="text-xs text-gray-500 tabular-nums">{{ it.quantity }} × C${{ money(it.price) }}</p>
                  </div>
                  <span class="font-bold text-gray-900 tabular-nums shrink-0">
                    C${{ money(parseFloat(it.price) * it.quantity) }}
                  </span>
                </div>
              </div>
              <p v-else class="p-6 text-sm text-center text-gray-500 border border-gray-200 rounded-xl">
                No hay items cargados.
              </p>
            </div>
          </div>
        </div>

        <!-- Footer de acciones -->
        <div class="flex-wrap justify-between gap-2 modal-footer pb-safe">
          <div class="flex flex-wrap gap-2">
            <button @click="startEditOrder" class="text-xs btn btn-outline">
              <i class="text-xs pi pi-pencil"></i>
              <span>Editar</span>
            </button>
            <button
              v-if="selectedOrder.status !== 'entregada' && selectedOrder.status !== 'cancelada'"
              @click="confirmCancelOrder(selectedOrder)"
              class="text-xs btn btn-danger"
            >
              <i class="text-xs pi pi-ban"></i>
              <span>Anular</span>
            </button>
          </div>
          <div class="flex flex-wrap gap-2 ml-auto">
            <button @click="openRiderModal(selectedOrder)" class="text-xs btn btn-secondary">
              <i class="text-xs pi pi-user"></i>
              <span>{{ selectedOrder.rider_name ? 'Cambiar Rider' : 'Asignar Rider' }}</span>
            </button>
            <button
              v-if="selectedOrder.status === 'asignada'"
              @click="changeOrderStatus(selectedOrder, 'en_camino')"
              class="text-xs btn btn-primary"
            >
              Marcar En Camino
            </button>
            <button
              v-if="selectedOrder.status === 'en_camino'"
              @click="changeOrderStatus(selectedOrder, 'entregada')"
              class="text-xs btn btn-primary"
            >
              Marcar Entregada
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL ASIGNAR RIDER (lista táctil) -->
    <div v-if="showRiderModal" class="modal-backdrop">
      <div class="w-full max-w-md modal-sheet lg:h-auto">
        <div class="modal-header">
          <h3 class="modal-title">Asignar Motorizado</h3>
          <button @click="closeRiderModal" class="icon-btn">
            <i class="text-sm pi pi-times"></i>
          </button>
        </div>

        <div class="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
          <button
            type="button"
            @click="riderForm.rider_id = null"
            class="flex items-center justify-between w-full px-3.5 py-2.5 text-sm font-medium border rounded-xl transition"
            :class="riderForm.rider_id === null ? 'border-mantis-500 bg-mantis-50 text-mantis-800' : 'border-gray-200 hover:bg-gray-50 text-gray-700'"
          >
            <span>Sin asignar</span>
            <i v-if="riderForm.rider_id === null" class="text-xs pi pi-check text-mantis-600"></i>
          </button>

          <button
            v-for="r in props.riders"
            :key="r.id"
            type="button"
            @click="riderForm.rider_id = r.id"
            class="flex items-center justify-between w-full px-3.5 py-2.5 text-sm font-medium border rounded-xl transition"
            :class="riderForm.rider_id === r.id ? 'border-mantis-500 bg-mantis-50 text-mantis-800' : 'border-gray-200 hover:bg-gray-50 text-gray-800'"
          >
            <span class="flex items-center gap-2">
              <i class="text-xs text-gray-400 pi pi-user"></i>
              <span>{{ r.name }}</span>
            </span>
            <i v-if="riderForm.rider_id === r.id" class="text-xs pi pi-check text-mantis-600"></i>
          </button>
        </div>

        <div class="justify-end gap-2 modal-footer pb-safe">
          <button @click="closeRiderModal" type="button" class="btn btn-secondary">Cancelar</button>
          <button @click="submitRider" type="button" class="btn btn-primary">Guardar</button>
        </div>
      </div>
    </div>

    <!-- MODAL PRECIO MANUAL -->
    <div v-if="showCustomModal" class="modal-backdrop">
      <div class="w-full max-w-sm modal-sheet lg:h-auto">
        <div class="modal-header">
          <h3 class="flex items-center gap-2 modal-title">
            <FontAwesomeIcon :icon="faWeightScale" class="text-mantis-600" />
            <span>{{ selectedProduct?.name || 'Precio manual' }}</span>
          </h3>
          <button @click="showCustomModal = false" class="icon-btn">
            <i class="text-sm pi pi-times"></i>
          </button>
        </div>
        <div class="p-4 space-y-3">
          <div>
            <label class="label">Precio unitario (C$)</label>
            <input
              v-model.number="customPrice"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              class="text-lg font-bold input"
              @keyup.enter="addWithCustomPrice"
            >
          </div>
        </div>
        <div class="justify-end gap-2 modal-footer pb-safe">
          <button @click="showCustomModal = false" type="button" class="btn btn-secondary">Cancelar</button>
          <button @click="addWithCustomPrice" type="button" class="btn btn-primary">Agregar</button>
        </div>
      </div>
    </div>
  </AppLayout>
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

// Filtros y estado de UI responsiva
const statusFilter = ref('all');
const deliveryTab = ref('customer'); // 'customer' | 'menu' | 'order'
const productSearch = ref('');
const activeCategory = ref('all');
const showFiscalFields = ref(false);

const money = (value) => (Number(value) || 0).toFixed(2);
const itemKey = (p, idx) => p.temp_id || (p.is_manual_price ? `m-${p.id}-${idx}` : `p-${p.id}`);

const statusCounts = computed(() => {
  const list = props.orders || [];
  return {
    all: list.length,
    abierta: list.filter(o => o.status === 'abierta').length,
    asignada: list.filter(o => o.status === 'asignada').length,
    en_camino: list.filter(o => o.status === 'en_camino').length,
  };
});

const filteredOrders = computed(() => {
  const list = props.orders || [];
  if (statusFilter.value === 'all') return list;
  return list.filter(o => o.status === statusFilter.value);
});

function orderStatusMeta(status) {
  switch (status) {
    case 'abierta':
      return { label: 'Abierta', badge: 'bg-amber-100 text-amber-800 border-amber-200' };
    case 'asignada':
      return { label: 'Asignada', badge: 'bg-mantis-100 text-mantis-800 border-mantis-200' };
    case 'en_camino':
      return { label: 'En camino', badge: 'bg-gray-900 text-white border-gray-900' };
    case 'entregada':
      return { label: 'Entregada', badge: 'bg-gray-100 text-gray-700 border-gray-200' };
    case 'cancelada':
      return { label: 'Cancelada', badge: 'bg-red-100 text-red-700 border-red-200' };
    default:
      return { label: (status || 'Pendiente').replace('_', ' '), badge: 'bg-gray-100 text-gray-700 border-gray-200' };
  }
}

const deliveryCategories = computed(() => Object.keys(groupedProducts.value || {}));

const visibleDeliveryCatalog = computed(() => {
  const groups = groupedProducts.value || {};
  const q = productSearch.value.trim().toLowerCase();
  const cats = activeCategory.value === 'all'
    ? Object.keys(groups)
    : (groups[activeCategory.value] ? [activeCategory.value] : []);

  return cats
    .map(category => ({
      category,
      items: (groups[category] || []).filter(item =>
        !q || (item.name || '').toLowerCase().includes(q)
      ),
    }))
    .filter(g => g.items.length > 0);
});

const pendingUnits = computed(() =>
  selectedProducts.value.reduce((sum, p) => sum + (Number(p.quantity) || 0), 0)
);

const qtyInDeliveryOrder = computed(() => {
  const map = {};
  for (const p of selectedProducts.value) {
    map[p.id] = (map[p.id] || 0) + (Number(p.quantity) || 0);
  }
  return map;
});

const deliveryDiscountAmount = computed(() => {
  return calculateDiscountAmount(deliveryTotal.value, appliedDeliveryDiscount.value);
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
    toggleDeliveryDiscount.value = false;
    deliveryDiscountType.value = 'amount';
    deliveryDiscountValue.value = 0;
    deliveryDiscountReason.value = '';
    appliedDeliveryDiscount.value = null;
    deliveryTab.value = 'customer';
    productSearch.value = '';
    activeCategory.value = 'all';
    showFiscalFields.value = false;
 
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

function findSelectedIndex(product) {
  const exactIdx = selectedProducts.value.indexOf(product);
  if (exactIdx !== -1) return exactIdx;
  return selectedProducts.value.findIndex(p =>
    (p.temp_id && p.temp_id === product.temp_id) ||
    (!p.temp_id && !product.temp_id && p.id === product.id)
  );
}

function increaseQuantity(product) {
  const index = findSelectedIndex(product);
  if (index !== -1) {
    if (selectedProducts.value[index].is_active === false) {
      toast.add({
        severity: 'warn',
        summary: 'Producto inactivo',
        detail: `No se pueden agregar más unidades de "${selectedProducts.value[index].name}" porque ya no está activo.`,
        life: 3500
      });
      return;
    }
    selectedProducts.value[index].quantity += 1;
  }
}

function decreaseQuantity(product) {
  const index = findSelectedIndex(product);
  
  if (index !== -1) {
    if (selectedProducts.value[index].quantity > 1) {
      selectedProducts.value[index].quantity -= 1;
    } else {
      removeProduct(product);
    }
  }
}

function removeProduct(product) {
  const index = findSelectedIndex(product);
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
    return (total * Math.min(discount.value, 100)) / 100;
  }
  return Math.min(discount.value, total);
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

watch([toggleDeliveryDiscount, deliveryDiscountType, deliveryDiscountValue, deliveryDiscountReason], ([enabled]) => {
  if (!enabled) {
    appliedDeliveryDiscount.value = null;
    deliveryDiscountValue.value = 0;
    deliveryDiscountReason.value = '';
    return;
  }
  if (!deliveryDiscountType.value) deliveryDiscountType.value = 'amount';
  const val = Number(deliveryDiscountValue.value) || 0;
  appliedDeliveryDiscount.value = val > 0
    ? {
        type: deliveryDiscountType.value,
        value: val,
        reason: deliveryDiscountReason.value || '',
      }
    : null;
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
    id: o.customer_id || null,
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
    is_manual_price: false,
    is_active: it.is_active ?? true
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
  showFiscalFields.value = Boolean(o.fiscal_name || o.fiscal_ruc);
  deliveryTab.value = 'order';
  productSearch.value = '';
  activeCategory.value = 'all';

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
    const msg = error.response?.data?.errors?.products?.[0] || error.response?.data?.message || 'Hubo un error al guardar la orden. Revise los datos.';
    toast.add({ severity: 'error', summary: 'Error', detail: msg, life: 4000 });
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
      <td style="padding:4px 6px; width:30px;">${escapeHtml(i.qty)}</td>
      <td style="padding:4px 6px;">${escapeHtml(i.name)}</td>
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

        <p><strong>Fecha:</strong> ${escapeHtml(date)}</p>
        <p><strong>Tipo:</strong> ${escapeHtml(tipoOrdenTexto)}</p>

        ${customerName ? `<p><strong>Cliente:</strong> ${escapeHtml(customerName)}</p>` : ''}
        ${phone ? `<p><strong>Teléfono:</strong> ${escapeHtml(phone)}</p>` : ''}
        ${address ? `<p><strong>Dirección:</strong> ${escapeHtml(address)}</p>` : ''}
        ${indicationsText ? `<p><strong>Indicaciones:</strong> ${escapeHtml(indicationsText)}</p>` : ''}
        <p><strong>Método de Pago:</strong> ${escapeHtml(paymentMethod)}</p>
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
              <div>Descuento ${escapeHtml(discountLabel)}:</div><div>-C$${Number(discountAmount).toFixed(2)}</div>
            </div>
            ${order.discount_reason ? `<div style="display:flex; justify-content:space-between; font-size: 11px; color: #555;"><div>&nbsp;&nbsp;↳ Razón:</div><div style="text-align:right;">${escapeHtml(order.discount_reason)}</div></div>` : ''}
          ` : ''}
          <div style="display:flex; justify-content:space-between; margin-top:6px; font-weight:800;">
            <div>Total:</div><div>C$${Number(total).toFixed(2)}</div>
          </div>
        </div>

        <div class="footer">Asignado a Rider: ${escapeHtml(assignedRider)}</div>
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
    const resolvedInvoiceNumber = res.data?.invoice_number || nextInvoiceNumber.value;
    nextInvoiceNumber.value = '';

    // Si el backend devuelve la factura completa la usamos
    let invoiceObj = res.data?.invoice ?? res.data;
    if (!invoiceObj || !invoiceObj.items) {
      // Si no devuelve, construimos la factura desde la orden (fallback)
      invoiceObj = {
        invoice_number: resolvedInvoiceNumber,
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

<template>
  <AppLayout title="Caja">
    <template #header>
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h2 class="text-lg font-semibold leading-tight text-gray-800 sm:text-xl">Panel de Caja</h2>
        <NavCashier />
      </div>
    </template>

    <!-- ===================== PANTALLA DE MESAS ===================== -->
    <div class="px-3 py-4 mx-auto max-w-7xl sm:px-6 sm:py-6">

      <!-- Encabezado + accesos rápidos -->
      <div class="flex flex-col gap-3 mb-4 sm:flex-row sm:items-end sm:justify-between sm:mb-6">
        <div class="flex items-end justify-between sm:block">
          <h1 class="text-xl font-bold text-gray-900 sm:text-2xl">Mesas</h1>
          <p class="text-xs text-gray-500 sm:text-sm">
            <span class="font-semibold text-mantis-700">{{ tableStats.free }}</span> libres ·
            <span class="font-semibold text-amber-700">{{ tableStats.busy }}</span> ocupadas
          </p>
        </div>
        <div class="grid grid-cols-1 gap-2 sm:flex sm:gap-3">
          <button @click="openTakeawayModal" class="h-12 btn btn-primary sm:h-11">
            <i class="pi pi-shopping-bag"></i> Para llevar
          </button>

          <!-- <button @click="openPedidosYaModal" class="h-12 btn btn-pedidosya sm:h-11">
            <i class="pi pi-send"></i> PedidosYa
          </button> -->
          
        </div>
      </div>

      <!-- Grid de mesas -->
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-4">
        <button
          v-for="table in tables"
          :key="table.id"
          type="button"
          @click="openTableModal(table)"
          class="relative flex flex-col p-3 text-left transition bg-white border shadow-sm rounded-2xl hover:shadow-md active:scale-[0.98] sm:p-4"
          :class="isTableFree(table) ? 'border-gray-200' : 'border-amber-300 ring-1 ring-amber-200'"
        >
          <div class="flex items-start justify-between gap-2">
            <span
              class="flex items-center justify-center w-12 h-12 text-xl font-bold rounded-xl"
              :class="isTableFree(table) ? 'bg-mantis-50 text-mantis-700' : 'bg-amber-50 text-amber-700'"
            >
              {{ table.number }}
            </span>
            <span class="chip" :class="isTableFree(table) ? 'bg-mantis-100 text-mantis-800' : 'bg-amber-100 text-amber-800'">
              {{ isTableFree(table) ? 'Libre' : 'Ocupada' }}
            </span>
          </div>

          <div class="mt-3 min-h-[2.5rem]">
            <template v-if="!isTableFree(table) && table.active_order">
              <p class="text-xs text-gray-500 truncate">
                {{ table.active_order.customer_name || 'Sin nombre' }} · {{ tableItemCount(table) }} uds.
              </p>
              <p class="text-base font-bold text-gray-900 tabular-nums">C$ {{ money(tableOrderTotal(table)) }}</p>
            </template>
            <p v-else class="text-xs text-gray-400">Toca para abrir una orden</p>
          </div>
        </button>
      </div>

      <div v-if="!tables?.length" class="p-10 mt-4 text-center border border-dashed card">
        <i class="text-3xl text-gray-300 pi pi-table"></i>
        <p class="mt-2 text-sm text-gray-500">No hay mesas configuradas.</p>
      </div>
    </div>

    <!-- ===================== MODAL DE ORDEN ===================== -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-stretch justify-center bg-gray-900/60 md:items-center md:p-4"
      @click.self="closeModal"
    >
      <div class="flex flex-col w-full h-[100dvh] overflow-hidden bg-gray-50 md:h-[90vh] md:max-w-5xl md:rounded-2xl md:shadow-2xl">

        <!-- Header -->
        <header class="text-white shrink-0" :class="isPedidosYa ? 'bg-red-500' : 'bg-mantis-600'">
          <div class="flex items-center gap-2 px-3 pt-3 pb-2 sm:px-4">
            <div class="flex-1 min-w-0">
              <p class="text-[11px] font-medium tracking-wider uppercase text-white/70">
                {{ hasActiveTableOrder ? 'Orden abierta' : 'Nueva orden' }}
              </p>
              <h2 class="text-lg font-bold truncate sm:text-xl">{{ modalTitle }}</h2>
            </div>
            <button
              v-if="hasActiveTableOrder"
              @click="generateKitchenCommand"
              class="icon-btn-light"
              title="Imprimir comanda"
              aria-label="Imprimir comanda"
            >
              <i class="pi pi-print"></i>
            </button>
            <button @click="closeModal" class="icon-btn-light" aria-label="Cerrar">
              <i class="pi pi-times"></i>
            </button>
          </div>

          <!-- Chips de detalles (colapsables) -->
          <div class="flex gap-2 px-3 pb-3 overflow-x-auto sm:px-4 no-scrollbar">
            <button class="chip-light" :class="{ 'is-active': openPanel === 'customer' }" @click="togglePanel('customer')">
              <i class="text-[11px] pi pi-user"></i>
              <span class="truncate max-w-[9rem]">{{ customerChipLabel }}</span>
              <span v-if="isPedidosYa && externalNumber" class="opacity-75">#{{ externalNumber }}</span>
            </button>
            <button class="chip-light" :class="{ 'is-active': openPanel === 'note' }" @click="togglePanel('note')">
              <i class="text-[11px] pi pi-pencil"></i> Nota
              <span v-if="indications" class="w-1.5 h-1.5 rounded-full bg-amber-300"></span>
            </button>
            <button
              v-if="orderType !== 'mesa' || hasActiveTableOrder"
              class="chip-light"
              :class="{ 'is-active': openPanel === 'discount' }"
              @click="orderType === 'mesa' ? openDiscountModal() : togglePanel('discount')"
            >
              <i class="text-[11px] pi pi-percentage"></i> Descuento
              <span v-if="discountChipActive" class="w-1.5 h-1.5 rounded-full bg-amber-300"></span>
            </button>
          </div>
        </header>

        <!-- Panel expandible de detalles -->
        <div v-if="openPanel" class="px-3 py-3 bg-white border-b border-gray-200 shadow-sm shrink-0 sm:px-4">
          <!-- Cliente -->
          <template v-if="openPanel === 'customer'">
            <div v-if="orderType === 'mesa'">
              <label class="label">Nombre del cliente</label>
              <input v-model="customerName" type="text" class="input" placeholder="Opcional" />
            </div>
            <div v-else class="grid grid-cols-2 gap-2">
              <div>
                <label class="label">Nombre</label>
                <input v-model="fiscal_name" type="text" class="input" placeholder="Opcional" />
              </div>
              <div>
                <label class="label">RUC</label>
                <input v-model="fiscal_ruc" type="text" class="input" placeholder="Opcional" />
              </div>
              <div v-if="isPedidosYa" class="col-span-2">
                <label class="label">N° de pedido PedidosYa</label>
                <input v-model="externalNumber" type="text" inputmode="numeric" class="input" placeholder="Ej: 123456" />
              </div>
            </div>
          </template>

          <!-- Nota -->
          <template v-else-if="openPanel === 'note'">
            <label class="label">Indicaciones para cocina</label>
            <textarea v-model="indications" rows="2" class="input" placeholder="Ej: sin cebolla, bien caliente..."></textarea>
          </template>

          <!-- Descuento (llevar) -->
          <template v-else-if="openPanel === 'discount' && orderType === 'llevar'">
            <label class="flex items-center justify-between gap-3">
              <span class="text-sm font-medium text-gray-700">Aplicar descuento</span>
              <input type="checkbox" v-model="toggleTakeAwayDiscount" class="checkbox" />
            </label>
            <div v-if="toggleTakeAwayDiscount" class="grid grid-cols-2 gap-2 mt-3">
              <div class="col-span-2 segmented">
                <button :class="{ 'is-active': takeAwayDiscountType === 'amount' }" @click="takeAwayDiscountType = 'amount'">Monto C$</button>
                <button :class="{ 'is-active': takeAwayDiscountType === 'percent' }" @click="takeAwayDiscountType = 'percent'">Porcentaje %</button>
              </div>
              <input v-model.number="takeAwayDiscountValue" type="number" min="0" :max="takeAwayDiscountType === 'percent' ? 100 : undefined" step="0.01" class="input" placeholder="Valor" />
              <input v-model="takeAwayDiscountReason" type="text" class="input" placeholder="Razón" />
            </div>
          </template>

          <!-- Descuento (PedidosYa) -->
          <template v-else-if="openPanel === 'discount' && isPedidosYa">
            <label class="flex items-center justify-between gap-3">
              <span class="text-sm font-medium text-gray-700">Aplicar descuento</span>
              <input type="checkbox" v-model="togglePedidosYaDiscount" class="checkbox" />
            </label>
            <div v-if="togglePedidosYaDiscount" class="grid grid-cols-2 gap-2 mt-3">
              <div class="col-span-2 segmented">
                <button :class="{ 'is-active': pedidosYaDiscountType === 'amount' }" @click="pedidosYaDiscountType = 'amount'">Monto C$</button>
                <button :class="{ 'is-active': pedidosYaDiscountType === 'percent' }" @click="pedidosYaDiscountType = 'percent'">Porcentaje %</button>
              </div>
              <input v-model.number="pedidosYaDiscountValue" type="number" min="0" :max="pedidosYaDiscountType === 'percent' ? 100 : undefined" step="0.01" class="input" placeholder="Valor" />
              <input v-model="pedidosYaDiscountReason" type="text" class="input" placeholder="Razón" />
            </div>
          </template>

          <div class="flex justify-end mt-2">
            <button class="px-2 py-1 text-xs font-semibold text-mantis-700 hover:underline" @click="openPanel = null">Listo</button>
          </div>
        </div>

        <!-- Tabs (solo móvil) -->
        <div class="grid grid-cols-2 gap-1 p-1 mx-3 mt-3 md:hidden bg-gray-200/70 rounded-xl shrink-0">
          <button class="tab" :class="{ 'tab-active': activeTab === 'menu' }" @click="activeTab = 'menu'">
            <i class="text-xs pi pi-th-large"></i> Menú
          </button>
          <button class="tab" :class="{ 'tab-active': activeTab === 'order' }" @click="activeTab = 'order'">
            <i class="text-xs pi pi-list"></i> Orden
            <span v-if="pendingUnits" class="badge">{{ pendingUnits }}</span>
          </button>
        </div>

        <!-- Cuerpo: catálogo + orden -->
        <div class="flex flex-1 min-h-0 md:divide-x md:divide-gray-200">

          <!-- Catálogo -->
          <section class="flex-col flex-1 min-h-0 md:flex md:w-[55%]" :class="activeTab === 'menu' ? 'flex' : 'hidden'">
            <div class="px-3 pt-3 space-y-2 shrink-0 sm:px-4">
              <div class="relative">
                <i class="absolute text-sm text-gray-400 -translate-y-1/2 pi pi-search left-3 top-1/2"></i>
                <input v-model="productSearch" type="search" class="input pl-9" placeholder="Buscar producto..." />
              </div>
              <div class="flex gap-2 pb-1 overflow-x-auto no-scrollbar">
                <button class="pill" :class="{ 'pill-active': activeCategory === 'all' }" @click="activeCategory = 'all'">Todo</button>
                <button
                  v-for="cat in catalogCategories"
                  :key="cat"
                  class="pill"
                  :class="{ 'pill-active': activeCategory === cat }"
                  @click="activeCategory = cat"
                >
                  {{ cat }}
                </button>
              </div>
            </div>

            <div class="flex-1 px-3 pt-2 pb-4 overflow-y-auto sm:px-4 overscroll-contain">
              <div v-for="group in visibleCatalog" :key="group.category" class="mb-4">
                <h4 class="mb-2 text-[11px] font-semibold tracking-wider text-gray-500 uppercase">{{ group.category }}</h4>
                <div class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
                  <button
                    v-for="product in group.items"
                    :key="product.id"
                    type="button"
                    @click="addProduct(product)"
                    class="product-tile"
                    :class="qtyInOrder[product.id] ? '!border-mantis-400 bg-mantis-50' : ''"
                  >
                    <span class="pr-6 text-sm font-medium leading-tight text-gray-800 line-clamp-2">{{ product.name }}</span>
                    <span class="mt-1 text-xs font-semibold text-gray-500 tabular-nums">
                      {{ product.is_generic ? 'Precio libre' : 'C$ ' + money(unitPrice(product)) }}
                    </span>
                    <span v-if="qtyInOrder[product.id]" class="absolute badge top-1.5 right-1.5">{{ qtyInOrder[product.id] }}</span>
                  </button>
                </div>
              </div>
              <p v-if="!visibleCatalog.length" class="py-10 text-sm text-center text-gray-400">No se encontraron productos</p>
            </div>
          </section>

          <!-- Orden -->
          <section class="flex-col flex-1 min-h-0 bg-white md:flex md:w-[45%]" :class="activeTab === 'order' ? 'flex' : 'hidden'">
            <div class="flex items-center justify-between px-3 pt-3 pb-2 border-b border-gray-100 shrink-0 sm:px-4">
              <h3 class="text-sm font-semibold text-gray-800">Orden</h3>
              <span class="text-xs text-gray-500 tabular-nums">{{ pendingItems.length }} productos · {{ pendingUnits }} uds.</span>
            </div>

            <div class="flex-1 overflow-y-auto overscroll-contain">
              <!-- Vacío -->
              <div v-if="!pendingItems.length && !paidItems.length" class="flex flex-col items-center justify-center h-full px-6 py-10 text-center">
                <i class="text-3xl text-gray-300 pi pi-shopping-cart"></i>
                <p class="mt-2 text-sm text-gray-500">Agrega productos desde el menú</p>
                <button class="mt-3 md:hidden btn btn-secondary" @click="activeTab = 'menu'">Ver menú</button>
              </div>

              <!-- Pendientes: 1 fila compacta por producto -->
              <ul class="divide-y divide-gray-100">
                <li v-for="(p, idx) in pendingItems" :key="itemKey(p, idx)" class="flex items-center gap-2 px-3 py-1.5 sm:px-4">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-1.5 min-w-0">
                      <p class="text-sm font-medium leading-tight text-gray-800 truncate">{{ p.name }}</p>
                      <span v-if="p.is_active === false" class="px-1.5 py-0.5 text-[10px] font-semibold text-amber-700 bg-amber-100 rounded shrink-0">Inactivo</span>
                    </div>
                    <p class="text-[11px] text-gray-500 tabular-nums">C$ {{ money(unitPrice(p)) }} c/u</p>
                  </div>
                  <div class="stepper">
                    <button
                      @click="decreaseQuantity(p)"
                      :class="p.quantity <= 1 ? '!text-red-500' : ''"
                      :aria-label="p.quantity <= 1 ? 'Eliminar' : 'Disminuir'"
                    >
                      <i :class="p.quantity <= 1 ? 'pi pi-trash' : 'pi pi-minus'"></i>
                    </button>
                    <span>{{ p.quantity }}</span>
                    <button @click="increaseQuantity(p)" :class="p.is_active === false ? '!opacity-45' : ''" aria-label="Aumentar"><i class="pi pi-plus"></i></button>
                  </div>
                  <span class="w-16 text-sm font-semibold text-right text-gray-900 tabular-nums">{{ money(unitPrice(p) * p.quantity) }}</span>
                </li>
              </ul>

              <!-- Pagados (colapsados) -->
              <div v-if="paidItems.length" class="mx-3 my-3 border border-gray-200 border-dashed rounded-xl sm:mx-4">
                <button class="flex items-center justify-between w-full gap-2 px-3 py-2 text-xs text-gray-500" @click="showPaid = !showPaid">
                  <span class="flex items-center gap-1.5">
                    <i class="pi pi-check-circle text-mantis-600"></i>
                    Ya pagados ({{ paidItems.length }}) · C$ {{ money(paidItemsTotal) }}
                  </span>
                  <i :class="showPaid ? 'pi pi-chevron-up' : 'pi pi-chevron-down'" class="text-[10px]"></i>
                </button>
                <ul v-if="showPaid" class="px-3 pb-2 space-y-1">
                  <li v-for="(p, idx) in paidItems" :key="'paid-' + itemKey(p, idx)" class="flex justify-between gap-2 text-xs text-gray-400">
                    <span class="truncate">{{ p.quantity }} × {{ p.name }}</span>
                    <span class="tabular-nums">{{ money(unitPrice(p) * p.quantity) }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <!-- Footer fijo: total + acciones -->
        <footer class="px-3 pt-2.5 bg-white border-t border-gray-200 shrink-0 sm:px-4 pb-safe">
          <div class="flex items-center gap-2">
            <div class="flex-1 min-w-0">
              <p v-if="orderSummary.discount > 0" class="text-[11px] text-gray-500 tabular-nums">
                <span class="line-through">C$ {{ money(orderSummary.subtotal) }}</span>
                <span class="ml-1 font-medium text-amber-600">−C$ {{ money(orderSummary.discount) }}</span>
              </p>
              <p v-else class="text-[11px] tracking-wide text-gray-500 uppercase">Total</p>
              <p class="text-xl font-bold leading-tight text-gray-900 tabular-nums">C$ {{ money(orderSummary.total) }}</p>
            </div>

            <button v-if="hasActiveTableOrder" @click="showModalcuenta = true" class="h-11 btn btn-outline">
              <i class="pi pi-wallet"></i> Cuenta
            </button>

            <button
              v-if="orderType === 'mesa'"
              @click="submitOrder"
              :disabled="!pendingItems.length && !editingOrderId"
              class="px-5 h-11 btn btn-primary"
            >
              {{ editingOrderId ? 'Actualizar' : 'Crear orden' }}
            </button>
            <button v-else-if="orderType === 'llevar'" @click="submitTakeawayOrder" :disabled="!pendingItems.length" class="px-5 h-11 btn btn-primary">
              Crear orden
            </button>
            <button v-else-if="isPedidosYa" @click="submitPedidosYaOrder" :disabled="!pendingItems.length" class="px-5 h-11 btn btn-pedidosya">
              Crear orden
            </button>
          </div>
        </footer>
      </div>
    </div>

    <!-- ===================== OPCIONES DE CUENTA ===================== -->
    <div v-if="showModalcuenta" class="modal-backdrop" @click.self="showModalcuenta = false">
      <div class="modal-sheet sm:max-w-sm">
        <div class="modal-header">
          <div>
            <h3 class="modal-title">Opciones de cuenta</h3>
            <p class="text-xs text-gray-500">{{ modalTitle }} · C$ {{ money(orderSummary.total) }}</p>
          </div>
          <button class="icon-btn" @click="showModalcuenta = false" aria-label="Cerrar"><i class="pi pi-times"></i></button>
        </div>
        <div v-if="hasActiveTableOrder" class="p-2 overflow-y-auto">
          <button class="action-row" @click="confirmCloseOrder(selectedTable.active_order.id)">
            <span class="action-icon bg-mantis-100 text-mantis-700"><i class="pi pi-check"></i></span>
            <span class="flex flex-col">
              <span class="text-sm font-semibold text-gray-900">Cerrar cuenta</span>
              <span class="text-xs text-gray-500">Factura final de lo pendiente</span>
            </span>
          </button>
          <button class="action-row" @click="openPartialInvoiceModal">
            <span class="text-gray-700 bg-gray-100 action-icon"><i class="pi pi-clone"></i></span>
            <span class="flex flex-col">
              <span class="text-sm font-semibold text-gray-900">Factura parcial</span>
              <span class="text-xs text-gray-500">Cobrar solo algunos productos</span>
            </span>
          </button>
          <button class="action-row" @click="generateInvoicePreview">
            <span class="text-gray-700 bg-gray-100 action-icon"><i class="pi pi-file"></i></span>
            <span class="flex flex-col">
              <span class="text-sm font-semibold text-gray-900">Pre-cuenta</span>
              <span class="text-xs text-gray-500">Imprimir el detalle sin facturar</span>
            </span>
          </button>
          <button class="action-row" @click="openTransferOrderModal">
            <span class="text-gray-700 bg-gray-100 action-icon"><i class="pi pi-arrow-right-arrow-left"></i></span>
            <span class="flex flex-col">
              <span class="text-sm font-semibold text-gray-900">Transferir mesa</span>
              <span class="text-xs text-gray-500">Mover la orden a otra mesa libre</span>
            </span>
          </button>
          <div class="my-1 border-t border-gray-100"></div>
          <button class="action-row" @click="cancelOrder">
            <span class="text-red-600 action-icon bg-red-50"><i class="pi pi-ban"></i></span>
            <span class="flex flex-col">
              <span class="text-sm font-semibold text-red-600">Cancelar orden</span>
              <span class="text-xs text-gray-500">Anula la orden y libera la mesa</span>
            </span>
          </button>
        </div>
        <div class="h-[env(safe-area-inset-bottom)]"></div>
      </div>
    </div>

    <!-- ===================== FACTURA PARCIAL ===================== -->
    <div v-if="showPartialInvoiceModal" class="modal-backdrop" @click.self="showPartialInvoiceModal = false">
      <div class="modal-sheet sm:max-w-lg">
        <div class="modal-header">
          <div>
            <h3 class="modal-title">Factura parcial</h3>
            <p class="text-xs text-gray-500">{{ modalTitle }}</p>
          </div>
          <button class="icon-btn" @click="showPartialInvoiceModal = false" aria-label="Cerrar"><i class="pi pi-times"></i></button>
        </div>

        <div class="space-y-4 modal-body">
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="label">Nombre</label>
              <input v-model="fiscal_name" type="text" class="input" placeholder="Opcional" />
            </div>
            <div>
              <label class="label">RUC</label>
              <input v-model="fiscal_ruc" type="text" class="input" placeholder="Opcional" />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <p class="text-sm font-medium text-gray-700">¿Qué se paga?</p>
              <div class="flex gap-3">
                <button class="text-xs font-semibold text-gray-500 hover:underline" @click="clearPartialSelection">Ninguno</button>
                <button class="text-xs font-semibold text-mantis-700 hover:underline" @click="selectAllPartial">Todo</button>
              </div>
            </div>
            <ul class="border border-gray-200 divide-y divide-gray-100 rounded-xl">
              <li v-for="item in selectedItemsForPartial" :key="item.id" class="flex items-center gap-2 px-3 py-2">
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-800 truncate">{{ item.name }}</p>
                  <p class="text-[11px] text-gray-500 tabular-nums">{{ item.quantity }} pend. · C$ {{ money(item.price) }} c/u</p>
                </div>
                <div class="stepper">
                  <button @click="setPartialQty(item, (item.payQuantity || 0) - 1)" :disabled="!item.payQuantity" aria-label="Menos"><i class="pi pi-minus"></i></button>
                  <span>{{ item.payQuantity || 0 }}</span>
                  <button @click="setPartialQty(item, (item.payQuantity || 0) + 1)" :disabled="item.payQuantity >= item.quantity" aria-label="Más"><i class="pi pi-plus"></i></button>
                </div>
              </li>
            </ul>
          </div>

          <div class="p-3 border border-gray-200 rounded-xl">
            <label class="flex items-center justify-between gap-3">
              <span class="text-sm font-medium text-gray-700">Aplicar descuento</span>
              <input type="checkbox" v-model="togglePartialDiscount" class="checkbox" />
            </label>
            <div v-if="togglePartialDiscount" class="grid grid-cols-2 gap-2 mt-3">
              <div class="col-span-2 segmented">
                <button :class="{ 'is-active': partialDiscountType === 'amount' }" @click="partialDiscountType = 'amount'">Monto C$</button>
                <button :class="{ 'is-active': partialDiscountType === 'percent' }" @click="partialDiscountType = 'percent'">Porcentaje %</button>
              </div>
              <input v-model.number="partialDiscountValue" type="number" min="0" step="0.01" class="input" placeholder="Valor" />
              <input v-model="partialDiscountReason" type="text" class="input" placeholder="Razón" />
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <div class="flex-1 min-w-0">
            <p v-if="partialDiscountAmount > 0" class="text-[11px] text-gray-500 tabular-nums">
              <span class="line-through">C$ {{ money(partialTotal) }}</span>
              <span class="ml-1 text-amber-600">−C$ {{ money(partialDiscountAmount) }}</span>
            </p>
            <p v-else class="text-[11px] uppercase tracking-wide text-gray-500">A cobrar</p>
            <p class="text-lg font-bold text-gray-900 tabular-nums">C$ {{ money(partialTotal - partialDiscountAmount) }}</p>
          </div>
          <button @click="showPartialInvoiceModal = false" class="h-11 btn btn-secondary">Cancelar</button>
          <button @click="generatePartialInvoice" :disabled="partialTotal <= 0" class="h-11 btn btn-primary">
            <i class="pi pi-print"></i> Facturar
          </button>
        </div>
      </div>
    </div>

    <!-- ===================== PRECIO MANUAL ===================== -->
    <div v-if="showCustomModal" class="modal-backdrop z-[70]" @click.self="showCustomModal = false">
      <div class="modal-sheet sm:max-w-sm">
        <div class="modal-header">
          <div>
            <h3 class="modal-title">Precio manual</h3>
            <p class="text-xs text-gray-500">{{ selectedProduct?.name }}</p>
          </div>
          <button class="icon-btn" @click="showCustomModal = false" aria-label="Cerrar"><i class="pi pi-times"></i></button>
        </div>
        <div class="modal-body">
          <label class="label">Precio (C$)</label>
          <input
            id="custom-price-input"
            v-model="customPrice"
            type="number"
            inputmode="decimal"
            step="0.01"
            class="text-lg input tabular-nums"
            placeholder="0.00"
            @keyup.enter="addWithCustomPrice"
          />
        </div>
        <div class="modal-footer">
          <button @click="showCustomModal = false" class="flex-1 h-11 btn btn-secondary">Cancelar</button>
          <button @click="addWithCustomPrice" class="flex-1 h-11 btn btn-primary">Agregar</button>
        </div>
      </div>
    </div>

    <!-- ===================== DESCUENTO DE MESA ===================== -->
    <div v-if="showDiscountInput" class="modal-backdrop z-[70]" @click.self="closeDiscountModal">
      <div class="modal-sheet sm:max-w-sm">
        <div class="modal-header">
          <div>
            <h3 class="modal-title">Descuento</h3>
            <p class="text-xs text-gray-500">{{ modalTitle }}</p>
          </div>
          <button class="icon-btn" @click="closeDiscountModal" aria-label="Cerrar"><i class="pi pi-times"></i></button>
        </div>
        <div class="space-y-3 modal-body">
          <div class="segmented">
            <button :class="{ 'is-active': discountType === 'amount' }" @click="discountType = 'amount'">Monto C$</button>
            <button :class="{ 'is-active': discountType === 'percent' }" @click="discountType = 'percent'">Porcentaje %</button>
          </div>
          <div>
            <label class="label">Valor</label>
            <input v-model.number="discountValue" type="number" min="0" step="0.01" inputmode="decimal" class="input" />
          </div>
          <div>
            <label class="label">Razón</label>
            <input v-model="discountReason" type="text" placeholder="Ej: Cliente frecuente" class="input" />
          </div>
        </div>
        <div class="modal-footer">
          <button
            v-if="selectedTable?.active_order?.discount_type"
            @click="cancelDiscount"
            class="flex-1 h-11 btn btn-outline"
          >
            Quitar
          </button>
          <button v-else @click="closeDiscountModal" class="flex-1 h-11 btn btn-secondary">Cancelar</button>
          <button @click="applyDiscount" class="flex-1 h-11 btn btn-primary">Aplicar</button>
        </div>
      </div>
    </div>

    <!-- ===================== TRANSFERIR MESA ===================== -->
    <div v-if="showTransferModal" class="modal-backdrop z-[70]" @click.self="closeTransferModal">
      <div class="modal-sheet sm:max-w-md">
        <div class="modal-header">
          <div>
            <h3 class="modal-title">Transferir orden</h3>
            <p class="text-xs text-gray-500">Desde {{ modalTitle }} · elige una mesa libre</p>
          </div>
          <button class="icon-btn" @click="closeTransferModal" aria-label="Cerrar"><i class="pi pi-times"></i></button>
        </div>
        <div class="modal-body">
          <div class="grid grid-cols-4 gap-2 sm:grid-cols-5">
            <button
              v-for="table in tables"
              :key="table.id"
              type="button"
              :disabled="table.id === selectedTable?.id || !isTableFree(table)"
              @click="selectedTableToTransfer = table.id"
              class="flex flex-col items-center justify-center h-16 text-lg font-bold transition border rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
              :class="selectedTableToTransfer === table.id
                ? 'border-mantis-600 bg-mantis-600 text-white'
                : 'border-gray-200 bg-white text-gray-800 hover:border-mantis-300'"
            >
              {{ table.number }}
              <span class="text-[10px] font-medium" :class="selectedTableToTransfer === table.id ? 'text-white/80' : 'text-gray-400'">
                {{ isTableFree(table) ? 'Libre' : 'Ocupada' }}
              </span>
            </button>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="closeTransferModal" class="flex-1 h-11 btn btn-secondary">Cancelar</button>
          <button @click="transferTable" :disabled="!selectedTableToTransfer" class="flex-1 h-11 btn btn-primary">Transferir</button>
        </div>
      </div>
    </div>

  </AppLayout>
  <Toast />
  <ConfirmDialog group="pos">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="flex flex-col w-full bg-white">
        <div class="flex items-start justify-between gap-3 px-5 pt-5 pb-3">
          <div class="flex items-center min-w-0 gap-3">
            <span
              class="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
              :class="['anul', 'cancel', 'elimin'].some(w => (message?.header || '').toLowerCase().includes(w))
                ? 'bg-red-100 text-red-600'
                : 'bg-mantis-100 text-mantis-700'"
            >
              <i :class="message?.icon || 'pi pi-question-circle'" class="text-lg"></i>
            </span>
            <h3 class="text-base font-bold leading-tight text-gray-900">{{ message?.header || 'Confirmación' }}</h3>
          </div>
        </div>

        <div class="px-5 pb-5">
          <p class="text-sm leading-relaxed text-gray-600">{{ message?.message }}</p>
        </div>

        <div class="flex items-center justify-between gap-8 px-5 py-3.5 bg-gray-50 border-t border-gray-100">
          <button
            type="button"
            @click="rejectCallback"
            class="btn btn-outline min-w-[7rem] h-11 px-5"
          >
            {{ message?.rejectLabel || 'No' }}
          </button>
          <button
            type="button"
            @click="acceptCallback"
            class="btn min-w-[7.5rem] h-11 px-5"
            :class="['anul', 'cancel', 'elimin'].some(w => (message?.header || '').toLowerCase().includes(w))
              ? 'btn-danger'
              : 'btn-primary'"
          >
            {{ message?.acceptLabel || 'Sí' }}
          </button>
        </div>
      </div>
    </template>
  </ConfirmDialog>
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
import { escapeHtml } from '@/Utils/thermalPrinter';



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
      return sum + ((p.is_manual_price ? p.price : (p.py_price ?? p.price)) * p.quantity);
    }
    return sum;
  }, 0);
});

// Estado de UI responsiva / diseño compacto
const openPanel = ref(null); // null | 'customer' | 'note' | 'discount'
const activeTab = ref('menu'); // 'menu' | 'order' (móvil)
const showPaid = ref(false);
const productSearch = ref('');
const activeCategory = ref('all');

const money = (value) => (Number(value) || 0).toFixed(2);
const isTableFree = (table) => (table?.status || '').toLowerCase() === 'libre';

const tableStats = computed(() => {
  const list = props.tables || [];
  const free = list.filter(isTableFree).length;
  return { free, busy: list.length - free };
});

function tableItemCount(table) {
  const items = table?.active_order?.order_items || [];
  return items
    .filter(i => i.payment_status !== 'paid')
    .reduce((sum, i) => sum + (Number(i.quantity) || 0), 0);
}

function tableOrderTotal(table) {
  const order = table?.active_order;
  if (!order?.order_items?.length) return 0;
  const sub = order.order_items
    .filter(i => i.payment_status !== 'paid')
    .reduce((sum, i) => sum + (Number(i.price) || 0) * (Number(i.quantity) || 0), 0);
  let disc = 0;
  if (order.discount_type && order.discount_value != null) {
    const val = Number(order.discount_value) || 0;
    disc = order.discount_type === 'percent'
      ? (sub * Math.min(val, 100)) / 100
      : Math.min(val, sub);
  }
  return Math.max(0, sub - disc);
}

const isPedidosYa = computed(() => orderType.value === 'pedidosya');
const hasActiveTableOrder = computed(() =>
  Boolean(selectedTable.value?.active_order && orderType.value === 'mesa' && !isOrderClosed.value)
);
const modalTitle = computed(() => {
  if (orderType.value === 'mesa') return `Mesa ${selectedTable.value?.number ?? ''}`;
  return isPedidosYa.value ? 'PedidosYa' : 'Para llevar';
});

function unitPrice(item) {
  if (!item) return 0;
  if (isPedidosYa.value && !item.is_generic && !item.is_manual_price) {
    return Number(item.py_price ?? item.price) || 0;
  }
  return Number(item.price) || 0;
}

const itemKey = (p, idx) => p.order_item_id || p.temp_id || `${p.id}-${idx}`;

const pendingItems = computed(() => selectedProducts.value.filter(p => p.payment_status !== 'paid'));
const paidItems = computed(() => selectedProducts.value.filter(p => p.payment_status === 'paid'));
const pendingUnits = computed(() => pendingItems.value.reduce((sum, p) => sum + (Number(p.quantity) || 0), 0));
const paidItemsTotal = computed(() =>
  paidItems.value.reduce((sum, p) => sum + unitPrice(p) * (Number(p.quantity) || 0), 0)
);

const qtyInOrder = computed(() => {
  const map = {};
  for (const p of pendingItems.value) {
    map[p.id] = (map[p.id] || 0) + (Number(p.quantity) || 0);
  }
  return map;
});

const customerChipLabel = computed(() => {
  if (orderType.value === 'mesa') return customerName.value?.trim() || 'Cliente';
  return fiscal_name.value?.trim() || 'Cliente';
});

const discountChipActive = computed(() => {
  if (orderType.value === 'mesa') {
    const ord = selectedTable.value?.active_order;
    return Boolean(ord?.discount_type && Number(ord?.discount_value) > 0);
  }
  if (orderType.value === 'llevar') {
    return Boolean(toggleTakeAwayDiscount.value && Number(takeAwayDiscountValue.value) > 0);
  }
  if (orderType.value === 'pedidosya') {
    return Boolean(togglePedidosYaDiscount.value && Number(pedidosYaDiscountValue.value) > 0);
  }
  return false;
});

function resetModalUiState() {
  openPanel.value = null;
  activeTab.value = 'menu';
  showPaid.value = false;
  productSearch.value = '';
  activeCategory.value = 'all';
}

function togglePanel(name) {
  if (openPanel.value === name) {
    openPanel.value = null;
    return;
  }
  if (name === 'discount') {
    if (orderType.value === 'mesa') {
      loadDiscount();
      if (!discountType.value) discountType.value = 'amount';
    } else if (orderType.value === 'llevar' && !takeAwayDiscountType.value) {
      takeAwayDiscountType.value = 'amount';
    } else if (orderType.value === 'pedidosya' && !pedidosYaDiscountType.value) {
      pedidosYaDiscountType.value = 'amount';
    }
  }
  openPanel.value = name;
}

const orderSummary = computed(() => {
  const subtotal = pendingItems.value.reduce(
    (sum, p) => sum + unitPrice(p) * (Number(p.quantity) || 0),
    0
  );
  let discount = 0;

  if (orderType.value === 'mesa') {
    const ord = selectedTable.value?.active_order;
    if (ord?.discount_type && ord?.discount_value != null) {
      const val = Number(ord.discount_value) || 0;
      discount = ord.discount_type === 'percent'
        ? (subtotal * Math.min(val, 100)) / 100
        : Math.min(val, subtotal);
    } else if (ord?.calculated_discount) {
      discount = Math.min(Number(ord.calculated_discount) || 0, subtotal);
    }
  } else if (orderType.value === 'llevar' && toggleTakeAwayDiscount.value) {
    const val = Number(takeAwayDiscountValue.value) || 0;
    if (val > 0) {
      discount = takeAwayDiscountType.value === 'percent'
        ? (subtotal * Math.min(val, 100)) / 100
        : Math.min(val, subtotal);
    }
  } else if (orderType.value === 'pedidosya' && togglePedidosYaDiscount.value) {
    const val = Number(pedidosYaDiscountValue.value) || 0;
    if (val > 0) {
      discount = pedidosYaDiscountType.value === 'percent'
        ? (subtotal * Math.min(val, 100)) / 100
        : Math.min(val, subtotal);
    }
  }

  return {
    subtotal,
    discount,
    total: Math.max(0, subtotal - discount),
  };
});

const partialDiscountAmount = computed(() => {
  if (!togglePartialDiscount.value) return 0;
  const val = Number(partialDiscountValue.value) || 0;
  if (val <= 0) return 0;
  const sub = partialTotal.value;
  return partialDiscountType.value === 'percent'
    ? (sub * Math.min(val, 100)) / 100
    : Math.min(val, sub);
});

function clearPartialSelection() {
  selectedItemsForPartial.value.forEach(item => { item.payQuantity = 0; });
}

function selectAllPartial() {
  selectedItemsForPartial.value.forEach(item => { item.payQuantity = item.quantity; });
}

function setPartialQty(item, qty) {
  const max = Number(item.quantity) || 0;
  item.payQuantity = Math.max(0, Math.min(max, Number(qty) || 0));
}

//modal para mesas
function openTableModal(table) {
  selectedTable.value = table;
  orderType.value = 'mesa';
  customerName.value = table.active_order?.customer_name || '';
  indications.value = table.active_order?.indications || '';
  selectedProducts.value = [];
  editingOrderId.value = table.active_order?.id || null;
  resetModalUiState();

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
        is_manual_price: Boolean(item.product?.is_generic),
        is_active: item.product?.is_active ?? true,
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
    loadDiscount();
    if (!discountType.value) discountType.value = 'amount';
  } else {
    discountType.value = 'amount';
    discountValue.value = 0;
    discountReason.value = '';
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
  toggleTakeAwayDiscount.value = false
  takeAwayDiscountType.value = 'amount'
  takeAwayDiscountValue.value = 0
  takeAwayDiscountReason.value = ''
  appliedTakeAwayDiscount.value = null
  resetModalUiState()
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
  togglePedidosYaDiscount.value = false
  pedidosYaDiscountType.value = 'amount'
  pedidosYaDiscountValue.value = 0
  pedidosYaDiscountReason.value = ''
  appliedPedidosYaDiscount.value = null
  resetModalUiState()
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

function findPendingProductIndex(target) {
  if (typeof target === 'object' && target !== null) {
    const exactIdx = selectedProducts.value.indexOf(target);
    if (exactIdx !== -1) return exactIdx;
    return selectedProducts.value.findIndex(p => {
      if (target.order_item_id && p.order_item_id === target.order_item_id) return true;
      if (target.temp_id && p.temp_id === target.temp_id) return true;
      return !p.is_manual_price && !target.is_manual_price && p.id === target.id && p.payment_status !== 'paid';
    });
  }
  return selectedProducts.value.findIndex(p => p.id === target && p.payment_status !== 'paid');
}

//aumentar cantidad
const increaseQuantity = (target) => {
  const idx = findPendingProductIndex(target);
  const product = idx !== -1 ? selectedProducts.value[idx] : null;
  if (!product || product.payment_status === 'paid') return;
  if (product.is_active === false) {
    toast.add({
      severity: 'warn',
      summary: 'Producto inactivo',
      detail: `No se pueden agregar más unidades de "${product.name}" porque ya no está activo.`,
      life: 3500
    });
    return;
  }
  product.quantity++;
};

//restar cantidad
const decreaseQuantity = (target) => {
  const idx = findPendingProductIndex(target);
  const product = idx !== -1 ? selectedProducts.value[idx] : null;
  if (product && product.payment_status !== 'paid') {
    if (product.quantity > 1) {
      product.quantity--;
    } else {
      selectedProducts.value.splice(idx, 1);
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
      p => p.id === product.id && p.payment_status !== 'paid' && !p.is_manual_price
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
const removeProduct = (target) => {
  const idx = findPendingProductIndex(target);
  if (idx !== -1 && selectedProducts.value[idx].payment_status !== 'paid') {
    selectedProducts.value.splice(idx, 1);
  } else if (typeof target !== 'object') {
    selectedProducts.value = selectedProducts.value.filter(p => !(p.id === target && p.payment_status !== 'paid'));
  }
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
          detail: errors?.products || 'Hubo un error al actualizar la orden. Revisa la consola.',
          life: 4000
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
    discount_type: appliedTakeAwayDiscount.value ? appliedTakeAwayDiscount.value.type : null,
    discount_value: appliedTakeAwayDiscount.value ? appliedTakeAwayDiscount.value.value : null,
    discount_reason: appliedTakeAwayDiscount.value ? appliedTakeAwayDiscount.value.reason : null,
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
    discount_type: appliedPedidosYaDiscount.value ? appliedPedidosYaDiscount.value.type : null,
    discount_value: appliedPedidosYaDiscount.value ? appliedPedidosYaDiscount.value.value : null,
    discount_reason: appliedPedidosYaDiscount.value ? appliedPedidosYaDiscount.value.reason : null,
    products: selectedProducts.value.map(p => ({
      id: p.id,
      quantity: p.quantity,
      price: p.is_manual_price ? p.price : (p.py_price ?? p.price),
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

        <p><strong>Fecha:</strong> ${escapeHtml(date)}</p>
        <p><strong>Tipo:</strong> ${escapeHtml(tipoOrdenTexto)}</p>
        
        <!-- Usamos la nueva variable que contiene el nombre correcto -->
        ${nameForCommand ? `<p><strong>Cliente:</strong> ${escapeHtml(nameForCommand)}</p>` : ''}

        ${indications.value ? `<p><strong>Indicaciones:</strong> ${escapeHtml(indications.value)}</p>` : ''}

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
                <td>${escapeHtml(p.quantity)}</td>
                <td>${escapeHtml(p.name)}</td>
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
    alert('Por favor, permite las ventanas emergentes.');
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

        <p><strong>Fecha:</strong> ${escapeHtml(date)}</p>
        <p><strong>Tipo:</strong> ${escapeHtml(tipoOrdenTexto)}</p>
        ${customerNameVal ? `<p><strong>Cliente:</strong> ${escapeHtml(customerNameVal)}</p>` : ''}

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
                <td>${escapeHtml(p.quantity)}</td>
                <td>${escapeHtml(p.name)}</td>
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
  showModalcuenta.value = false;

  togglePartialDiscount.value = false;
  partialDiscountType.value = 'amount';
  partialDiscountValue.value = 0;
  partialDiscountReason.value = '';
  appliedPartialDiscount.value = null;

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
    if (response.data?.invoice_number) {
      nextInvoiceNumber.value = response.data.invoice_number;
    }

    // Generar HTML e imprimir
    const partialInvoiceHTML = getPartialInvoiceHTML(selectedForPayment, discount);
    nextInvoiceNumber.value = '';
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
          <td>${escapeHtml(qty)}</td>
          <td>${escapeHtml(p.name)}</td>
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
           
          <p><strong>Factura N°: ${escapeHtml(nextInvoiceNumber.value)}</strong></p>
          
        </div>

        <hr class="space">

        <p><strong>Fecha:</strong> ${escapeHtml(date)}</p>
        <p><strong>Tipo:</strong> ${escapeHtml(tipoOrdenTexto)}</p>
        ${fiscal_name.value ? `<p><strong>Cliente:</strong> ${escapeHtml(fiscal_name.value)}</p>` : ''}
        ${fiscal_ruc.value ? `<p><strong>RUC:</strong> ${escapeHtml(fiscal_ruc.value)}</p>` : ''}

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
    const response = await axios.post('/invoices/takeaway', dataToSend);
    if (response.data?.invoice_number) {
      nextInvoiceNumber.value = response.data.invoice_number;
    }

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
        nextInvoiceNumber.value = '';
        const printWindow = window.open('', '_blank');
        printWindow.document.write(invoiceHTML);
        printWindow.document.close();
        recargarPaginaDespuesDeUnSegundo();
      },
      reject: () => {
        nextInvoiceNumber.value = '';
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
           
          <p><strong>Factura N°: ${escapeHtml(nextInvoiceNumber.value)}</strong></p>
          
        </div>
        <hr class="space">
        <p><strong>Fecha:</strong> ${escapeHtml(date)}</p>
        <p><strong>Tipo:</strong> Para Llevar</p>
        ${fiscal_name.value ? `<p><strong>Cliente:</strong> ${escapeHtml(fiscal_name.value)}</p>` : ''}
        ${fiscal_ruc.value ? `<p><strong>RUC:</strong> ${escapeHtml(fiscal_ruc.value)}</p>` : ''}
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
                <td>${escapeHtml(p.quantity)}</td>
                <td>${escapeHtml(p.name)}</td>
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
    price: p.is_manual_price ? p.price : (p.py_price ?? p.price)
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
    const response = await axios.post('/invoices/pedidosya', dataToSend);
    const resolvedInvoiceNumber = response.data?.invoice_number || nextInvoiceNumber.value;

    // Generar el HTML de la factura
    const invoiceHTML = getPedidosYaInvoiceHTML(
      items,
      discount,
      subtotal,
      discountAmount,
      total,
      resolvedInvoiceNumber
    );
    nextInvoiceNumber.value = '';

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
      <td>${escapeHtml(p.quantity)}</td>
      <td>${escapeHtml(p.name)}</td>
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
           
          <p><strong>Factura N°: ${escapeHtml(invoiceNumber)}</strong></p>
          
        </div>

        <hr class="space">

        <p><strong>Fecha:</strong> ${escapeHtml(date)}</p>
        <p><strong>Tipo:</strong> Pedidos Ya</p>
        ${fiscal_name.value ? `<p><strong>Cliente:</strong> ${escapeHtml(fiscal_name.value)}</p>` : ''}
        ${fiscal_ruc.value ? `<p><strong>RUC:</strong> ${escapeHtml(fiscal_ruc.value)}</p>` : ''}
        ${externalNumber.value ? `<p><strong>N° Pedido:</strong># ${escapeHtml(externalNumber.value)}</p>` : ''}

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
      <td>${escapeHtml(p.payQuantity)}</td>
      <td>${escapeHtml(p.name)}</td>
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
           
          <p><strong>Factura N°: ${escapeHtml(nextInvoiceNumber.value)}</strong></p>
          
        </div>

        <hr />

        <p><strong>Fecha:</strong> ${escapeHtml(date)}</p>
        <p><strong>Tipo:</strong> ${escapeHtml(tipoOrdenTexto)}</p>
        ${fiscal_name.value ? `<p><strong>Cliente:</strong> ${escapeHtml(fiscal_name.value)}</p>` : ''}
        ${fiscal_ruc.value ? `<p><strong>RUC:</strong> ${escapeHtml(fiscal_ruc.value)}</p>` : ''}

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
    if (result?.invoice_number) {
      nextInvoiceNumber.value = result.invoice_number;
    }

    const finalInvoiceHTML = getFinalInvoiceHTML(items, totalToPay);
    nextInvoiceNumber.value = '';
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
      name: item.product?.name || product?.name || 'Producto desconocido',
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
    selectedTable.value.active_order.calculated_discount = 0;

    toast.add({
      severity: 'success',
      summary: 'Descuento eliminado',
      detail: 'El descuento se ha eliminado correctamente.',
      life: 3000
    });
    
    discountReason.value = '';
    discountValue.value = 0;
    discountType.value = 'amount';
    showDiscountInput.value = false;
    openPanel.value = null;

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
    openPanel.value = null;
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
  const targetTable = props.tables?.find(t => t.id === newTableId);

  router.post(route('orders.transfertable', { order: orderId }), {
    new_table_id: newTableId
  }, {
    onSuccess: () => {
      toast.add({
        severity: 'success',
        summary: 'Orden transferida',
        detail: `La orden ha sido transferida a la mesa ${targetTable?.number ?? newTableId}.`,
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

// Sincronizar descuento parcial en vivo para la factura parcial
watch([togglePartialDiscount, partialDiscountType, partialDiscountValue, partialDiscountReason, partialTotal], ([enabled]) => {
  if (!enabled) {
    partialDiscountValue.value = 0;
    partialDiscountReason.value = '';
    partialDiscountType.value = 'amount';
    appliedPartialDiscount.value = null;
    return;
  }
  if (!partialDiscountType.value) partialDiscountType.value = 'amount';
  const val = Number(partialDiscountValue.value) || 0;
  if (val > 0) {
    appliedPartialDiscount.value = {
      type: partialDiscountType.value,
      amount: partialDiscountType.value === 'percent'
        ? (partialTotal.value * Math.min(val, 100)) / 100
        : Math.min(val, partialTotal.value),
      reason: partialDiscountReason.value || '',
    };
  } else {
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


// Sincronizar descuento llevar en vivo
watch([toggleTakeAwayDiscount, takeAwayDiscountType, takeAwayDiscountValue, takeAwayDiscountReason], ([enabled]) => {
  if (!enabled) {
    takeAwayDiscountValue.value = 0;
    takeAwayDiscountReason.value = '';
    takeAwayDiscountType.value = 'amount';
    appliedTakeAwayDiscount.value = null;
    return;
  }
  if (!takeAwayDiscountType.value) takeAwayDiscountType.value = 'amount';
  const val = Number(takeAwayDiscountValue.value) || 0;
  appliedTakeAwayDiscount.value = val > 0
    ? {
        type: takeAwayDiscountType.value,
        value: val,
        reason: takeAwayDiscountReason.value || '',
      }
    : null;
});


const pedidosYaProducts = computed(() => {
  const result = {}
  props.products.forEach(product => {
    if (product.is_py) {  // solo los que son de Pedidos Ya
      const cat = product.category || 'Sin categoría'
      if (!result[cat]) {
        result[cat] = []
      }
      result[cat].push(product)
    }
  })
  return result
})

const sourceGroups = computed(() => (isPedidosYa.value ? pedidosYaProducts.value : groupedProducts.value))

const catalogCategories = computed(() => Object.keys(sourceGroups.value || {}))

const visibleCatalog = computed(() => {
  const groups = sourceGroups.value || {}
  const q = productSearch.value.trim().toLowerCase()
  const cats = activeCategory.value === 'all'
    ? Object.keys(groups)
    : (groups[activeCategory.value] ? [activeCategory.value] : [])

  return cats
    .map(category => ({
      category,
      items: (groups[category] || []).filter(item =>
        !q || (item.name || '').toLowerCase().includes(q)
      ),
    }))
    .filter(group => group.items.length > 0)
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

// Sincronizar descuento pedidos ya en vivo
watch([togglePedidosYaDiscount, pedidosYaDiscountType, pedidosYaDiscountValue, pedidosYaDiscountReason], ([enabled]) => {
  if (!enabled) {
    pedidosYaDiscountValue.value = 0;
    pedidosYaDiscountReason.value = '';
    pedidosYaDiscountType.value = 'amount';
    appliedPedidosYaDiscount.value = null;
    return;
  }
  if (!pedidosYaDiscountType.value) pedidosYaDiscountType.value = 'amount';
  const val = Number(pedidosYaDiscountValue.value) || 0;
  appliedPedidosYaDiscount.value = val > 0
    ? {
        type: pedidosYaDiscountType.value,
        value: val,
        reason: pedidosYaDiscountReason.value || '',
      }
    : null;
});

</script>


<style>
/* Asegúrate de que los toasts estén visibles */
.p-toast {
  z-index: 2000 !important;
}
</style>
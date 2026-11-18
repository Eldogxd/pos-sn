<template>
  <AppLayout title="Productos">
    <template #header>
      <NavLayout />
    </template>

    <div class="p-3 mx-auto space-y-4 max-w-6xl sm:p-6">
      <!-- Encabezado y búsqueda -->
      <div class="p-3.5 space-y-3 card sm:p-5">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-xl font-bold text-gray-900 sm:text-2xl">Productos</h1>
            <p class="text-xs text-gray-500">
              Mostrando <strong class="text-gray-800">{{ filteredProducts.length }}</strong> de {{ products.length }} productos
            </p>
          </div>
          <button @click="openCreateModal" class="btn btn-primary w-full sm:w-auto">
            <i class="pi pi-plus text-xs"></i>
            <span>Nuevo Producto</span>
          </button>
        </div>

        <div class="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <div class="relative flex-1">
            <i class="pi pi-search text-xs text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
            <input v-model="searchQuery" type="text" placeholder="Buscar producto..." class="pl-9 input">
          </div>

          <div class="segmented shrink-0">
            <button
              type="button"
              @click="statusFilter = 'all'"
              :class="statusFilter === 'all' ? 'bg-white shadow-sm text-gray-900' : ''"
            >
              Todos ({{ products.length }})
            </button>
            <button
              type="button"
              @click="statusFilter = 'active'"
              :class="statusFilter === 'active' ? 'bg-white shadow-sm text-mantis-700' : ''"
            >
              Activos ({{ activeCount }})
            </button>
            <button
              type="button"
              @click="statusFilter = 'inactive'"
              :class="statusFilter === 'inactive' ? 'bg-white shadow-sm text-gray-900' : ''"
            >
              Inactivos ({{ inactiveCount }})
            </button>
          </div>
        </div>

        <div class="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
          <button
            @click="selectedCategory = 'all'"
            type="button"
            class="pill shrink-0"
            :class="selectedCategory === 'all' ? 'pill-active' : ''"
          >
            Todos
          </button>
          <button
            v-for="cat in productCategories"
            :key="cat"
            @click="selectedCategory = cat"
            type="button"
            class="pill shrink-0"
            :class="selectedCategory === cat ? 'pill-active' : ''"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- Vista Móvil: Tarjetas -->
      <div class="space-y-2.5 md:hidden">
        <div v-if="filteredProducts.length === 0" class="p-8 text-center text-sm text-gray-500 card">
          No hay productos que coincidan.
        </div>

        <div
          v-for="product in filteredProducts"
          :key="`m-${product.id}`"
          class="p-3.5 card space-y-2.5 transition"
          :class="product.is_active === false ? 'opacity-70 bg-gray-50/80' : ''"
        >
          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0">
              <p class="font-bold text-gray-900 truncate">{{ product.name }}</p>
              <div class="flex items-center gap-1.5 mt-1 flex-wrap">
                <span class="px-2 py-0.5 text-[11px] font-medium bg-gray-100 text-gray-700 rounded-full">
                  {{ product.category }}
                </span>
                <span
                  class="px-2 py-0.5 text-[11px] font-semibold rounded-full"
                  :class="product.is_active !== false ? 'bg-mantis-100 text-mantis-800' : 'bg-gray-200 text-gray-600'"
                >
                  {{ product.is_active !== false ? 'Activo' : 'Inactivo' }}
                </span>
                <span v-if="product.is_py" class="px-2 py-0.5 text-[11px] font-semibold bg-red-100 text-red-700 rounded-full">
                  PedidosYa: C${{ product.py_price }}
                </span>
              </div>
            </div>
            <span class="text-base font-extrabold text-mantis-700 tabular-nums shrink-0">
              C${{ product.price }}
            </span>
          </div>

          <div class="flex items-center justify-between gap-2 pt-2 border-t border-gray-100">
            <button
              type="button"
              role="switch"
              :aria-checked="product.is_active !== false ? 'true' : 'false'"
              @click="toggleActive(product)"
              class="inline-flex items-center gap-2 text-xs font-semibold text-gray-700"
            >
              <span
                class="relative inline-flex items-center w-9 h-5 rounded-full transition-colors"
                :class="product.is_active !== false ? 'bg-mantis-600' : 'bg-gray-300'"
              >
                <span
                  class="inline-block w-3.5 h-3.5 transition-transform transform bg-white rounded-full shadow"
                  :class="product.is_active !== false ? 'translate-x-5' : 'translate-x-0.5'"
                ></span>
              </span>
              <span>{{ product.is_active !== false ? 'Activo' : 'Inactivo' }}</span>
            </button>

            <div class="flex items-center gap-1.5">
              <button @click="openEditModal(product)" class="btn btn-outline py-1.5 px-3 text-xs">
                <i class="pi pi-pencil text-xs"></i>
                <span>Editar</span>
              </button>
              <button
                v-if="!product.is_generic"
                @click="deleteProduct(product.id)"
                class="btn btn-danger py-1.5 px-2.5 text-xs"
                title="Eliminar"
              >
                <i class="pi pi-trash text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Vista Desktop: Tabla -->
      <div class="hidden overflow-hidden card md:block">
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm text-gray-700">
            <thead class="text-xs font-semibold tracking-wide text-gray-600 uppercase border-b border-gray-200 bg-gray-50">
              <tr>
                <th class="px-5 py-3.5 text-left">Nombre</th>
                <th class="px-5 py-3.5 text-left">Categoría</th>
                <th class="px-5 py-3.5 text-right">Precio</th>
                <th class="px-5 py-3.5 text-center">Activo</th>
                <th class="px-5 py-3.5 text-center">PedidosYa</th>
                <th class="px-5 py-3.5 text-right">Precio PY</th>
                <th class="px-5 py-3.5 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr
                v-for="product in filteredProducts"
                :key="product.id"
                class="transition hover:bg-gray-50/70"
                :class="product.is_active === false ? 'opacity-65 bg-gray-50/60' : ''"
              >
                <td class="px-5 py-3.5 font-semibold text-gray-900">{{ product.name }}</td>
                <td class="px-5 py-3.5">
                  <span class="px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                    {{ product.category }}
                  </span>
                </td>
                <td class="px-5 py-3.5 font-bold text-right text-gray-900 tabular-nums">C${{ product.price }}</td>
                <td class="px-5 py-3.5 text-center">
                  <button
                    type="button"
                    role="switch"
                    :aria-checked="product.is_active !== false ? 'true' : 'false'"
                    @click="toggleActive(product)"
                    :title="product.is_active !== false ? 'Desactivar producto' : 'Activar producto'"
                    class="relative inline-flex items-center w-10 h-5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-mantis-500"
                    :class="product.is_active !== false ? 'bg-mantis-600' : 'bg-gray-300'"
                  >
                    <span
                      class="inline-block w-3.5 h-3.5 transition-transform transform bg-white rounded-full shadow"
                      :class="product.is_active !== false ? 'translate-x-5' : 'translate-x-1'"
                    ></span>
                  </button>
                </td>
                <td class="px-5 py-3.5 text-center">
                  <span
                    class="px-2.5 py-0.5 text-xs font-semibold rounded-full"
                    :class="product.is_py ? 'bg-mantis-100 text-mantis-800' : 'bg-gray-100 text-gray-500'"
                  >
                    {{ product.is_py ? 'Sí' : 'No' }}
                  </span>
                </td>
                <td class="px-5 py-3.5 font-medium text-right tabular-nums">
                  {{ product.is_py ? `C$${product.py_price}` : '—' }}
                </td>
                <td class="px-5 py-3.5">
                  <div class="flex items-center justify-center gap-2">
                    <button @click="openEditModal(product)" class="btn btn-outline py-1.5 px-3 text-xs">
                      <i class="pi pi-pencil text-xs"></i>
                      <span>Editar</span>
                    </button>
                    <button
                      v-if="!product.is_generic"
                      @click="deleteProduct(product.id)"
                      class="btn btn-danger py-1.5 px-3 text-xs"
                    >
                      <i class="pi pi-trash text-xs"></i>
                      <span>Eliminar</span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredProducts.length === 0">
                <td colspan="7" class="px-6 py-10 text-center text-gray-500">No hay productos que coincidan.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal Crear / Editar Producto -->
    <div v-if="showModal" class="modal-backdrop">
      <div class="modal-sheet w-full max-w-lg lg:h-auto">
        <div class="modal-header shrink-0">
          <h2 class="modal-title">{{ editMode ? 'Editar Producto' : 'Nuevo Producto' }}</h2>
          <button @click="closeModal" type="button" class="icon-btn">
            <i class="pi pi-times text-sm"></i>
          </button>
        </div>

        <form @submit.prevent="submit" class="flex flex-col flex-1 min-h-0">
          <div class="p-4 space-y-4 overflow-y-auto sm:p-5">
            <div>
              <label class="label">Nombre</label>
              <input v-model="form.name" type="text" class="input" placeholder="Nombre del producto" />
            </div>

            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label class="label">Precio (C$)</label>
                <input v-model="form.price" type="number" step="0.01" min="0" class="input" placeholder="0.00" />
              </div>

              <div>
                <label class="label">Categoría</label>
                <select v-model="form.category" class="input">
                  <option value="Sopas">Sopas</option>
                  <option value="Desayunos">Desayunos</option>
                  <option value="Bebidas">Bebidas</option>
                  <option value="Extras">Extras</option>
                  <option value="Postres">Postres</option>
                  <option value="Otros">Otros</option>
                </select>
              </div>
            </div>

            <!-- Toggle Activo (Productos de temporada) -->
            <div class="flex items-center justify-between gap-3 p-3.5 border border-gray-200 rounded-xl bg-gray-50/70">
              <div>
                <span class="text-sm font-semibold text-gray-800">Producto activo</span>
                <p class="text-xs text-gray-500">Si se desactiva, no aparecerá en Caja ni Delivery</p>
              </div>
              <button
                type="button"
                role="switch"
                :aria-checked="form.is_active ? 'true' : 'false'"
                @click="form.is_active = !form.is_active"
                class="relative inline-flex items-center w-11 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-mantis-500"
                :class="form.is_active ? 'bg-mantis-600' : 'bg-gray-300'"
              >
                <span
                  class="inline-block w-4 h-4 transition-transform transform bg-white rounded-full shadow"
                  :class="form.is_active ? 'translate-x-6' : 'translate-x-1'"
                ></span>
              </button>
            </div>

            <!-- Toggle PedidosYa -->
            <div class="p-3.5 space-y-3 border border-gray-200 rounded-xl bg-gray-50/70">
              <div class="flex items-center justify-between gap-3">
                <div>
                  <span class="text-sm font-semibold text-gray-800">Disponible en PedidosYa</span>
                  <p class="text-xs text-gray-500">Habilita precio diferenciado para plataforma</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  :aria-checked="form.is_py ? 'true' : 'false'"
                  @click="form.is_py = !form.is_py"
                  class="relative inline-flex items-center w-11 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-mantis-500"
                  :class="form.is_py ? 'bg-mantis-600' : 'bg-gray-300'"
                >
                  <span
                    class="inline-block w-4 h-4 transition-transform transform bg-white rounded-full shadow"
                    :class="form.is_py ? 'translate-x-6' : 'translate-x-1'"
                  ></span>
                </button>
              </div>

              <div v-if="form.is_py">
                <label class="label">Precio en PedidosYa (C$)</label>
                <input
                  v-model="form.py_price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  class="input"
                />
              </div>
            </div>

            <div v-if="Object.keys(form.errors).length" class="p-3 text-xs text-red-700 border border-red-200 rounded-xl bg-red-50">
              <ul class="space-y-0.5 list-disc list-inside">
                <li v-for="(error, field) in form.errors" :key="field">{{ error }}</li>
              </ul>
            </div>
          </div>

          <div class="modal-footer justify-end gap-2 pb-safe shrink-0">
            <button type="button" @click="closeModal" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-primary">
              <i class="pi pi-check text-xs"></i>
              <span>{{ editMode ? 'Actualizar' : 'Guardar' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref, computed } from 'vue'
import { router, useForm, usePage } from '@inertiajs/vue3'
import { Link } from '@inertiajs/vue3'
import NavLayout from '@/Layouts/NavLayout.vue';
import { nextTick } from 'vue'



const props = defineProps({
    products: Array,
})

const showModal =ref(false)
const searchQuery = ref('')
const selectedCategory = ref('all')
const statusFilter = ref('all') // 'all' | 'active' | 'inactive'

const activeCount = computed(() => (props.products || []).filter(p => p.is_active !== false).length)
const inactiveCount = computed(() => (props.products || []).filter(p => p.is_active === false).length)

const productCategories = computed(() => {
  const cats = new Set((props.products || []).map(p => p.category).filter(Boolean))
  return [...cats]
})

const filteredProducts = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return (props.products || []).filter(p => {
    const matchCat = selectedCategory.value === 'all' || p.category === selectedCategory.value
    const matchQ = !q || (p.name || '').toLowerCase().includes(q)
    const isActive = p.is_active !== false
    const matchStatus = statusFilter.value === 'all' || (statusFilter.value === 'active' ? isActive : !isActive)
    return matchCat && matchQ && matchStatus
  })
})
const editMode =ref(false)
const editingProductId =ref(null)

const form = useForm({
    name: '',
    price: '',
    category: '',
    is_py: false,
    py_price: '',
    is_active: true,
})

const openCreateModal = () => {
    editMode.value = false
    editingProductId.value = null
    form.reset()
    form.is_active = true
    showModal.value = true
}

const openEditModal = (product) => {
    editMode.value = true
    editingProductId.value = product.id
    form.name = product.name
    form.price = product.price
    form.category = product.category
    form.is_py = Boolean(product.is_py)
    form.py_price = product.py_price
    form.is_active = product.is_active ?? true
    showModal.value = true
    nextTick(() => {
        // el DOM se actualiza y peer-checked se aplica
    })
}

const toggleActive = (product) => {
    router.patch(route('productos.toggleActive', product.id), {}, {
        preserveScroll: true,
    })
}

const closeModal = () => {
    showModal.value = false
    form.reset()
    form.clearErrors()
}

const submit = () => {
    if (editMode.value) {
        form.put(route('productos.update', editingProductId.value),{
            onSuccess: closeModal
        })
    } else {
        form.post(route('productos.store'), {
            onSuccess: closeModal
        })
    }
}

const deleteProduct = (id) => {
    if(confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        router.delete(route('productos.destroy', id))
    }
}



</script>
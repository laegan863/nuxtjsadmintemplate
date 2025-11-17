<script setup lang="ts" generic="T extends Record<string, any>">
interface Props {
  data: T[]
  searchableFields?: (keyof T)[]
  striped?: boolean
  bordered?: boolean
  hoverable?: boolean
  searchable?: boolean
  paginated?: boolean
  perPageOptions?: number[]
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  striped: true,
  bordered: false,
  hoverable: true,
  searchable: true,
  paginated: true,
  perPageOptions: () => [5, 10, 25, 50, 100]
})

// Search
const searchQuery = ref('')

// Pagination
const currentPage = ref(1)
const perPage = ref(10)

// Automatic filtering
const filteredData = computed(() => {
  // Ensure data is an array
  const dataArray = Array.isArray(props.data) ? props.data : []
  let filtered = dataArray

  // Apply search filter
  if (props.searchable && searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item => {
      // If searchableFields is specified, search only those fields
      if (props.searchableFields && props.searchableFields.length > 0) {
        return props.searchableFields.some(field => {
          const value = item[field]
          return value != null && String(value).toLowerCase().includes(query)
        })
      }
      // Otherwise, search all fields
      return Object.values(item).some(value => 
        value != null && String(value).toLowerCase().includes(query)
      )
    })
  }

  return filtered
})

// Paginated data
const paginatedData = computed(() => {
  const filtered = filteredData.value
  if (!props.paginated || !Array.isArray(filtered)) return filtered
  
  const start = (currentPage.value - 1) * perPage.value
  return filtered.slice(start, start + perPage.value)
})

// Calculate total pages
const totalItems = computed(() => filteredData.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / perPage.value))

// Watch for changes that should reset to page 1
watch([searchQuery, perPage], () => {
  currentPage.value = 1
})

// Methods to expose to parent
defineExpose({
  searchQuery,
  currentPage,
  perPage,
  filteredData,
  paginatedData
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const previousPage = () => goToPage(currentPage.value - 1)
const nextPage = () => goToPage(currentPage.value + 1)

// Pagination range display
const paginationRange = computed(() => {
  const range = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    range.push(i)
  }
  
  return range
})
</script>

<template>
  <div class="space-y-4">
    <!-- Table Controls -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <!-- Search -->
      <div v-if="searchable" class="w-full sm:w-auto">
        <div class="relative">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Search..."
            class="w-full sm:w-64 rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
        </div>
      </div>

      <!-- Per Page Selector -->
      <div v-if="paginated" class="flex items-center gap-2">
        <label class="text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">Show:</label>
        <select
          v-model="perPage"
          class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          @change="currentPage = 1"
        >
          <option v-for="option in perPageOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <span class="text-sm text-gray-700 dark:text-gray-300">entries</span>
      </div>
    </div>

    <!-- Table Container -->
    <div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-800">
          <slot name="thead" />
        </thead>
        <tbody
          :class="[
            'divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900',
            striped && '[&>tr:nth-child(even)]:bg-gray-50 dark:[&>tr:nth-child(even)]:bg-gray-800/50',
            hoverable && '[&>tr]:hover:bg-gray-50 dark:[&>tr]:hover:bg-gray-800/50 [&>tr]:transition-colors'
          ]"
        >
          <slot name="tbody" :paginated-data="paginatedData" :filtered-data="filteredData" />
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="paginated && totalPages > 1" class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <!-- Info -->
      <div class="text-sm text-gray-700 dark:text-gray-300">
        Showing
        <span class="font-medium">{{ (currentPage - 1) * perPage + 1 }}</span>
        to
        <span class="font-medium">{{ Math.min(currentPage * perPage, totalItems) }}</span>
        of
        <span class="font-medium">{{ totalItems }}</span>
        results
      </div>

      <!-- Pagination Controls -->
      <nav class="flex items-center gap-1">
        <!-- Previous Button -->
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <!-- First Page -->
        <button
          v-if="paginationRange.length > 0 && (paginationRange[0] ?? 0) > 1"
          @click="goToPage(1)"
          class="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          1
        </button>

        <!-- Ellipsis -->
        <span v-if="paginationRange.length > 0 && (paginationRange[0] ?? 0) > 2" class="px-2 text-gray-500">...</span>

        <!-- Page Numbers -->
        <button
          v-for="page in paginationRange"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-colors',
            page === currentPage
              ? 'bg-indigo-600 text-white border-indigo-600 dark:bg-indigo-500'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
          ]"
        >
          {{ page }}
        </button>

        <!-- Ellipsis -->
        <span v-if="paginationRange.length > 0 && (paginationRange[paginationRange.length - 1] ?? 0) < totalPages - 1" class="px-2 text-gray-500">...</span>

        <!-- Last Page -->
        <button
          v-if="paginationRange.length > 0 && (paginationRange[paginationRange.length - 1] ?? 0) < totalPages"
          @click="goToPage(totalPages)"
          class="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          {{ totalPages }}
        </button>

        <!-- Next Button -->
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </nav>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar for table */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background-color: #f3f4f6;
  border-radius: 0.25rem;
}

:global(.dark) .overflow-x-auto::-webkit-scrollbar-track {
  background-color: #1f2937;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 0.25rem;
}

:global(.dark) .overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: #4b5563;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background-color: #9ca3af;
}

:global(.dark) .overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background-color: #6b7280;
}
</style>
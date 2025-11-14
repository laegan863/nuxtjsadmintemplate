<script setup lang="ts">
interface Option {
  value: string | number
  label: string
  disabled?: boolean
}

const props = defineProps<{
  modelValue?: string | number
  options: Option[]
  placeholder?: string
  label?: string
  disabled?: boolean
  required?: boolean
  error?: string
  hint?: string
  searchable?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const searchQuery = ref('')
const selectRef = ref<HTMLDivElement>()
const triggerRef = ref<HTMLDivElement>()
const dropdownPosition = ref({ top: 0, left: 0, width: 0 })

// Calculate dropdown position
const updateDropdownPosition = () => {
  if (triggerRef.value) {
    const rect = triggerRef.value.getBoundingClientRect()
    dropdownPosition.value = {
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width
    }
  }
}

// Filter options based on search query
const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value) {
    return props.options
  }
  return props.options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Get selected option label
const selectedLabel = computed(() => {
  const selected = props.options.find(opt => opt.value === props.modelValue)
  return selected ? selected.label : props.placeholder || 'Select an option'
})

const selectOption = (option: Option) => {
  if (!option.disabled) {
    emit('update:modelValue', option.value)
    isOpen.value = false
    searchQuery.value = ''
  }
}

const toggleDropdown = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
    if (isOpen.value) {
      updateDropdownPosition()
      searchQuery.value = ''
      nextTick(() => {
        const searchInput = document.querySelector('.select-dropdown-search')
        if (searchInput) {
          (searchInput as HTMLInputElement).focus()
        }
      })
    }
  }
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    isOpen.value = false
    searchQuery.value = ''
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', updateDropdownPosition)
  window.addEventListener('scroll', updateDropdownPosition, true)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', updateDropdownPosition)
  window.removeEventListener('scroll', updateDropdownPosition, true)
})

const containerClasses = computed(() => [
  'relative w-full rounded-lg border px-4 py-2 text-sm transition-colors duration-200 cursor-pointer',
  'focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-0',
  props.error
    ? 'border-red-300 focus-within:border-red-500 focus-within:ring-red-500 dark:border-red-600 dark:focus-within:border-red-500'
    : 'border-gray-300 bg-white focus-within:border-indigo-500 focus-within:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:focus-within:border-indigo-400 dark:focus-within:ring-indigo-400',
  props.disabled && 'cursor-not-allowed opacity-60 bg-gray-100 dark:bg-gray-800'
])
</script>

<template>
  <div class="space-y-1.5">
    <label v-if="label" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div ref="selectRef" class="relative">
      <!-- Select trigger -->
      <div
        ref="triggerRef"
        :class="containerClasses"
        @click="toggleDropdown"
      >
        <div class="flex items-center justify-between min-h-[20px]">
          <span 
            :class="[
              'block truncate',
              !modelValue ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'
            ]"
          >
            {{ selectedLabel }}
          </span>
          <svg 
            :class="[
              'h-5 w-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-2',
              isOpen && 'rotate-180'
            ]" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Dropdown menu (teleported to body) -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-show="isOpen"
          :style="{
            position: 'absolute',
            top: `${dropdownPosition.top + 4}px`,
            left: `${dropdownPosition.left}px`,
            width: `${dropdownPosition.width}px`,
            zIndex: 9999
          }"
          class="rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800 dark:ring-white dark:ring-opacity-10"
        >
          <!-- Search input -->
          <div v-if="searchable" class="p-2 border-b border-gray-200 dark:border-gray-700">
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search..."
                class="select-dropdown-search w-full rounded-md border border-gray-300 bg-white pl-10 pr-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                @click.stop
              />
            </div>
          </div>

          <!-- Options list -->
          <div class="max-h-60 overflow-y-auto p-1">
            <div
              v-for="option in filteredOptions"
              :key="option.value"
              :class="[
                'flex items-center justify-between px-3 py-2.5 text-sm rounded-md cursor-pointer transition-colors',
                option.value === modelValue
                  ? 'bg-indigo-50 text-indigo-700 font-medium dark:bg-indigo-900/30 dark:text-indigo-300'
                  : 'text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700',
                option.disabled && 'opacity-50 cursor-not-allowed'
              ]"
              @click="selectOption(option)"
            >
              <span class="block truncate">{{ option.label }}</span>
              <svg
                v-if="option.value === modelValue"
                class="h-5 w-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <!-- No results message -->
            <div
              v-if="filteredOptions.length === 0"
              class="px-3 py-8 text-center text-sm text-gray-500 dark:text-gray-400"
            >
              No options found
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
    
    <p v-if="error" class="text-xs text-red-600 dark:text-red-400">
      {{ error }}
    </p>
    
    <p v-else-if="hint" class="text-xs text-gray-500 dark:text-gray-400">
      {{ hint }}
    </p>
  </div>
</template>

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
}>()

const emit = defineEmits(['update:modelValue'])

const selectClasses = computed(() => [
  'w-full rounded-lg border px-4 py-2.5 text-sm transition-colors duration-200 appearance-none bg-no-repeat',
  'focus:outline-none focus:ring-2 focus:ring-offset-0',
  props.error
    ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500 dark:border-red-600 dark:text-red-400 dark:focus:border-red-500'
    : 'border-gray-300 bg-white text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400',
  props.disabled && 'cursor-not-allowed opacity-60 bg-gray-100 dark:bg-gray-800'
])

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="space-y-1.5">
    <label v-if="label" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="relative">
      <select
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        :class="selectClasses"
        @change="handleChange"
      >
        <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>
      
      <!-- Dropdown arrow icon -->
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
    
    <p v-if="error" class="text-xs text-red-600 dark:text-red-400">
      {{ error }}
    </p>
    
    <p v-else-if="hint" class="text-xs text-gray-500 dark:text-gray-400">
      {{ hint }}
    </p>
  </div>
</template>

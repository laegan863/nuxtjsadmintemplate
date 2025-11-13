<script setup lang="ts">
const props = defineProps<{
  type?: string
  modelValue?: string | number
  placeholder?: string
  label?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  error?: string
  hint?: string
}>()

const emit = defineEmits(['update:modelValue'])

const inputClasses = computed(() => [
  'w-full rounded-lg border px-4 py-2.5 text-sm transition-colors duration-200',
  'focus:outline-none focus:ring-2 focus:ring-offset-0',
  props.error
    ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-600 dark:text-red-400 dark:placeholder-red-500 dark:focus:border-red-500'
    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-400 dark:focus:ring-indigo-400',
  props.disabled && 'cursor-not-allowed opacity-60 bg-gray-100 dark:bg-gray-800',
  props.readonly && 'bg-gray-50 dark:bg-gray-800'
])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="space-y-1.5">
    <label v-if="label" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <input
      :type="type || 'text'"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="props.readonly"
      :required="required"
      :class="inputClasses"
      @input="handleInput"
    />
    
    <p v-if="error" class="text-xs text-red-600 dark:text-red-400">
      {{ error }}
    </p>
    
    <p v-else-if="hint" class="text-xs text-gray-500 dark:text-gray-400">
      {{ hint }}
    </p>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  title?: string
  padding?: boolean,
  class?: string
}>()
</script>

<template>
  <div class="relative overflow-hidden rounded-xl bg-white shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <div v-if="title || $slots.header" class="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <slot name="header">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ title }}</h3>
      </slot>
    </div>
    
    <div class="p-6">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="border-t border-gray-200 dark:border-gray-700 px-6 py-4 bg-gray-50 dark:bg-gray-800/50">
      <slot name="footer" />
    </div>
  </div>
</template>

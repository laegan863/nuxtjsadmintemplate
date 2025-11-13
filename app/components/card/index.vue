<script setup>
defineProps({
  title: String,
  value: String,
  change: String,
  trend: {
    type: String,
    default: 'up' // 'up' or 'down'
  },
  icon: String,
  iconClass: String
})
</script>

<template>
  <div class="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ title }}</p>
        <p class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{{ value }}</p>
        
        <div class="mt-3 flex items-center gap-x-2">
          <div 
            :class="[
              'flex items-center gap-x-1 rounded-full px-2 py-1 text-xs font-medium',
              trend === 'up' 
                ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'
            ]"
          >
            <svg 
              v-if="trend === 'up'"
              class="h-3 w-3" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke-width="2" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
            <svg 
              v-else
              class="h-3 w-3" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke-width="2" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
            <span>{{ change }}</span>
          </div>
          <span class="text-xs text-gray-500 dark:text-gray-400">vs last month</span>
        </div>
      </div>

      <div :class="['rounded-2xl p-4', iconClass]">
        <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" :d="icon" />
        </svg>
      </div>
    </div>
  </div>
</template>
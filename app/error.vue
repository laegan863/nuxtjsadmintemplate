<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const { isDark } = useDarkMode()

const is404 = computed(() => props.error.statusCode === 404)

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 transition-colors duration-200">
    <div class="max-w-2xl w-full text-center">
      <!-- Error Illustration -->
      <div class="mb-8">
        <div class="relative inline-block">
          <!-- 404 Number -->
          <div class="text-[180px] font-bold leading-none">
            <span class="bg-gradient-to-br from-indigo-500 to-indigo-700 bg-clip-text text-transparent">
              {{ is404 ? '404' : error.statusCode || '500' }}
            </span>
          </div>
          
          <!-- Animated Background Circle -->
          <div class="absolute inset-0 -z-10 flex items-center justify-center">
            <div class="h-64 w-64 rounded-full bg-indigo-500/10 animate-pulse"></div>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div class="space-y-4 mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          {{ is404 ? 'Page Not Found' : 'Something Went Wrong' }}
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          {{ is404 
            ? "The page you're looking for doesn't exist or has been moved." 
            : error.message || 'An unexpected error occurred. Please try again later.' 
          }}
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          @click="handleError"
          class="inline-flex items-center gap-x-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          Back to Home
        </button>
        
        <button
          @click="$router.back()"
          class="inline-flex items-center gap-x-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Go Back
        </button>
      </div>

      <!-- Additional Help -->
      <div v-if="is404" class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Looking for something specific?</p>
        <div class="flex flex-wrap gap-2 justify-center">
          <a href="/" class="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline">
            Dashboard
          </a>
          <span class="text-gray-300 dark:text-gray-600">•</span>
          <a href="/profile" class="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline">
            Profile
          </a>
          <span class="text-gray-300 dark:text-gray-600">•</span>
          <a href="/settings" class="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline">
            Settings
          </a>
          <span class="text-gray-300 dark:text-gray-600">•</span>
          <a href="/help" class="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline">
            Help
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
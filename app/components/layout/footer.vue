<script setup lang="ts">
const { user } = useUser()
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="border-t bg-white px-4 py-4 sm:px-6 lg:px-8 dark:bg-gray-800 dark:border-gray-700">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-x-3">
        <img class="h-8 w-8 rounded-full" :src="user.avatar" :alt="user.name">
        <div class="text-sm">
          <p class="font-medium text-gray-900 dark:text-white">{{ user.name }}</p>
          <p class="text-gray-500 dark:text-gray-400">{{ user.email }}</p>
        </div>
      </div>
      <div class="text-sm text-gray-500 dark:text-gray-400">
        &copy; {{ currentYear }} Admin Dashboard. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const route = useRoute()

const layoutName = computed<'index' | 'app'>(() => {
  return route.path === '/login' ? 'index' : 'app'
})
</script>

<template>
  <NuxtLayout :name="layoutName">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute()

const layoutName = computed<'app' | 'index'>(() => {
  return route.path.startsWith('/admin/') ? 'app' : 'index'
})
</script>

<template>
  <NuxtLayout :name="layoutName">
    <NuxtPage />
  </NuxtLayout>
</template>

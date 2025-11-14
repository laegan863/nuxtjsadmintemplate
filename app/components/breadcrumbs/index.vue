<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  to?: string
  class?: string
}

interface Props {
  items?: BreadcrumbItem[]
}

const props = defineProps<Props>()
const route = useRoute()

const breadcrumbs = computed(() => {
  if (props.items) {
    return props.items
  }

  // Auto-generate breadcrumbs from route path
  const pathSegments = route.path.split('/').filter(Boolean)
  const crumbs: BreadcrumbItem[] = [{ label: 'Home', to: '/' }]

  let currentPath = ''
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    
    crumbs.push({
      label,
      to: index === pathSegments.length - 1 ? undefined : currentPath
    })
  })

  return crumbs
})
</script>

<template>
  <nav class="flex" aria-label="Breadcrumb" :class="props.items">
    <ol class="inline-flex items-center space-x-1 md:space-x-2">
      <li v-for="(item, index) in breadcrumbs" :key="index" class="inline-flex items-center">
        <div v-if="index > 0" class="flex items-center">
          <svg class="w-3 h-3 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
        
        <NuxtLink
          v-if="item.to"
          :to="item.to"
          class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
        >
          <svg v-if="index === 0" class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          {{ item.label }}
        </NuxtLink>
        
        <span
          v-else
          class="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-500"
        >
          <svg v-if="index === 0" class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>
<script setup lang="ts">
interface Props {
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  align: 'left',
  sortable: false
})

const emit = defineEmits(['sort'])

const handleSort = () => {
  if (props.sortable) {
    emit('sort')
  }
}
</script>

<template>
  <th
    :class="[
      'px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400',
      align === 'left' && 'text-left',
      align === 'center' && 'text-center',
      align === 'right' && 'text-right',
      sortable && 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors select-none'
    ]"
    @click="handleSort"
  >
    <div :class="['flex items-center gap-2', align === 'center' && 'justify-center', align === 'right' && 'justify-end']">
      <slot />
      <svg
        v-if="sortable"
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
      </svg>
    </div>
  </th>
</template>

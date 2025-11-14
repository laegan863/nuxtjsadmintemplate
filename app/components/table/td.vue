<script setup lang="ts">
interface Props {
  align?: 'left' | 'center' | 'right'
  truncate?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  align: 'left',
  truncate: false
})
</script>

<template>
  <td
    :class="[
      'px-6 py-4 text-sm text-gray-900 dark:text-gray-100',
      align === 'left' && 'text-left',
      align === 'center' && 'text-center',
      align === 'right' && 'text-right',
      truncate ? 'truncate max-w-xs' : 'whitespace-nowrap'
    ]"
  >
    <slot />
  </td>
</template>

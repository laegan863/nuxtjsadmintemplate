<script setup lang="ts">
interface Props {
  variant?: 'success' | 'warning' | 'danger' | 'info'
  title?: string
  message?: string
  dismissible?: boolean
  icon?: boolean,
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'info',
  dismissible: false,
  icon: true
})

const emit = defineEmits(['dismiss'])

const isVisible = ref(true)

const handleDismiss = () => {
  isVisible.value = false
  emit('dismiss')
}

const variantClasses = computed(() => {
  const variants = {
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-800 dark:text-green-200',
      icon: 'text-green-400 dark:text-green-500'
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-800 dark:text-yellow-200',
      icon: 'text-yellow-400 dark:text-yellow-500'
    },
    danger: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-800 dark:text-red-200',
      icon: 'text-red-400 dark:text-red-500'
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-800 dark:text-blue-200',
      icon: 'text-blue-400 dark:text-blue-500'
    }
  }
  return variants[props.variant]
})

const iconPath = computed(() => {
  const icons = {
    success: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    warning: 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z',
    danger: 'M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    info: 'M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
  }
  return icons[props.variant]
})
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 -translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-2"
  >
    <div
      v-if="isVisible"
      :class="[
        'rounded-lg border p-4',
        variantClasses.bg,
        variantClasses.border,
        variantClasses.text,
        props.class
      ]"
      role="alert"
    >
      <div class="flex items-start gap-3">
        <!-- Icon -->
        <div v-if="icon" class="flex-shrink-0">
          <svg
            :class="['h-5 w-5', variantClasses.icon]"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" :d="iconPath" />
          </svg>
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <h3 v-if="title" class="text-sm font-semibold mb-1">
            {{ title }}
          </h3>
          <div class="text-sm">
            <slot>{{ message }}</slot>
          </div>
        </div>

        <!-- Dismiss Button -->
        <button
          v-if="dismissible"
          @click="handleDismiss"
          type="button"
          :class="[
            'flex-shrink-0 rounded-lg p-1.5 inline-flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
            variantClasses.text
          ]"
          aria-label="Dismiss"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>
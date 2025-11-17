<script setup lang="ts">
interface DropdownOption {
  value: string | number
  label: string
  disabled?: boolean
  icon?: string
  divider?: boolean
  danger?: boolean
}

interface Props {
  modelValue?: string | number | null
  options: Array<DropdownOption>
  placeholder?: string
  disabled?: boolean
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
  size?: 'small' | 'medium' | 'large'
  variant?: 'default' | 'primary' | 'success' | 'danger'
  mode?: 'select' | 'action'
  width?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  placeholder: 'Select an option',
  disabled: false,
  position: 'bottom-right',
  size: 'medium',
  variant: 'default',
  mode: 'action',
  width: 'auto'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null]
  'select': [value: string | number]
}>()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const menuPosition = ref<{ 
  top: string
  left: string
  width: string
  position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
}>({ 
  top: '0px', 
  left: '0px', 
  width: '0px', 
  position: 'bottom-right'
})

const selectedOption = computed(() => {
  return props.options.find(option => option.value === props.modelValue)
})

const toggleDropdown = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
    if (isOpen.value) {
      nextTick(() => {
        updateMenuPosition()
      })
    }
  }
}

const updateMenuPosition = () => {
  if (!triggerRef.value) return
  
  const rect = triggerRef.value.getBoundingClientRect()
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  
  // Estimate menu dimensions
  const menuWidth = props.mode === 'select' ? rect.width : (props.width !== 'auto' ? parseFloat(props.width) : 192)
  const estimatedMenuHeight = Math.min(props.options.length * 42 + 16, 240) // max-h-60 = 240px
  
  let top = 0
  let left = 0
  let actualPosition = props.position
  
  // Smart positioning: check if dropdown fits in viewport
  const spaceBelow = viewportHeight - rect.bottom
  const spaceAbove = rect.top
  const spaceRight = viewportWidth - rect.right
  const spaceLeft = rect.left
  
  // Determine vertical position
  const preferBottom = props.position.startsWith('bottom')
  let useBottom = preferBottom
  
  if (preferBottom && spaceBelow < estimatedMenuHeight && spaceAbove > spaceBelow) {
    // Not enough space below, but more space above
    useBottom = false
  } else if (!preferBottom && spaceAbove < estimatedMenuHeight && spaceBelow > spaceAbove) {
    // Not enough space above, but more space below
    useBottom = true
  }
  
  // Determine horizontal position
  const preferRight = props.position.endsWith('right')
  let alignRight = preferRight
  
  if (props.mode === 'action') {
    // For action menus, check if there's enough space
    if (preferRight && spaceRight < menuWidth && spaceLeft > menuWidth) {
      alignRight = false
    } else if (!preferRight && spaceLeft < menuWidth && spaceRight > menuWidth) {
      alignRight = true
    }
  }
  
  // Calculate final position
  if (useBottom) {
    top = rect.bottom + 8
  } else {
    top = rect.top - estimatedMenuHeight - 8
  }
  
  if (props.mode === 'action') {
    if (alignRight) {
      left = rect.right - menuWidth
      // Ensure it doesn't go off the left edge
      if (left < 8) left = 8
    } else {
      left = rect.left
      // Ensure it doesn't go off the right edge
      if (left + menuWidth > viewportWidth - 8) {
        left = viewportWidth - menuWidth - 8
      }
    }
  } else {
    left = rect.left
    // For select mode, ensure full width is visible
    if (left + menuWidth > viewportWidth - 8) {
      left = viewportWidth - menuWidth - 8
    }
    if (left < 8) left = 8
  }
  
  // Update actual position for animation origin
  actualPosition = `${useBottom ? 'bottom' : 'top'}-${alignRight ? 'right' : 'left'}` as any
  
  menuPosition.value = {
    top: `${Math.max(8, top)}px`,
    left: `${left}px`,
    width: props.mode === 'select' ? `${rect.width}px` : (props.width !== 'auto' ? props.width : 'auto'),
    position: actualPosition
  }
}

const selectOption = (value: string | number) => {
  const option = props.options.find(opt => opt.value === value)
  if (option && !option.disabled && !option.divider) {
    emit('update:modelValue', value)
    emit('select', value)
    isOpen.value = false
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

const handleScroll = () => {
  if (isOpen.value) {
    isOpen.value = false
  }
}

const handleResize = () => {
  if (isOpen.value) {
    isOpen.value = false
  }
}

const positionClasses = computed(() => {
  const positions = {
    'bottom-left': 'origin-top-left',
    'bottom-right': 'origin-top-right',
    'top-left': 'origin-bottom-left',
    'top-right': 'origin-bottom-right',
  }
  return positions[menuPosition.value.position || props.position]
})

const sizeClasses = computed(() => {
  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2.5 text-sm',
    large: 'px-5 py-3 text-base',
  }
  return sizes[props.size]
})

const variantClasses = computed(() => {
  const variants = {
    default: 'border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500',
    primary: 'border-indigo-300 dark:border-indigo-600 focus:border-indigo-500 focus:ring-indigo-500',
    success: 'border-green-300 dark:border-green-600 focus:border-green-500 focus:ring-green-500',
    danger: 'border-red-300 dark:border-red-600 focus:border-red-500 focus:ring-red-500',
  }
  return variants[props.variant]
})

const menuWidthClass = computed(() => {
  if (props.width === 'auto') {
    return props.mode === 'action' ? 'min-w-[12rem]' : 'w-full'
  }
  return ''
})

const menuWidthStyle = computed(() => {
  if (props.width !== 'auto') {
    return { width: props.width }
  }
  return {}
})

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleScroll, true)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScroll, true)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div ref="dropdownRef" class="relative inline-block text-left" :class="mode === 'select' ? 'w-full' : ''">
    <div ref="triggerRef">
      <!-- Custom Trigger (for action menus) -->
      <div v-if="$slots.trigger" @click="toggleDropdown" class="cursor-pointer">
        <slot name="trigger" :is-open="isOpen" />
      </div>

      <!-- Default Select Button (for select mode) -->
      <button
        v-else
        type="button"
        @click="toggleDropdown"
        :disabled="disabled"
        :class="[
          'w-full flex items-center justify-between rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-0',
          sizeClasses,
          variantClasses,
          disabled && 'opacity-60 cursor-not-allowed',
          !disabled && 'hover:border-gray-400 dark:hover:border-gray-500'
        ]"
      >
        <span :class="[!selectedOption && 'text-gray-500 dark:text-gray-400']">
          {{ selectedOption?.label || placeholder }}
        </span>
        <svg
          :class="[
            'h-5 w-5 transition-transform duration-200 text-gray-400',
            isOpen && 'transform rotate-180'
          ]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <!-- Dropdown Menu (Teleported to body) -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-if="isOpen"
          :class="[
            'fixed z-[9999] rounded-lg shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden',
            positionClasses,
            menuPosition.width === 'auto' ? 'min-w-[12rem]' : ''
          ]"
          :style="{
            top: menuPosition.top,
            left: menuPosition.left,
            width: menuPosition.width !== 'auto' ? menuPosition.width : undefined
          }"
        >
          <div class="max-h-60 overflow-y-auto py-1">
            <template v-for="(option, index) in options" :key="option.value || index">
              <!-- Divider -->
              <div
                v-if="option.divider"
                class="h-px bg-gray-200 dark:bg-gray-700 my-1"
              />
              
              <!-- Menu Item -->
              <button
                v-else
                type="button"
                @click="selectOption(option.value)"
                :disabled="option.disabled"
                :class="[
                  'w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 flex items-center gap-3',
                  option.danger
                    ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                    : option.value === modelValue && mode === 'select'
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium'
                    : 'text-gray-900 dark:text-gray-100',
                  option.disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : !option.danger && 'hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
                ]"
              >
                <!-- Icon slot -->
                <span v-if="option.icon" v-html="option.icon" class="flex-shrink-0" />
                
                <span class="flex-1">{{ option.label }}</span>
                
                <!-- Checkmark for selected item in select mode -->
                <svg
                  v-if="option.value === modelValue && mode === 'select'"
                  class="h-4 w-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </template>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
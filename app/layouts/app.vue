<script setup>
const sidebarOpen = ref(false)
const sidebarCollapsed = ref(false)
const sidebarHovered = ref(false)
</script>

<template>
  <div class="min-h-screen">
    <!-- Mobile sidebar backdrop -->
    <div 
      v-show="sidebarOpen" 
      class="fixed inset-0 z-40 bg-gray-900/80 lg:hidden"
      @click="sidebarOpen = false"
    />

    <!-- Sidebar for desktop -->
    <div 
      :class="[
        'hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all duration-300',
        sidebarCollapsed && !sidebarHovered ? 'lg:w-20' : 'lg:w-72'
      ]"
      @mouseenter="sidebarHovered = true"
      @mouseleave="sidebarHovered = false"
    >
      <LayoutSidebar :collapsed="sidebarCollapsed && !sidebarHovered" />
    </div>

    <!-- Mobile sidebar -->
    <div 
      :class="[
        'fixed inset-y-0 z-50 flex w-72 flex-col transition-transform duration-300 lg:hidden',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <LayoutSidebar :collapsed="false" />
    </div>

    <!-- Main content -->
    <div 
      :class="[
        'transition-all duration-300',
        sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'
      ]"
    >
      <!-- Top navbar -->
      <LayoutNavbar 
        @toggle-sidebar="sidebarOpen = !sidebarOpen" 
        @toggle-collapse="sidebarCollapsed = !sidebarCollapsed"
      />
      
      <!-- Page content -->
      <main class="py-8 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-200">
        
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          
          <Transition
            mode="out-in"
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-4"
          >
            <NuxtPage />
          </Transition>
        </div>
      </main>
    </div>
  </div>
</template>
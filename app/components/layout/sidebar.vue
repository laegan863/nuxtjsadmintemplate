<script setup lang="ts">
const props = defineProps<{
  collapsed: boolean
}>()

const { user } = useUser()
const route = useRoute()
const showUserMenu = ref(false)

const sidebar = [
    {
        name: 'Dashboard',
        icon: 'house',
        link: '/',
        children: [],
        isOpen: ref(false)
    },
    {
        name: 'Pages',
        icon: 'file',
        link: '#',
        isOpen: ref(false),
        children: [
            {
                name: 'Profile',
                icon: 'circle',
                link: '/profile',
            },
            {
                name: 'Projects',
                icon: 'circle',
                link: '/projects',
            },
            {
                name: 'Calendar',
                icon: 'circle',
                link: '/calendar',
            },
            {
                name: 'Documents',
                icon: 'circle',
                link: '/documents',
            },
            {
                name: 'Reports',
                icon: 'circle',
                link: '/reports',
            },
        ]
    },
    {
        name: 'Components',
        icon: 'cubes',
        link: '#',
        isOpen: ref(false),
        children: [
            {
                name: 'Alerts',
                icon: 'circle',
                link: '/components/alert',
            },
            {
                name: 'Buttons',
                icon: 'circle',
                link: '/components/buttons',
            },
            {
                name: 'Cards',
                icon: 'circle',
                link: '/components/cards',
            },
            {
                name: 'Tables',
                icon: 'circle',
                link: '/components/tables',
            },
            {
                name: 'Modals',
                icon: 'circle',
                link: '/components/modal',
            },
            {
                name: 'Forms',
                icon: 'circle',
                link: '/components/forms',
            },
        ]
    },
    {
        name: 'Analytics',
        icon: 'gauge',
        link: '/analytics',
        children: [],
        isOpen: ref(false)
    },
    {
        name: 'Reports',
        icon: 'folder',
        link: '/reports',
        children: [],
        isOpen: ref(false)
    },
    {
        name: 'Settings',
        icon: 'gear',
        link: '/settings',
        children: [],
        isOpen: ref(false)
    },
]


  const isActive = (href: string) => {
    return route.path === href
  }
</script>

<template>
  <div class="flex h-full flex-col bg-white dark:bg-gray-800 transition-all duration-300">
    <!-- Logo/Brand - Fixed at top -->
    <div class="flex h-20 shrink-0 items-center border-b border-gray-100 dark:border-gray-700 transition-all duration-300"
         :class="collapsed ? 'px-4 justify-center' : 'px-6'">
      <div class="flex items-center gap-x-3">
        <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg shadow-indigo-500/30 shrink-0">
          <span class="text-xl font-bold text-white">A</span>
        </div>
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 w-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0 w-0"
        >
          <div v-show="!collapsed">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">Admin</h2>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Navigation - Scrollable middle section -->
    <nav class="flex-1 py-6 overflow-y-auto sidebar-scroll transition-all duration-300"
         :class="collapsed ? 'px-2' : 'px-4'">
      <ul role="list" class="space-y-1">
        <!-- Loop through sidebar items -->
        <li v-for="item in sidebar" :key="item.name">
          <!-- Item with children (dropdown) -->
          <template v-if="item.children && item.children.length > 0">
            <button
              @click="item.isOpen.value = !item.isOpen.value"
              class="group flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-all duration-200"
              :class="collapsed ? 'justify-center' : 'justify-between gap-x-3'"
              :title="collapsed ? item.name : ''"
            >
              <div class="flex items-center gap-x-3 min-w-0">
                <font-awesome-icon :icon="['fas', item.icon]" class="h-5 w-5 shrink-0" />
                <span v-show="!collapsed" class="whitespace-nowrap">{{ item.name }}</span>
              </div>
              <svg 
                v-show="!collapsed"
                :class="[
                  'h-4 w-4 transition-transform duration-200 shrink-0',
                  item.isOpen.value ? 'rotate-180' : ''
                ]" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <!-- Dropdown Menu -->
            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 -translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-2"
            >
              <ul v-show="item.isOpen.value && !collapsed" class="mt-1 space-y-0.5 pl-8">
                <li v-for="child in item.children" :key="child.name">
                  <NuxtLink
                    :to="child.link"
                    :class="[
                      isActive(child.link)
                        ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 font-medium'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700/50',
                      'flex items-center gap-x-2 rounded-lg py-2 px-3 text-sm transition-all duration-200'
                    ]"
                  >
                    <span 
                      :class="[
                        isActive(child.link)
                          ? 'bg-indigo-600 dark:bg-indigo-400'
                          : 'bg-gray-300 dark:bg-gray-600',
                        'inline-block h-1.5 w-1.5 rounded-full shrink-0'
                      ]"
                    ></span>
                    <span class="whitespace-nowrap">{{ child.name }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </Transition>
          </template>

          <!-- Item without children (direct link) -->
          <template v-else>
            <NuxtLink
              :to="item.link"
              :class="[
                isActive(item.link)
                  ? 'bg-indigo-600 text-white shadow-sm dark:bg-indigo-500'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
                'group flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                collapsed ? 'justify-center' : 'gap-x-3'
              ]"
              :title="collapsed ? item.name : ''"
            >
              <font-awesome-icon :icon="['fas', item.icon]" class="h-5 w-5 shrink-0" />
              <span v-show="!collapsed" class="whitespace-nowrap">{{ item.name }}</span>
            </NuxtLink>
          </template>
        </li>
      </ul>
    </nav>

    <!-- User profile - Fixed at bottom -->
    <div class="shrink-0 border-t border-gray-100 dark:border-gray-700 relative transition-all duration-300"
         :class="collapsed ? 'p-2' : 'p-4'">
      <button 
        @click="showUserMenu = !showUserMenu"
        class="flex w-full items-center gap-x-3 rounded-xl p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors duration-200"
        :class="collapsed ? 'justify-center' : ''"
        :title="collapsed ? user.name : ''"
      >
        <div class="relative shrink-0">
          <img 
            class="h-10 w-10 rounded-full" 
            :src="user.avatar" 
            :alt="user.name"
          >
          <span class="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
        </div>
        <div v-show="!collapsed" class="flex-1 min-w-0 text-left">
          <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ user.name }}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ user.email }}</p>
        </div>
        <svg 
          v-show="!collapsed"
          :class="[
            'h-5 w-5 text-gray-400 transition-transform duration-200 shrink-0',
            showUserMenu ? 'rotate-180' : ''
          ]" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <!-- User menu dropdown -->
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div 
          v-show="showUserMenu && !collapsed"
          class="absolute bottom-full mb-2 rounded-xl bg-white shadow-lg ring-1 ring-black/5 dark:bg-gray-800 dark:ring-white/10 overflow-hidden transition-all duration-300"
          :class="collapsed ? 'left-2 right-2' : 'left-4 right-4'"
        >
          <div class="p-2">
            <NuxtLink to="/profile" class="flex items-center gap-x-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              Profile
            </NuxtLink>
            <NuxtLink to="/settings" class="flex items-center gap-x-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </NuxtLink>
            <NuxtLink to="/help" class="flex items-center gap-x-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
              Help & Support
            </NuxtLink>
          </div>
          <div class="border-t border-gray-100 dark:border-gray-700 p-2">
            <button class="flex w-full items-center gap-x-3 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

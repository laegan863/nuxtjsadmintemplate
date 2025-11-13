<script setup>
const recentActivities = [
  {
    id: 1,
    user: 'New user registered',
    time: '2 minutes ago',
    icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
  },
  {
    id: 2,
    user: 'Order #1234 completed',
    time: '15 minutes ago',
    icon: 'M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993z'
  },
  {
    id: 3,
    user: 'New comment received',
    time: '1 hour ago',
    icon: 'M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z'
  }
]
</script>

<template>
  <div class="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
    <div class="px-4 py-5 sm:p-6">
      <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">Recent Activity</h3>
      <div class="mt-6 flow-root">
        <ul role="list" class="-mb-8">
          <li v-for="(activity, activityIdx) in recentActivities" :key="activity.id">
            <div class="relative pb-8">
              <span 
                v-if="activityIdx !== recentActivities.length - 1" 
                class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-600" 
                aria-hidden="true"
              />
              <div class="relative flex space-x-3">
                <div>
                  <span class="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white dark:ring-gray-800">
                    <svg class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" :d="activity.icon" />
                    </svg>
                  </span>
                </div>
                <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      {{ activity.user }}
                    </p>
                  </div>
                  <div class="whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                    {{ activity.time }}
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
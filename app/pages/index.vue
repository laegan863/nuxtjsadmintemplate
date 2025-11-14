<script setup>
definePageMeta({
    layout: 'app'
});

const stats = [
  {
    title: 'Total Users',
    value: '1,234',
    change: '+12%',
    trend: 'up',
    icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
    iconClass: 'bg-blue-500'
  },
  {
    title: 'Revenue',
    value: '$12,345',
    change: '+8%',
    trend: 'up',
    icon: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H15m-1.5 0V9l-3-3-3 3v-.75',
    iconClass: 'bg-green-500'
  },
  {
    title: 'Orders',
    value: '567',
    change: '+23%',
    trend: 'up',
    icon: 'M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993z',
    iconClass: 'bg-purple-500'
  },
  {
    title: 'Rating',
    value: '4.8',
    change: '+0.3',
    trend: 'up',
    icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',
    iconClass: 'bg-yellow-500'
  }
]
</script>

<template>
  <div>
    <!-- Page header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight dark:text-white">
        Dashboard
      </h1>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Welcome back! Here's what's happening today.
      </p>
    </div>
    <Alert class="mb-3" variant="danger" title="Error Message" dismissible="true" message="Welcome to the dashboard!"/>
    <!-- Stats grid -->
    <div class="mb-8">
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card 
          v-for="stat in stats" 
          :key="stat.title"
          :title="stat.title"
          :value="stat.value"
          :change="stat.change"
          :trend="stat.trend"
          :icon="stat.icon"
          :icon-class="stat.iconClass"
        />
      </div>
    </div>

    <!-- Content grid -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Recent Activity (spans 2 columns) -->
      <div class="lg:col-span-2">
        <DashboardRecentActivity />
      </div>

      <!-- Quick Actions (spans 1 column) -->
      <div class="lg:col-span-1">
        <DashboardQuickActions />
      </div>
    </div>
  </div>
</template>
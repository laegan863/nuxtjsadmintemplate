<script setup lang="ts">
definePageMeta({
  layout: 'app'
})

interface User {
  id: number
  name: string
  age: number
  city: string
  status: string
  email: string
}

const users: User[] = [
  { id: 1, name: 'John Doe', age: 28, city: 'New York', status: 'Active', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', age: 34, city: 'Los Angeles', status: 'Active', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', age: 45, city: 'Chicago', status: 'Inactive', email: 'bob@example.com' },
  { id: 4, name: 'Alice Williams', age: 29, city: 'Houston', status: 'Active', email: 'alice@example.com' },
  { id: 5, name: 'Charlie Brown', age: 52, city: 'Phoenix', status: 'Active', email: 'charlie@example.com' },
  { id: 6, name: 'Diana Prince', age: 31, city: 'Philadelphia', status: 'Inactive', email: 'diana@example.com' },
  { id: 7, name: 'Ethan Hunt', age: 38, city: 'San Antonio', status: 'Active', email: 'ethan@example.com' },
  { id: 8, name: 'Fiona Green', age: 26, city: 'San Diego', status: 'Active', email: 'fiona@example.com' },
  { id: 9, name: 'George Clark', age: 41, city: 'Dallas', status: 'Inactive', email: 'george@example.com' },
  { id: 10, name: 'Hannah Lee', age: 33, city: 'San Jose', status: 'Active', email: 'hannah@example.com' },
  { id: 11, name: 'Ian Malcolm', age: 47, city: 'Austin', status: 'Active', email: 'ian@example.com' },
  { id: 12, name: 'Julia Roberts', age: 29, city: 'Jacksonville', status: 'Inactive', email: 'julia@example.com' },
  { id: 13, name: 'Kevin Hart', age: 36, city: 'Fort Worth', status: 'Active', email: 'kevin@example.com' },
  { id: 14, name: 'Laura Palmer', age: 27, city: 'Columbus', status: 'Active', email: 'laura@example.com' },
  { id: 15, name: 'Michael Scott', age: 44, city: 'Charlotte', status: 'Inactive', email: 'michael@example.com' },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Data Tables</h1>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Responsive data table with search, pagination, and sorting features.
      </p>
    </div>

    <!-- Users Table -->
    <CardContainer>
      <template #header>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Users List</h2>
      </template>

      <Table 
        :data="users"
        :searchable-fields="['name', 'email', 'age', 'city', 'status']"
        :striped="true" 
        :hoverable="true" 
        :searchable="true" 
        :paginated="true"
      >
        <template #thead>
          <tr>
            <TableTh>ID</TableTh>
            <TableTh>Name</TableTh>
            <TableTh>Email</TableTh>
            <TableTh align="center">Age</TableTh>
            <TableTh>City</TableTh>
            <TableTh align="center">Status</TableTh>
            <TableTh align="center">Actions</TableTh>
          </tr>
        </template>
        <template #tbody="{ paginatedData }">
          <tr v-for="user in paginatedData" :key="user.id">
            <TableTd>
              <span class="font-medium">#{{ user.id }}</span>
            </TableTd>
            <TableTd>
              <div class="flex items-center gap-3">
                <div class="h-10 w-10 flex-shrink-0">
                  <div class="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <span class="text-sm font-medium text-indigo-800 dark:text-indigo-200">
                      {{ user.name.split(' ').map(n => n[0]).join('') }}
                    </span>
                  </div>
                </div>
                <div class="font-medium">{{ user.name }}</div>
              </div>
            </TableTd>
            <TableTd>
              <span class="text-gray-600 dark:text-gray-400">{{ user.email }}</span>
            </TableTd>
            <TableTd align="center">{{ user.age }}</TableTd>
            <TableTd>{{ user.city }}</TableTd>
            <TableTd align="center">
              <span :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                user.status === 'Active' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
              ]">
                {{ user.status }}
              </span>
            </TableTd>
            <TableTd align="center">
              <div class="flex items-center justify-center gap-2">
                <Button size="small" variant="none" class="text-blue-400 border border-2 border-blue-400 hover:bg-blue-50">
                    <font-awesome-icon icon="edit" />
                </Button>
                <Button size="small" variant="none" class="text-red-400 border border-2 border-red-400 hover:bg-red-50">
                    <font-awesome-icon icon="trash" />
                </Button>
              </div>
            </TableTd>
          </tr>
          <tr v-if="paginatedData.length === 0">
            <TableTd align="center" class="!py-12 text-gray-500 dark:text-gray-400" colspan="7">
              No results found. Try adjusting your search.
            </TableTd>
          </tr>
        </template>
      </Table>
    </CardContainer>
  </div>
</template>
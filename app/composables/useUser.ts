export const useUser = () => {
  const user = ref({
    name: 'John Doe',
    role: 'Admin',
    email: 'john.doe@admin.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'online'
  })


  const isOnline = computed(() => user.value.status === 'online')

  return {
    user: readonly(user),
    isOnline
  }
}
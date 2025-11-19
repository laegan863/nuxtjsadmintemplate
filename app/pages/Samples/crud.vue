<script setup lang="ts">
    import axios from 'axios'
    import Swal from 'sweetalert2'

    const config = useRuntimeConfig();
    interface User {
        id: number
        name: string
        email: string
        email_verified_at: string | null
        remember_token: string | null
        created_at: string
        updated_at: string
    }

    interface ApiResponse {
        data: User[]
        success: boolean
    }
    
    
    const loading = ref(true)
    const error = ref<Error | null>(null)
    const users = ref<User[]>([]);
    const alert = ref(false);
    const alertMessage = ref('');
    const alertVariant = ref('success');
    const deleteModal = ref(false);
    const deleteID = ref<number | null>(null);

    onMounted(() => {
        setTimeout(async() => {
            try {
                users.value = (await $fetch<ApiResponse>('/api/hello')).data;
                console.log("data", users.value);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                loading.value = false;
            }
        }, 100);

        console.log(loading.value);
    });

    const handleSelectedValue = (value: string | number, userId: number) => {
        switch (value) {
            case 'delete':
                deleteModal.value = true;
                deleteID.value = userId;
            break;
            default:
                console.log(`Action ${value} not implemented yet.`);
            break;
        }
    }

    const handleDeleteItem = async () => {
        try {
            deleteModal.value = false;
            useDeleteLoading("Deleting...", "Please wait while we delete this user.");
            const response = await axios.delete(`${config.public.baseURL}/delete`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${config.public.apiToken || config.apiToken}`
                },
                data: { id: deleteID.value }
            });
            
            if(response.status !== 200) {
                throw new Error('Failed to delete user');
            }
            console.log("response", response.data);
            alertMessage.value = 'User deleted successfully.';
            alertVariant.value = 'success';
            alert.value = true;
            users.value = users.value.filter(user => user.id !== deleteID.value);
        } catch (error) {
            alertMessage.value = (error as Error).message || 'An error occurred while deleting the user.';
            alertVariant.value = 'danger';
            alert.value = true;
        } finally {
            Swal.close();
        } 
    }
</script>
<template>
    <div class="space-y-6">
        <Breadcrumbs />
        <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Users Management</h1>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Manage users with search, filter, and pagination.
            </p>
        </div>
        
        <div class="my-2" v-if="alert">
            <Alert :dismissible="true" @dismiss="alert = false" variant="success">
                {{ alertMessage }}
            </Alert>
        </div>
        <Modal v-model="deleteModal" size="lg" title="Delete User">
            <template #body>
                <p class="text-gray-600 dark:text-gray-400">
                    Do you want to delete this user?
                </p>
            </template>
            <template #footer="{ close }">
                <Button variant="secondary" @click="close">Cancel</Button>
                <Button variant="danger" @click="handleDeleteItem">Delete</Button>
            </template>
        </Modal>
        <Button variant="primary" class="mb-4" @click="$router.push('/samples/add-user')">
            <font-awesome-icon icon="plus"/> Add User
        </Button>
        <CardContainer>
            <Alert v-if="error" variant="danger" :dismissible="false">
                Failed to load users: {{ error.message }}
            </Alert>
            <div v-else-if="loading" class="flex justify-center items-center py-12">
                <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                <span class="ml-3 text-gray-600 dark:text-gray-400">Loading users...</span>
            </div>
            <div v-else-if="!users || users.length === 0" class="text-center py-12">
                <p class="text-gray-500 dark:text-gray-400">No users found.</p>
            </div>
            <Table
                v-if="!loading && users && users.length > 0"
                :data="users"
                :searchable-fields="['name', 'email', 'email_verified_at']"
                :striped="true"
                :hoverable="true"
                :searchable="true"
                :paginated="true"
            >
                <template #thead>
                    <tr>
                        <TableTh align="center"></TableTh>
                        <TableTh>ID</TableTh>
                        <TableTh>Name</TableTh>
                        <TableTh>Email</TableTh>
                        <TableTh align="center">Verified</TableTh>
                        <TableTh align="center">Created At</TableTh>
                    </tr>
                </template>
                <template #tbody="{ paginatedData }">
                    <tr v-for="(user, index) in paginatedData" :key="user.id">
                        <TableTd align="center">
                            <Dropdown
                                :options="[
                                    { value: 'edit', label: 'Edit' },
                                    { value: 'view', label: 'View' },
                                    { value: 'duplicate', label: 'Duplicate' },
                                    { value: 'divider', label: '', divider: true },
                                    { value: 'delete', label: 'Delete', danger: true }
                                ]"
                                @select="handleSelectedValue($event, user.id)"
                            >
                                <template #trigger>
                                    <button class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                                        </svg>
                                    </button>
                                </template>
                            </Dropdown>
                        </TableTd>
                        <TableTd>
                            <span class="font-medium">#{{ index + 1 }}</span>
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
                        <TableTd align="center">
                            <span :class="[
                                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                                user.email_verified_at
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                            ]">
                                {{ user.email_verified_at ? 'Verified' : 'Pending' }}
                            </span>
                        </TableTd>
                        <TableTd align="center">
                            {{ new Date(user.created_at).toLocaleDateString() }}
                        </TableTd>
                    </tr>
                    <tr v-if="!loading && paginatedData.length === 0">
                        <TableTd align="center" class="!py-12 text-gray-500 dark:text-gray-400" colspan="6">
                            No results found. Try adjusting your search.
                        </TableTd>
                    </tr>
                </template>
            </Table>
        </CardContainer>
    </div>
</template>
<script setup lang="ts">
    import Swal from 'sweetalert2'
    import axios from 'axios'
    interface User {
        id: number
        name: string
        email: string
        email_verified_at: string | null
        created_at: string
        updated_at: string
    }

    interface ApiResponse {
        data: User[]
        success: boolean
    }

    const deleteLoading = ref(false);
    const loading = ref(true)
    const error = ref<Error | null>(null)
    const users = ref<User[]>([]);
    const alert = ref(false);
    const alertMessage = ref('');
    const alertVariant = ref('success');

    onMounted(() => {
        setTimeout(async() => {
            users.value = (await $fetch<ApiResponse>('/api/hello')).data;
            loading.value = false;
        }, 100);
    });

    const deleteUser = async(userId: number) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/delete`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer 4Ah-kTd7gR71RTZgtecIJrFS2ahlv3Aj2ZzCvc56zQJm2ni9lTfECvwMOpk9EglCysDNq53PsfznojADNjv0PpGpyEzO2q9WQYlUu87XncPeow8kSAx3lgQn6pkAM3I4BNtNF9iuMhp1-vBaIHNbG55-1V5pk7V4X5TLy772XPHIJy6fMm8hTm3dAqQp6LezQfSrTh2xuAp1PW9Hq7ktqP4XYrPuh5tn0q4cqsLkHNEwEObrjnbXMn6gsatb1rFcJGZWMVSY08VcSghs8rxQOMJ7UjVZE93MWx4DzWvgk-hXF7XYwpuz9wadyzbEyM5aH_cT7Qv4Ulc7NF3ETXtDGw`
                },
                data: { id: userId }
            });
            users.value = users.value.filter(user => user.id !== userId);

            if(response.status !== 200) {
                throw new Error('Failed to delete user');
            }

            alert.value = true;
            alertMessage.value = 'User deleted successfully';
        } catch (err) {
            alert.value = true;
            alertMessage.value = 'Failed to delete user';
            alertVariant.value = 'danger';
        } finally {
            loading.value = false;
            return alert.value;
        }
    }

    const handleSelectedValue = (value: string | number, userId: number) => {
        switch (value) {
            case 'delete':
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: "bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg mx-2",
                        cancelButton: "bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg mx-2"
                    },
                    buttonsStyling: false
                });
                swalWithBootstrapButtons.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel!",
                    reverseButtons: true
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        deleteLoading.value = true;
                        let result = await deleteUser(userId);
                        if(result){
                            deleteLoading.value = false;
                            swalWithBootstrapButtons.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }else{
                            deleteLoading.value = false;
                            swalWithBootstrapButtons.fire({
                                title: "Error!",
                                text: "There was an error deleting the user.",
                                icon: "error"
                            });
                        }
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire({
                        title: "Cancelled",
                        text: "Your imaginary file is safe :)",
                        icon: "error"
                        });
                    }
                });
            break;
            default:
                console.log(`Action ${value} not implemented yet.`);
            break;
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
                v-if="!loading && users.length > 0"
                :data="users"
                :searchable-fields="['name', 'email']"
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
                    <tr v-if="paginatedData.length === 0">
                        <TableTd align="center" class="!py-12 text-gray-500 dark:text-gray-400" colspan="6">
                            No results found. Try adjusting your search.
                        </TableTd>
                    </tr>
                </template>
            </Table>
        </CardContainer>
    </div>
</template>
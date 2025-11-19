<script lang="ts" setup>
    import axios from 'axios';
    const modal = reactive({
        showLoginModal: false,
        showRegisterModal: false,
    });

    const config = useRuntimeConfig();
    const loading = ref(false);

    interface ApiResponse {
        success: boolean;
        message: string;
    }

    const form = reactive({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const error = reactive({
        passwordMismatch: false,
        passwordMismatchMessage: 'Passwords do not match',
    })

    const handleLoginModal = () => {
        modal.showLoginModal = true;
    }

    const handleRegisterModal = () => {
        modal.showRegisterModal = true;
    }

    const setDefaultForm = () => {
        form.name = ''
        form.email = ''
        form.password = ''
        form.password_confirmation = ''
    }

    const handleSubmitForm = async() => {
        try {
            loading.value = true;
            const response = await axios.post<ApiResponse>(`${config.public.baseURL}/add-user`,form, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${config.public.apiToken || config.apiToken}`
                }
            });
            console.log("response", response.data);
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            loading.value = false;
        }
    }

    const handleClose = () => {
        modal.showLoginModal = false;
        modal.showRegisterModal = false;
        setDefaultForm();
    }

    onMounted(() => {
        watchEffect(() => {
            if (form.password !== form.password_confirmation && modal.showRegisterModal) {
                error.passwordMismatch = true;
            } else {
                error.passwordMismatch = false;
            }
        });
    })


</script>
<template>
    <div class="min-h-screen bg-white dark:bg-gray-900">
        <div class="max-w-full bg-blue-600 text-white py-10 shadow-md lg:rounded-b-[90px] md:rounded-b-0 sm:rounded-b-0">
            <div class="grid lg:grid-cols-4 md:grid-cols-1 sm:grid-cols-1 gap-4 max-w-7xl mx-auto px-6 lg:px-8">
                <div class="lg:col-span-3 md:col-span-4 sm:col-span-4 px-7">
                    <h1 class="text-4xl font-bold mb-2">Welcome to Our Application</h1>
                    <p class="text-sm">Please login or register to continue.</p>
                </div>
                <div class="lg:col-span-1">
                    <div class="text-center">
                        <Button variant="danger" class="w-60 mb-2" @click="handleLoginModal">
                            <font-awesome-icon icon="lock"/> Login 
                        </Button>
                        <Button variant="light" class="w-60 ps-0" @click="handleRegisterModal">
                            <font-awesome-icon icon="user"/> Register 
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>            
    
    <Modal v-model="modal.showLoginModal" size="lg" title="Login Page">
        <template #body>
            <form>
                <div class="my-2">
                    <FormInput v-model="form.email" label="Email" type="email" placeholder="Enter your email" />
                </div>
                <div class="my-2">
                    <FormInput v-model="form.password" label="Password" type="password" placeholder="Enter your password" />
                </div>
            </form>
        </template>
        <template #footer="{ close }">
            <Button type="button" variant="secondary" @click="close">Cancel</Button>
            <Button type="submit" variant="primary" :loading="loading" @click="handleSubmitForm">
                <font-awesome-icon icon="lock" /> Login
            </Button>
        </template>
    </Modal>
    <Modal v-model="modal.showRegisterModal" size="lg" title="Register Page">
        <template #body>
            <form>
                <div class="my-2">
                    <FormInput v-model="form.name" label="Complete Name" type="text" placeholder="Enter your name" />
                </div>
                <div class="my-2">
                    <FormInput v-model="form.email" label="Email" type="email" placeholder="Enter your email" />
                </div>
                <div class="my-2">
                    <FormInput v-model="form.password" label="Password" type="password" placeholder="Enter your password" />
                </div>
                <div class="my-2">
                    <FormInput 
                        v-model="form.password_confirmation" 
                        label="Confirm Password" 
                        type="password" 
                        placeholder="Enter your password"
                        :error="error.passwordMismatch ? 'Passwords do not match' : ''"
                    />
                </div>
            </form>
        </template>
        <template #footer="{ close }">
            <Button type="button" variant="secondary" @click="handleClose">Cancel</Button>
            <Button type="submit" variant="primary" :loading="loading" @click="handleSubmitForm">
                <font-awesome-icon icon="lock" /> Login
            </Button>
        </template>
    </Modal>
</template>
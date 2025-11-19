<script setup lang="ts">

    const config = useRuntimeConfig();
    console.log("config", config.public.baseURL)
    const loading = ref<boolean>(false);
    const result = ref(0);
    const resultMessage = ref<string>('');

    interface FormData {
        name: string;
        email: string;
        password: string;
    }

    interface ApiResponse {
        success: boolean;
        message: string;
    }

    const form = reactive<FormData>({
        name: '',
        email: '',
        password: '',
    });

    const setDefaultForm = () => {
        form.name = '';
        form.email = '';
        form.password = '';
    }

    const handleSubmitData = async () => {
        const url = `${config.public.baseURL}/add-user`
        console.log("url", url)
        try {
            loading.value = true;
            const response = await $fetch<ApiResponse>(`${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${config.public.apiToken || config.apiToken}`
                },
                body: form
            });
            if(response.success){
                result.value = 1;
                resultMessage.value = response.message
            }
            console.log("response Data", response)
        } catch (error) {
            result.value = 2;
            resultMessage.value = (error as Error).message || 'An error occurred';
        } finally {
            loading.value = false
            setDefaultForm();
        }
        console.log('form data', form);
    }
</script>
<template>
    <CardContainer>
        <form @submit.prevent="handleSubmitData">
            <div v-if="result != 0" class="mb-4">
                <Alert 
                    :variant="result === 1 ? 'success' : 'danger'" 
                    :title="result === 1 ? 'success' : 'Error'" 
                    :dismissible="true" 
                    :message="resultMessage"
                />
            </div>
            <div class="my-2">
                <FormInput v-model="form.name" label="Name" type="text" placeholder="Enter name" />
            </div> 
            <div class="my-2">
                <FormInput v-model="form.email" label="Email" type="email" placeholder="Enter email" />
            </div>
            <div class="my-2">
                <FormInput v-model="form.password" label="Password" type="password" placeholder="Enter password" />
            </div>
            <Button type="submit" variant="primary" :loading="loading">Submit</Button>
        </form>
    </CardContainer>
</template>
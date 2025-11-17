<script setup lang="ts">
const selectedOption = ref(null)
const selectedOption2 = ref('2')

const handleActionSelect = (value: string | number) => {
  console.log('Action selected:', value)
  alert(`You selected: ${value}`)
}
</script>
<template>
    <CardContainer>
        <h1 class="text-2xl font-bold mb-6">Dropdowns</h1>
        
        <!-- Select Mode Dropdown -->
        <div class="mb-8">
            <h2 class="text-lg font-semibold mb-3">Select Dropdown</h2>
            <div class="max-w-xs">
                <Dropdown
                    :options="[
                        { label: 'Option 1', value: '1' },
                        { label: 'Option 2', value: '2' },
                        { label: 'Option 3', value: '3', disabled: true },
                        { label: 'Option 4', value: '4' },
                    ]"
                    v-model="selectedOption"
                    mode="select"
                    variant="primary"
                    size="medium"
                    position="bottom-left"
                    placeholder="Select an option"
                />
                <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Selected: {{ selectedOption || 'None' }}
                </p>
            </div>
        </div>

        <!-- Action Menu Dropdown -->
        <div class="mb-8">
            <h2 class="text-lg font-semibold mb-3">Action Menu (3-dots)</h2>
            <div class="flex items-center gap-4">
                <Dropdown
                    :options="[
                        { value: 'edit', label: 'Edit' },
                        { value: 'view', label: 'View' },
                        { value: 'duplicate', label: 'Duplicate' },
                        { value: 'divider', label: '', divider: true },
                        { value: 'delete', label: 'Delete', danger: true }
                    ]"
                    @select="handleActionSelect"
                >
                    <template #trigger>
                        <button class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                            </svg>
                        </button>
                    </template>
                </Dropdown>

                <span class="text-sm text-gray-600 dark:text-gray-400">
                    Click the 3-dots icon to see the action menu
                </span>
            </div>
        </div>

        <!-- Different Variants -->
        <div class="mb-8">
            <h2 class="text-lg font-semibold mb-3">Different Variants</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                <div>
                    <label class="block text-sm font-medium mb-2">Primary</label>
                    <Dropdown
                        :options="[
                            { label: 'Option 1', value: '1' },
                            { label: 'Option 2', value: '2' },
                            { label: 'Option 3', value: '3' },
                        ]"
                        v-model="selectedOption2"
                        mode="select"
                        variant="primary"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Success</label>
                    <Dropdown
                        :options="[
                            { label: 'Option 1', value: '1' },
                            { label: 'Option 2', value: '2' },
                            { label: 'Option 3', value: '3' },
                        ]"
                        mode="select"
                        variant="success"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Danger</label>
                    <Dropdown
                        :options="[
                            { label: 'Option 1', value: '1' },
                            { label: 'Option 2', value: '2' },
                            { label: 'Option 3', value: '3' },
                        ]"
                        mode="select"
                        variant="danger"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Default</label>
                    <Dropdown
                        :options="[
                            { label: 'Option 1', value: '1' },
                            { label: 'Option 2', value: '2' },
                            { label: 'Option 3', value: '3' },
                        ]"
                        mode="select"
                        variant="default"
                    />
                </div>
            </div>
        </div>

        <!-- Different Sizes -->
        <div class="mb-8">
            <h2 class="text-lg font-semibold mb-3">Different Sizes</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
                <div>
                    <label class="block text-sm font-medium mb-2">Small</label>
                    <Dropdown
                        :options="[
                            { label: 'Option 1', value: '1' },
                            { label: 'Option 2', value: '2' },
                            { label: 'Option 3', value: '3' },
                        ]"
                        mode="select"
                        size="small"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Medium</label>
                    <Dropdown
                        :options="[
                            { label: 'Option 1', value: '1' },
                            { label: 'Option 2', value: '2' },
                            { label: 'Option 3', value: '3' },
                        ]"
                        mode="select"
                        size="medium"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Large</label>
                    <Dropdown
                        :options="[
                            { label: 'Option 1', value: '1' },
                            { label: 'Option 2', value: '2' },
                            { label: 'Option 3', value: '3' },
                        ]"
                        mode="select"
                        size="large"
                    />
                </div>
            </div>
        </div>
    </CardContainer>
</template>
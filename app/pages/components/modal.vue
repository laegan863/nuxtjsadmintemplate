<script setup lang="ts">
    const showSmallModal = ref(false)
    const showMediumModal = ref(false)
    const showLargeModal = ref(false)
    const showXLModal = ref(false)
    const showPersistentModal = ref(false)
</script>

<template>
  <div class="space-y-6">
    <!-- Breadcrumbs -->
    <Breadcrumbs />
    
    <!-- Page Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Modals</h1>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Modal dialogs with different sizes and configurations.
      </p>
    </div>

    <!-- Modal Examples -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Small Modal -->
      <CardContainer>
        <template #header>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Small Modal</h2>
        </template>
        <div class="space-y-4">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            A compact modal dialog for simple messages or confirmations.
          </p>
          <Button @click="showSmallModal = true">
            Open Small Modal
          </Button>
        </div>
      </CardContainer>

      <!-- Medium Modal -->
      <CardContainer>
        <template #header>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Medium Modal</h2>
        </template>
        <div class="space-y-4">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Default size modal for most use cases.
          </p>
          <Button @click="showMediumModal = true" variant="success">
            Open Medium Modal
          </Button>
        </div>
      </CardContainer>

      <!-- Large Modal -->
      <CardContainer>
        <template #header>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Large Modal</h2>
        </template>
        <div class="space-y-4">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Spacious modal for forms and detailed content.
          </p>
          <Button @click="showLargeModal = true" variant="warning">
            Open Large Modal
          </Button>
        </div>
      </CardContainer>

      <!-- XL Modal -->
      <CardContainer>
        <template #header>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Extra Large Modal</h2>
        </template>
        <div class="space-y-4">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Extra large modal for complex content and layouts.
          </p>
          <Button @click="showXLModal = true" variant="danger">
            Open XL Modal
          </Button>
        </div>
      </CardContainer>

      <!-- Persistent Modal -->
      <CardContainer>
        <template #header>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Persistent Modal</h2>
        </template>
        <div class="space-y-4">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Modal that can't be closed by clicking outside or escape key.
          </p>
          <Button @click="showPersistentModal = true" variant="secondary">
            Open Persistent Modal
          </Button>
        </div>
      </CardContainer>
    </div>

    <!-- Small Modal -->
    <Modal v-model="showSmallModal" size="sm" title="Small Modal">
      <template #body>
        <p class="text-gray-600 dark:text-gray-400">
          This is a small modal dialog. Perfect for quick confirmations or simple messages.
        </p>
      </template>
      <template #footer="{ close }">
        <Button variant="secondary" @click="close">Cancel</Button>
        <Button @click="close">Confirm</Button>
      </template>
    </Modal>

    <!-- Medium Modal -->
    <Modal v-model="showMediumModal" size="md" title="Medium Modal">
      <template #body>
        <div class="space-y-4">
          <p class="text-gray-600 dark:text-gray-400">
            This is a medium-sized modal dialog. It's the default size and works well for most use cases.
          </p>
          <FormInput
            label="Email"
            type="email"
            placeholder="Enter your email"
          />
          <FormInput
            label="Password"
            type="password"
            placeholder="Enter your password"
          />
        </div>
      </template>
      <template #footer="{ close }">
        <Button variant="secondary" @click="close">Cancel</Button>
        <Button variant="success" @click="close">Submit</Button>
      </template>
    </Modal>

    <!-- Large Modal -->
    <Modal v-model="showLargeModal" size="lg" title="Large Modal">
      <template #body>
        <div class="space-y-4">
          <p class="text-gray-600 dark:text-gray-400">
            This is a large modal dialog with more space for complex forms and content.
          </p>
          <div class="grid grid-cols-2 gap-4">
            <FormInput label="First Name" placeholder="John" />
            <FormInput label="Last Name" placeholder="Doe" />
          </div>
          <FormInput label="Email" type="email" placeholder="john@example.com" />
          <FormInput label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
          <FormSelect
            label="Country"
            :options="[
              { value: 'us', label: 'United States' },
              { value: 'uk', label: 'United Kingdom' },
              { value: 'ca', label: 'Canada' }
            ]"
            :searchable="true"
          />
        </div>
      </template>
      <template #footer="{ close }">
        <Button variant="secondary" @click="close">Cancel</Button>
        <Button variant="warning" @click="close">Save</Button>
      </template>
    </Modal>

    <!-- XL Modal -->
    <Modal v-model="showXLModal" size="xl" title="Extra Large Modal">
      <template #body>
        <div class="space-y-6">
          <p class="text-gray-600 dark:text-gray-400">
            This is an extra large modal dialog perfect for complex layouts and extensive content.
          </p>
          
          <div class="grid grid-cols-3 gap-4">
            <CardContainer :padding="false" class="p-4">
              <div class="text-center">
                <div class="text-3xl font-bold text-indigo-600 dark:text-indigo-400">150</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Total Users</div>
              </div>
            </CardContainer>
            <CardContainer :padding="false" class="p-4">
              <div class="text-center">
                <div class="text-3xl font-bold text-green-600 dark:text-green-400">75</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Active</div>
              </div>
            </CardContainer>
            <CardContainer :padding="false" class="p-4">
              <div class="text-center">
                <div class="text-3xl font-bold text-red-600 dark:text-red-400">25</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Inactive</div>
              </div>
            </CardContainer>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <FormInput label="Project Name" placeholder="My Project" />
            <FormInput label="Project Code" placeholder="PRJ-001" />
          </div>
          <FormInput label="Description" placeholder="Enter project description" />
        </div>
      </template>
      <template #footer="{ close }">
        <Button variant="secondary" @click="close">Cancel</Button>
        <Button variant="danger" @click="close">Create Project</Button>
      </template>
    </Modal>

    <!-- Persistent Modal -->
    <Modal v-model="showPersistentModal" size="md" title="Persistent Modal" :persistent="true">
      <template #body>
        <div class="space-y-4">
          <Alert variant="warning" :dismissible="false">
            This modal can only be closed using the buttons below.
          </Alert>
          <p class="text-gray-600 dark:text-gray-400">
            A persistent modal prevents accidental closures by disabling the close button and backdrop clicks.
          </p>
        </div>
      </template>
      <template #footer>
        <Button variant="secondary" @click="showPersistentModal = false">Cancel</Button>
        <Button @click="showPersistentModal = false">I Understand</Button>
      </template>
    </Modal>
  </div>
</template>
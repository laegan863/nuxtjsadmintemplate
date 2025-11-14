<script setup lang="ts">
definePageMeta({
    layout: 'app'
});
// Text inputs
const textInput = ref('')
const emailInput = ref('')
const passwordInput = ref('')
const numberInput = ref('')
const telInput = ref('')
const urlInput = ref('')
const searchInput = ref('')

// Date and time inputs
const dateInput = ref('')
const timeInput = ref('')
const datetimeInput = ref('')
const monthInput = ref('')
const weekInput = ref('')

// Other inputs
const colorInput = ref('#4F46E5')
const rangeInput = ref(50)
const fileInput = ref('')

// Select inputs
const selectedCountry = ref('')
const selectedStatus = ref('')

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
]

const statuses = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
  { value: 'suspended', label: 'Suspended', disabled: true },
]

</script>

<template>
  <div class="space-y-6">
    <!-- Breadcrumbs -->
    <Breadcrumbs />
    
    <!-- Page Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Form Components</h1>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Comprehensive collection of input and select components with all available types.
      </p>
    </div>

    <!-- Text Inputs Section -->
    <CardContainer>
      <template #header>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Text Inputs</h2>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          v-model="textInput"
          type="text"
          label="Text Input"
          placeholder="Enter text..."
          hint="This is a standard text input"
        />

        <FormInput
          v-model="emailInput"
          type="email"
          label="Email Input"
          placeholder="email@example.com"
          hint="Enter a valid email address"
        />

        <FormInput
          v-model="passwordInput"
          type="password"
          label="Password Input"
          placeholder="Enter password..."
          hint="Password must be at least 8 characters"
        />

        <FormInput
          v-model="searchInput"
          type="search"
          label="Search Input"
          placeholder="Search..."
          hint="Search functionality input"
        />

        <FormInput
          v-model="telInput"
          type="tel"
          label="Telephone Input"
          placeholder="+1 (555) 123-4567"
          hint="Enter phone number"
        />

        <FormInput
          v-model="urlInput"
          type="url"
          label="URL Input"
          placeholder="https://example.com"
          hint="Enter a valid URL"
        />
      </div>
    </CardContainer>

    <!-- Number and Range Inputs Section -->
    <CardContainer>
      <template #header>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Number & Range Inputs</h2>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          v-model="numberInput"
          type="number"
          label="Number Input"
          placeholder="Enter number..."
          hint="Numeric values only"
        />

        <div class="space-y-1.5">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Range Input ({{ rangeInput }})
          </label>
          <input
            v-model="rangeInput"
            type="range"
            min="0"
            max="100"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-600"
          />
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Slide to select a value between 0 and 100
          </p>
        </div>

        <div class="space-y-1.5">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Color Input
          </label>
          <div class="flex gap-3 items-center">
            <input
              v-model="colorInput"
              type="color"
              class="h-10 w-20 rounded-lg border border-gray-300 cursor-pointer dark:border-gray-600"
            />
            <span class="text-sm text-gray-600 dark:text-gray-400">{{ colorInput }}</span>
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Pick a color from the palette
          </p>
        </div>

        <div class="space-y-1.5">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            File Input
          </label>
          <input
            type="file"
            class="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:mr-4 file:py-2.5 file:px-4 file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900/30 dark:file:text-indigo-400"
          />
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Upload a file from your device
          </p>
        </div>
      </div>
    </CardContainer>

    <!-- Date and Time Inputs Section -->
    <CardContainer>
      <template #header>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Date & Time Inputs</h2>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          v-model="dateInput"
          type="date"
          label="Date Input"
          hint="Select a date"
        />

        <FormInput
          v-model="timeInput"
          type="time"
          label="Time Input"
          hint="Select a time"
        />

        <FormInput
          v-model="datetimeInput"
          type="datetime-local"
          label="DateTime Input"
          hint="Select date and time"
        />

        <FormInput
          v-model="monthInput"
          type="month"
          label="Month Input"
          hint="Select a month"
        />

        <FormInput
          v-model="weekInput"
          type="week"
          label="Week Input"
          hint="Select a week"
        />
      </div>
    </CardContainer>

    <!-- Select Inputs Section -->
    <CardContainer>
      <template #header>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Select Inputs</h2>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
          v-model="selectedCountry"
          :options="countries"
          label="Country"
          placeholder="Select a country..."
          hint="Choose your country from the list"
        />

        <FormSelect
          v-model="selectedStatus"
          :options="statuses"
          label="Status"
          placeholder="Select status..."
          hint="Some options may be disabled"
        />
      </div>
    </CardContainer>

    <!-- Input States Section -->
    <CardContainer>
      <template #header>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Input States</h2>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          type="text"
          label="Required Input"
          placeholder="This field is required"
          required
          hint="This field is required"
        />

        <FormInput
          type="text"
          label="Disabled Input"
          placeholder="This input is disabled"
          disabled
          model-value="Disabled value"
        />

        <FormInput
          type="text"
          label="Readonly Input"
          readonly
          model-value="This is readonly text"
          hint="This input is readonly"
        />

        <FormInput
          type="text"
          label="Input with Error"
          placeholder="Invalid input"
          error="This field has an error"
          model-value="Invalid value"
        />

        <FormSelect
          :options="countries"
          label="Disabled Select"
          placeholder="This select is disabled"
          disabled
        />

        <FormSelect
          :options="statuses"
          label="Required Select"
          placeholder="Select an option..."
          required
          hint="This field is required"
        />
      </div>
    </CardContainer>

    <!-- Checkbox and Radio Section -->
    <CardContainer>
      <template #header>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Checkbox & Radio Inputs</h2>
      </template>

      <div class="space-y-6">
        <!-- Checkboxes -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Checkboxes
          </label>
          <div class="space-y-2">
            <div class="flex items-center">
              <input
                type="checkbox"
                id="checkbox1"
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label for="checkbox1" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Option 1
              </label>
            </div>
            <div class="flex items-center">
              <input
                type="checkbox"
                id="checkbox2"
                checked
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label for="checkbox2" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Option 2 (Checked)
              </label>
            </div>
            <div class="flex items-center">
              <input
                type="checkbox"
                id="checkbox3"
                disabled
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label for="checkbox3" class="ml-2 text-sm text-gray-400 dark:text-gray-500">
                Option 3 (Disabled)
              </label>
            </div>
          </div>
        </div>

        <!-- Radio Buttons -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Radio Buttons
          </label>
          <div class="space-y-2">
            <div class="flex items-center">
              <input
                type="radio"
                id="radio1"
                name="radio"
                class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label for="radio1" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Radio Option 1
              </label>
            </div>
            <div class="flex items-center">
              <input
                type="radio"
                id="radio2"
                name="radio"
                checked
                class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label for="radio2" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Radio Option 2 (Selected)
              </label>
            </div>
            <div class="flex items-center">
              <input
                type="radio"
                id="radio3"
                name="radio"
                disabled
                class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label for="radio3" class="ml-2 text-sm text-gray-400 dark:text-gray-500">
                Radio Option 3 (Disabled)
              </label>
            </div>
          </div>
        </div>
      </div>
    </CardContainer>
  </div>
</template>

<script lang="ts" setup>
    
</script>
<template>
    <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-x-3">
        <CardContainer>
            <template #header class="bg-blue-300">
                <h1 class="font-semibold">Card Header</h1>
            </template>
            <!-- Main Content -->
            <section class="container mx-auto">
                <p class="text-sm">
                    This is an example of a card component with a header, main content, and footer.
                </p>
            </section>
            <template #footer>
                <div class="flex justify-end gap-x-2">
                    <Button variant="secondary">reset</Button>
                <Button variant="primary">Submit</Button>
                </div>
            </template>
        </CardContainer>
        <CardContainer>
            <template #header class="bg-blue-300">
                <h1 class="font-semibold">Card Header</h1>
            </template>
            <!-- Main Content -->
            <section class="container mx-auto">
                <p class="text-sm">
                    This is an example of a card component with a header, main content, and footer.
                </p>
            </section>
            <template #footer>
                <div class="flex justify-end gap-x-2">
                    <Button variant="secondary">reset</Button>
                <Button variant="primary">Submit</Button>
                </div>
            </template>
        </CardContainer>
        <CardContainer class="col-span-2 my-2">
            <template #header class="bg-blue-300">
                <h1 class="font-semibold">Card Header</h1>
            </template>
            <!-- Main Content -->
            <section class="container mx-auto">
                <p class="text-sm">
                    This is an example of a card component with a header, main content, and footer.
                </p>
            </section>
            <template #footer>
                <div class="flex justify-end gap-x-2">
                    <Button variant="secondary">reset</Button>
                <Button variant="primary">Submit</Button>
                </div>
            </template>
        </CardContainer>
    </div>
    
</template>
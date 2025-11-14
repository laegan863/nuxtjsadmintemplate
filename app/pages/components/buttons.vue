<script setup lang="ts"></script>
<template>
    <CardContainer>
        <h1>Buttons</h1>
        <div class="my-2">
            <Button variant="primary" class="mr-2" :loading="true">Primary Button</Button>
            <Button variant="secondary" class="mr-2">Secondary Button</Button>
            <Button variant="success" class="mr-2">Success Button</Button>
            <Button variant="danger" class="mr-2">Danger Button</Button>
            <Button variant="warning" class="mr-2">Warning Button</Button>
            <Button variant="info" class="mr-2">Info Button</Button>
        </div>
    </CardContainer>
</template>
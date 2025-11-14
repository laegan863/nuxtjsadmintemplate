<script setup lang="ts"></script>
<template>
    <CardContainer>
        <h1>Alerts</h1>
        <div class="my-2">
            <Alert variant="danger" title="Error Message" dismissible="true" message="Welcome to the dashboard!"/>
        </div>
        <div class="my-2">
            <Alert variant="success" title="Success Message" dismissible="true" message="Welcome to the dashboard!"/>
        </div>
        <div class="my-2">
            <Alert variant="info" title="Info Message" dismissible="true" message="Welcome to the dashboard!"/>
        </div>
        <div class="my-2">
            <Alert variant="warning" title="Warning Message" dismissible="true" message="Welcome to the dashboard!"/>
        </div>
    </CardContainer>
</template>
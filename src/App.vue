<template>
    <router-view />
    <Toaster
        position="top-center"
        richColors
        closeButton
    />
</template>

<script setup lang="ts">
import { Toaster } from 'vue-sonner'
</script>

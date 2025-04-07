<template>
    <div
        class="flex flex-col items-center text-gray-700"
        role="status"
        aria-label="Loading"
    >
        <svg
            class="animate-spin h-8 w-8 text-primary mb-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
            />
            <circle
                class="opacity-100"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="round"
                stroke-dasharray="80"
                stroke-dashoffset="60"
            />
        </svg>

        <p
            v-if="label"
            class="text-lg text-gray-600"
        >
            {{ label }}
        </p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
}>()
</script>

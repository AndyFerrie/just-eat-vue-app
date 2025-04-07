<template>
    <div
        class="flex flex-col items-center justify-center text-center mt-20"
        aria-live="polite"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-10 h-10 text-gray-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
            />
        </svg>

        <h2 class="text-xl font-extrabold text-gray-800 mb-2">
            Hm, we couldn’t find
            <span class="text-black">'{{ searchQuery.toUpperCase() }}'</span>
        </h2>

        <p class="text-gray-600 max-w-md">
            Have you checked the spelling? Try searching again or browse more
            places in your area.
        </p>

        <slot name="action"></slot>
    </div>
</template>

<script setup lang="ts">
defineProps<{
  searchQuery: string
}>()
</script>

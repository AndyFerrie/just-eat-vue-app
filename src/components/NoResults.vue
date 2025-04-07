<template>
    <div aria-live="polite">
        <p class="mt-10 text-center text-lg">
            😔 Sorry, no restaurants deliver to
            <strong
                class="font-semibold"
                >{{ searchQuery.toUpperCase() }}</strong
            >.
        </p>
        <p class="mt-6 text-center text-lg">Please try a different location.</p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
  searchQuery: string
}>()
</script>

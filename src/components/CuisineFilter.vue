<template>
    <div class="flex flex-wrap gap-2 mt-4">
        <Button
            :primary="selected === null"
            :disabled="disabled"
            :aria-pressed="selected === null"
            aria-label="Show all cuisines"
            @click="$emit('select', null)"
        >
            All
        </Button>

        <Button
            v-for="cuisine in cuisines"
            :key="cuisine"
            :primary="selected === cuisine"
            :disabled="disabled"
            :aria-pressed="selected === cuisine"
            :aria-label="`Filter by ${cuisine}`"
            @click="$emit('select', cuisine)"
        >
            {{ cuisine }}
        </Button>
    </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue'

const { cuisines, selected, disabled } = defineProps<{
  cuisines: string[]
  selected: string | null
  disabled?: boolean
}>()

defineEmits<{
  (e: 'select', cuisine: string | null): void
}>()
</script>

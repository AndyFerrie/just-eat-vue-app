<template>
    <div class="flex flex-col gap-2">
        <Button
            :primary="selected === null"
            :disabled="disabled"
            class="justify-start w-full px-3 py-2 text-sm"
            aria-label="Show all cuisines"
            :aria-pressed="selected === null"
            @click="$emit('select', null)"
        >
            All
        </Button>

        <Button
            v-for="cuisine in cuisines"
            :key="cuisine"
            :primary="selected === cuisine"
            :disabled="disabled"
            class="justify-start w-full px-3 py-2 text-sm"
            :aria-label="`Filter by ${cuisine}`"
            :aria-pressed="selected === cuisine"
            @click="$emit('select', cuisine)"
        >
            {{ cuisine }}
        </Button>
    </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue'

const { cuisines, selected, disabled } = defineProps<{
  /**
   * List of cuisine names to render as buttons
   */
  cuisines: string[]

  /**
   * The currently selected cuisine, or null for "All"
   */
  selected: string | null

  /**
   * Disables all buttons when true
   */
  disabled?: boolean
}>()

/**
 * Emits when the user selects a cuisine.
 * Emits null when selecting "All".
 *
 * @param cuisine - The selected cuisine name or null for "All"
 */
defineEmits<{
  (e: 'select', cuisine: string | null): void
}>()
</script>

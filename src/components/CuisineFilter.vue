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
  cuisines: string[]
  selected: string | null
  disabled?: boolean
}>()

defineEmits<{
  (e: 'select', cuisine: string | null): void
}>()
</script>

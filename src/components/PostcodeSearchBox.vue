<template>
    <form
        @submit.prevent="onSubmit"
        class="flex w-full max-w-xl overflow-hidden rounded-full border border-black bg-white shadow-sm"
    >
        <Input
            v-model="postcode"
            type="text"
            placeholder="Postcode"
            aria-label="Enter your postcode"
            :uppercase="true"
            extraClass="flex-1 rounded-l-full"
        />

        <Button
            type="submit"
            primary
            aria-label="Search by postcode"
            extraClass="m-1"
        >
            Search
        </Button>
    </form>
</template>

<script setup lang="ts">
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'

/**
 * Two-way bound model representing the user's postcode input.
 * Defaults to an empty string to avoid undefined warnings.
 */
const postcode = defineModel<string>({ default: '' })

/**
 * Emits the cleaned postcode value when the form is submitted.
 * Used by the parent to trigger a search or redirect.
 */
const emit = defineEmits<{
  /**
   * Emitted when the form is submitted.
   * @param value - The postcode input value in uppercase.
   */
  (e: 'submit', value: string): void
}>()

/**
 * Handles form submission.
 * Cleans up the input and emits the trimmed, uppercase postcode.
 */
function onSubmit() {
  emit('submit', postcode.value.trim().toUpperCase())
}
</script>

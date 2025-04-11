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

const postcode = defineModel<string>({ default: '' })
const emit = defineEmits<{
  (e: 'submit', value: string): void
}>()

function onSubmit() {
  emit('submit', postcode.value.trim().toUpperCase())
}
</script>

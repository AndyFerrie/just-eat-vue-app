<template>
    <form
        @submit.prevent="handleSubmit"
        class="flex w-full max-w-xl overflow-hidden rounded-full border border-black bg-white shadow-sm"
    >
        <Input
            v-model="internalPostcode"
            type="text"
            placeholder="Postcode"
            aria-label="Enter your postcode"
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
import { ref, watch } from 'vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'submit', value: string): void
}>()

const internalPostcode = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => {
    internalPostcode.value = newVal
  }
)

watch(
  () => internalPostcode.value,
  (newVal) => {
    emit('update:modelValue', newVal)
  }
)

const handleSubmit = () => {
  const trimmed = internalPostcode.value.trim()
  if (trimmed) emit('submit', trimmed)
}
</script>

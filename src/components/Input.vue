<template>
    <input
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        :aria-label="ariaLabel"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :class="[
      'px-6 py-4 text-base focus:outline-none rounded-full w-full',
      extraClass,
    ]"
    />
</template>

<script setup lang="ts">
const { modelValue, placeholder, type, extraClass, ariaLabel } = defineProps<{
  modelValue: string
  placeholder?: string
  type?: string
  extraClass?: string
  ariaLabel?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

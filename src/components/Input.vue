<template>
    <input
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        :aria-label="ariaLabel"
        @input="onInput"
        :class="[
      'px-6 py-4 text-base focus:outline-none rounded-full w-full placeholder:normal-case',
      { 'uppercase': props.uppercase }, 
      extraClass,
    ]"
    />
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: String,
  placeholder: String,
  type: String,
  extraClass: String,
  ariaLabel: String,
  uppercase: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function onInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
}
</script>

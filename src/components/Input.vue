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
const props = defineProps<{
  /**
   * The bound value of the input (used with v-model)
   */
  modelValue: string

  /**
   * Optional placeholder text displayed when input is empty
   */
  placeholder?: string

  /**
   * The HTML input type (e.g., "text", "email", "password", etc.)
   */
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url'

  /**
   * Extra CSS classes for custom styling
   */
  extraClass?: string

  /**
   * Aria label for screen reader accessibility
   */
  ariaLabel?: string

  /**
   * Whether to render the input text in uppercase
   */
  uppercase?: boolean
}>()

/**
 * Emits input updates back to the parent component.
 * Used to support v-model binding.
 *
 * @param value - The updated string value from the input field
 */
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

/**
 * Handles user input and emits the updated value
 * for two-way binding via v-model.
 *
 * @param event - Native input event from the input element
 */
function onInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
}
</script>

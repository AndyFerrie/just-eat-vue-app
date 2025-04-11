<template>
    <button
        :type="type"
        :disabled="disabled"
        :aria-disabled="disabled"
        :class="['px-6 py-4 font-semibold rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary',
        disabled ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : primary ? 'bg-primary text-white hover:bg-orange-600' : 'bg-gray-500 text-white hover:bg-gray-600', props.extraClass]"
        @click="handleClick"
    >
        <!-- 
          Default slot for button content.
          Typically used for button label or icon.
          Example: <BaseButton>Save</BaseButton>
        -->
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  /**
   * Button type attribute (e.g. "button", "submit", "reset")
   */
  type?: 'button' | 'submit' | 'reset'

  /**
   * Whether the button should use primary styling
   */
  primary?: boolean

  /**
   * Disables the button and prevents clicks
   */
  disabled?: boolean

  /**
   * Extra CSS classes passed in by the parent
   */
  extraClass?: string
}>()

/**
 * Emits events from the button component.
 * - click: Triggered when the button is clicked (unless disabled)
 *   @param event - Native mouse event from the click
 */
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

/**
 * Handles click events.
 * Prevents click behavior if the button is disabled,
 * otherwise emits a 'click' event to the parent.
 *
 * @param event - MouseEvent from the button click
 */
const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

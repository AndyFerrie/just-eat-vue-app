<template>
    <button
        :type="type"
        :disabled="disabled"
        :aria-disabled="disabled"
        :class="['px-6 py-4 font-semibold rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary',
        disabled ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : primary ? 'bg-primary text-white hover:bg-orange-600' : 'bg-gray-500 text-white hover:bg-gray-600', props.extraClass]"
        @click="handleClick"
    >
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  type?: 'button' | 'submit' | 'reset'
  primary?: boolean
  disabled?: boolean
  extraClass?: string
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

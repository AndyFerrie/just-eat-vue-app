<template>
    <div
        class="flex items-center gap-2 text-sm text-gray-700"
        role="img"
        :aria-label="`${rating.toFixed(1)} out of ${max} stars`"
    >
        <div class="flex gap-0.5">
            <template
                v-for="i in fullStars"
                :key="'full-' + i"
            >
                <svg
                    class="w-4 h-4 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 
            3.955a1 1 0 00.95.69h4.165c.969 0 1.371 
            1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 
            1.118l1.287 3.955c.3.921-.755 1.688-1.538 
            1.118l-3.371-2.449a1 1 0 00-1.175 
            0l-3.37 2.449c-.784.57-1.838-.197-1.539-1.118l1.287-3.955a1 
            1 0 00-.364-1.118L2.02 9.382c-.783-.57-.38-1.81.588-1.81h4.165a1 
            1 0 00.95-.69l1.286-3.955z"
                    />
                </svg>
            </template>
        </div>

        <span class="font-semibold">
            {{ rating.toFixed(1) }}
        </span>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  /**
   * Numerical rating value (e.g. 4.3)
   */
  value: number

  /**
   * Maximum number of stars (default is 5)
   */
  max?: number
}>()

// Ensure the rating is a number and clamp it to the max
const max = props.max ?? 5
const rating = Number(props.value)

// Round rating to nearest whole number for full star display
const fullStars = Math.round(rating)
</script>

<template>
    <ul
        :data-testid="testId"
        role="list"
        class="space-y-4"
    >
        <!-- Renders the currently visible items using the default slot -->
        <slot
            v-for="(item, index) in visibleItems"
            :key="keyBy ? item[keyBy] : index"
            name="default"
            :item="item"
        ></slot>

        <!-- This invisible list item acts as the intersection trigger for loading more -->
        <li
            v-if="hasMore"
            ref="loadMoreTrigger"
            class="h-1"
            role="listitem"
        ></li>
    </ul>
</template>

<script setup lang="ts" generic="T extends Record<string, unknown>">
import { ref, computed, watch } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps<{
  /**
   * The full array of items to paginate through
   */
  items: T[]

  /**
   * Number of items to show at a time (defaults to 10)
   */
  step?: number

  /**
   * Optional string key to uniquely identify each item (e.g. 'id')
   */
  keyBy?: string

  /**
   * Optional test ID used to target this list in tests
   */
  testId?: string
}>()

/**
 * Emits when more items are loaded (e.g., for analytics or tracking)
 */
const emit = defineEmits<{
  (e: 'load'): void
}>()

const step = props.step ?? 10 // Default step size is 10
const visibleCount = ref(step) // Number of items currently visible
const loadMoreTrigger = ref<HTMLElement | null>(null) // Ref to the invisible trigger element

/**
 * Computes the currently visible items to render in the list
 */
const visibleItems = computed(() =>
  props.items.slice(0, visibleCount.value)
)

/**
 * Whether there are more items to load (used to toggle the sentinel)
 */
const hasMore = computed(() =>
  visibleCount.value < props.items.length
)

/**
 * Loads the next batch of items by increasing the visible count.
 * Also emits a 'load' event for the parent to react to.
 */
const loadMore = () => {
  visibleCount.value += step
  emit('load')
}

/**
 * Uses an intersection observer to automatically load more items
 * when the invisible trigger enters the viewport.
 */
useIntersectionObserver(loadMoreTrigger, ([{ isIntersecting }]) => {
  if (isIntersecting && hasMore.value) {
    loadMore()
  }
})

/**
 * Resets the visible item count when the items array changes
 * (e.g. after a new search or filter is applied).
 */
watch(() => props.items, () => {
  visibleCount.value = step
})
</script>

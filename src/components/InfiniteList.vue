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
  items: T[]
  step?: number
  keyBy?: string
  testId?: string
}>()

const emit = defineEmits<{
  (e: 'load'): void
}>()

const step = props.step ?? 10 // Default step size is 10
const visibleCount = ref(step) // Number of items currently visible
const loadMoreTrigger = ref<HTMLElement | null>(null) // Ref to the invisible trigger element

// Slice the items array to only show what's currently visible
const visibleItems = computed(() =>
  props.items.slice(0, visibleCount.value)
)

// Whether there are more items to load
const hasMore = computed(() =>
  visibleCount.value < props.items.length
)

// Increments visible count and emits load event
const loadMore = () => {
  visibleCount.value += step
  emit('load')
}

// Sets up an intersection observer to trigger loadMore when the sentinel becomes visible
useIntersectionObserver(loadMoreTrigger, ([{ isIntersecting }]) => {
  if (isIntersecting && hasMore.value) {
    loadMore()
  }
})

// Reset visible count when the item list changes (e.g., after new search)
watch(() => props.items, () => {
  visibleCount.value = step
})
</script>

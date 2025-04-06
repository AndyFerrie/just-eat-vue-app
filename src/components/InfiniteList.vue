<template>
    <ul class="space-y-4">
        <slot
            v-for="(item, index) in visibleItems"
            :key="keyBy ? item[keyBy] : index"
            name="default"
            :item="item"
        ></slot>

        <li
            v-if="hasMore"
            ref="loadMoreTrigger"
            class="h-1"
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
}>()

const emit = defineEmits<{
  (e: 'load'): void
}>()

const step = props.step ?? 10
const visibleCount = ref(step)
const loadMoreTrigger = ref<HTMLElement | null>(null)

const visibleItems = computed(() =>
  props.items.slice(0, visibleCount.value)
)

const hasMore = computed(() =>
  visibleCount.value < props.items.length
)

const loadMore = () => {
  visibleCount.value += step
  emit('load')
}

useIntersectionObserver(loadMoreTrigger, ([{ isIntersecting }]) => {
  if (isIntersecting && hasMore.value) {
    loadMore()
  }
})

watch(() => props.items, () => {
  visibleCount.value = step
})
</script>

<template>
    <li class="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-5">
        <img
            :src="restaurant.logoUrl"
            :alt="`Logo for ${restaurant.name}`"
            class="w-16 h-16 object-contain"
            loading="lazy"
        />

        <div class="flex-1">
            <h3 class="text-base sm:text-lg font-extrabold text-gray-900 mb-1">
                {{ restaurant.name }}
            </h3>

            <StarRating
                v-if="restaurant.rating.starRating > 0"
                :value="restaurant.rating.starRating"
            />

            <div class="flex flex-wrap gap-2 mt-2">
                <span
                    v-for="cuisine in restaurant.cuisines"
                    :key="cuisine.name"
                    class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full font-medium"
                >
                    {{ cuisine.name }}
                </span>
            </div>
        </div>
    </li>
</template>

<script setup lang="ts">
import type { Restaurant } from '@/types/restaurants'
import StarRating from '@/components/StarRating.vue'

const props = defineProps<{
  restaurant: Restaurant
}>()
</script>

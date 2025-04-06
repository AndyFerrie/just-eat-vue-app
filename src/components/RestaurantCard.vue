<template>
    <li class="bg-white p-4 rounded shadow flex items-start gap-4">
        <img
            :src="restaurant.logoUrl"
            :alt="`Logo for ${restaurant.name}`"
            class="w-16 h-16 object-contain"
        />
        <div>
            <h3 class="font-bold text-lg">{{ restaurant.name }}</h3>
            <p class="text-sm text-gray-600">
                Rating: {{ restaurant.rating.starRating }} ★<br />
                Cuisines: {{ restaurant.cuisines.map(c => c.name).join(', ') }}
            </p>
        </div>
    </li>
</template>

<script setup lang="ts">
import type { Restaurant } from '@/types/restaurants'

defineProps<{
  restaurant: Restaurant
}>()
</script>

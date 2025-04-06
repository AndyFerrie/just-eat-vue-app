<template>
    <li class="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-5">
        <img
            :src="restaurant.logoUrl"
            :alt="`Logo for ${restaurant.name}`"
            class="w-16 h-16 rounded-full object-contain border border-gray-200"
            loading="lazy"
        />

        <div class="flex-1">
            <h3 class="text-base sm:text-lg font-extrabold text-gray-900 mb-1">
                {{ restaurant.name }}
            </h3>

            <!-- Accessible star rating -->
            <div
                class="flex items-center gap-2 text-sm text-gray-700"
                role="img"
                :aria-label="`${restaurant.rating.starRating.toFixed(1)} out of 5 stars`"
            >
                <div class="flex gap-0.5">
                    <!-- Full stars -->
                    <template
                        v-for="n in fullStars"
                        :key="'full-' + n"
                    >
                        <svg
                            class="w-4 h-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1
                1 0 00.95.69h4.165c.969 0 1.371 1.24.588
                1.81l-3.37 2.448a1 1 0
                00-.364 1.118l1.287 3.955c.3.921-.755
                1.688-1.538 1.118l-3.371-2.449a1 1 0
                00-1.175 0l-3.37 2.449c-.784.57-1.838-.197-1.539-1.118l1.287-3.955a1
                1 0 00-.364-1.118L2.02 9.382c-.783-.57-.38-1.81.588-1.81h4.165a1
                1 0 00.95-.69l1.286-3.955z"
                            />
                        </svg>
                    </template>

                    <!-- Half star -->
                    <svg
                        v-if="hasHalfStar"
                        class="w-4 h-4 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <defs>
                            <linearGradient id="half-gradient">
                                <stop
                                    offset="50%"
                                    stop-color="currentColor"
                                />
                                <stop
                                    offset="50%"
                                    stop-color="#e5e7eb"
                                />
                            </linearGradient>
                        </defs>
                        <path
                            fill="url(#half-gradient)"
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902
              0l1.286 3.955a1 1 0
              00.95.69h4.165c.969 0 1.371 1.24.588
              1.81l-3.37 2.448a1 1 0
              00-.364 1.118l1.287 3.955c.3.921-.755
              1.688-1.538 1.118l-3.371-2.449a1 1 0
              00-1.175 0l-3.37 2.449c-.784.57-1.838-.197-1.539-1.118l1.287-3.955a1
              1 0 00-.364-1.118L2.02 9.382c-.783-.57-.38-1.81.588-1.81h4.165a1
              1 0 00.95-.69l1.286-3.955z"
                        />
                    </svg>

                    <!-- Empty stars -->
                    <template
                        v-for="n in emptyStars"
                        :key="'empty-' + n"
                    >
                        <svg
                            class="w-4 h-4 text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1
                1 0 00.95.69h4.165c.969 0 1.371 1.24.588
                1.81l-3.37 2.448a1 1 0
                00-.364 1.118l1.287 3.955c.3.921-.755
                1.688-1.538 1.118l-3.371-2.449a1 1 0
                00-1.175 0l-3.37 2.449c-.784.57-1.838-.197-1.539-1.118l1.287-3.955a1
                1 0 00-.364-1.118L2.02 9.382c-.783-.57-.38-1.81.588-1.81h4.165a1
                1 0 00.95-.69l1.286-3.955z"
                            />
                        </svg>
                    </template>
                </div>

                <span class="font-semibold">
                    {{ restaurant.rating.starRating.toFixed(1) }}
                </span>
            </div>

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

const props = defineProps<{
  restaurant: Restaurant
}>()

const rating = props.restaurant.rating.starRating

const fullStars = Math.floor(rating)
const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75
const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
</script>

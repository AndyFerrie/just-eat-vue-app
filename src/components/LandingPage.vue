<script setup lang="ts">
import PostcodeSearchBox from '@/components/PostcodeSearchBox.vue'
import CuisineFilter from '@/components/CuisineFilter.vue'
import RestaurantCard from '@/components/RestaurantCard.vue'
import { fetchRestaurantsByPostcode } from '@/api/justEatApi'
import type { Restaurant } from '@/types/restaurants'
import { ref, computed } from 'vue'

const postcode = ref('')
const restaurants = ref<Restaurant[] | null>(null)
const allCuisines = ref<string[]>([])
const selectedCuisine = ref<string | null>(null)
const error = ref<string | null>(null)

const handleSearch = async (value: string) => {
  postcode.value = value
  error.value = null

  try {
    const result = await fetchRestaurantsByPostcode(value)

    restaurants.value = result.restaurants
    allCuisines.value = result.cuisines
    selectedCuisine.value = null
  } catch (err: any) {
    error.value = err.message || 'Something went wrong'
    restaurants.value = null
    allCuisines.value = []
    selectedCuisine.value = null
  }
}

const filteredRestaurants = computed(() => {
  if (!restaurants.value) return []
  if (!selectedCuisine.value) return restaurants.value

  return restaurants.value.filter((restaurant) =>
    restaurant.cuisines.some(
      (cuisine) =>
        cuisine.name.toLowerCase() === selectedCuisine.value?.toLowerCase()
    )
  )
})
</script>

<template>
    <main class="min-h-screen bg-[#f5f3f1] p-4 flex flex-col items-center">
        <PostcodeSearchBox
            v-model="postcode"
            @submit="handleSearch"
        />

        <CuisineFilter
            v-if="restaurants && restaurants.length > 0"
            :cuisines="allCuisines"
            :selected="selectedCuisine"
            @select="selectedCuisine = $event"
        />

        <div
            v-if="error"
            class="mt-4 text-red-600"
            role="alert"
            aria-live="assertive"
        >
            {{ error }}
        </div>

        <h2
            v-if="filteredRestaurants.length"
            class="mt-6 text-xl font-bold"
            id="restaurant-results"
        >
            Restaurants that deliver to {{ postcode }}
        </h2>

        <ul
            v-if="filteredRestaurants.length"
            :aria-labelledby="'restaurant-results'"
            class="mt-2 w-full max-w-xl space-y-4"
        >
            <RestaurantCard
                v-for="restaurant in filteredRestaurants"
                :key="restaurant.id"
                :restaurant="restaurant"
            />
        </ul>
    </main>
</template>

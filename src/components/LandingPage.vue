<template>
    <div class="min-h-screen bg-[#f5f3f1] p-4 flex flex-col items-center">
        <PostcodeSearchBox
            v-model="postcode"
            @submit="handleSearch"
        />

        <div class="mt-6 flex flex-col lg:flex-row w-full max-w-6xl gap-6">
            <!-- Sidebar with filters -->
            <aside
                v-if="restaurants && restaurants.length"
                class="w-full lg:w-1/4"
                role="region"
                aria-labelledby="cuisine-filter-heading"
            >
                <h2
                    id="cuisine-filter-heading"
                    class="sr-only"
                >
                    Cuisine Filters
                </h2>

                <CuisineFilter
                    :cuisines="visibleCuisines"
                    :selected="selectedCuisine"
                    :disabled="false"
                    @select="selectedCuisine = $event"
                />

                <button
                    v-if="allCuisines.length > MAX_VISIBLE"
                    @click="showAll = !showAll"
                    class="mt-2 text-primary text-sm underline"
                >
                    {{ showAll ? 'Show less' : 'View more cuisines' }}
                </button>
            </aside>

            <!-- Restaurant results -->
            <section class="flex-1">
                <div
                    v-if="error"
                    class="text-red-600 mb-4"
                >
                    {{ error }}
                </div>

                <h2
                    v-if="filteredRestaurants.length"
                    class="mb-4 font-bold text-lg"
                >
                    Restaurants that deliver to {{ searchedPostcode }}
                </h2>

                <ul
                    v-if="filteredRestaurants.length"
                    class="space-y-4"
                >
                    <RestaurantCard
                        v-for="restaurant in filteredRestaurants"
                        :key="restaurant.id"
                        :restaurant="restaurant"
                    />
                </ul>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PostcodeSearchBox from '@/components/PostcodeSearchBox.vue'
import CuisineFilter from '@/components/CuisineFilter.vue'
import RestaurantCard from '@/components/RestaurantCard.vue'
import { fetchRestaurantsByPostcode } from '@/api/justEatApi'
import type { Restaurant } from '@/types/restaurants'

const postcode = ref('')
const searchedPostcode = ref('')
const restaurants = ref<Restaurant[] | null>(null)
const allCuisines = ref<string[]>([])
const selectedCuisine = ref<string | null>(null)
const error = ref<string | null>(null)

const showAll = ref(false)
const MAX_VISIBLE = 10

const visibleCuisines = computed(() =>
  showAll.value ? allCuisines.value : allCuisines.value.slice(0, MAX_VISIBLE)
)

const filteredRestaurants = computed(() => {
  if (!restaurants.value) return []
  if (!selectedCuisine.value) return restaurants.value
  return restaurants.value.filter((r) =>
    r.cuisines.some(
      (c) => c.name.toLowerCase() === selectedCuisine.value?.toLowerCase()
    )
  )
})

const handleSearch = async (value: string) => {
  postcode.value = value
  searchedPostcode.value = value
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
</script>

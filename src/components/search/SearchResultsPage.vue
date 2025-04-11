<template>
    <div
        v-if="loading"
        class="fixed inset-0 z-50 bg-white/80 flex items-center justify-center"
        aria-busy="true"
    >
        <Spinner label="Finding restaurants near you..." />
    </div>

    <div class="min-h-screen bg-[#f5f3f1] p-4 flex flex-col items-center">
        <PostcodeSearchBox
            v-model="postcode"
            @submit="handleSearch"
        />

        <NoResults
            v-if="searchedPostcode && restaurants.length === 0"
            :searchQuery="searchedPostcode"
        />

        <div
            v-if="filteredRestaurants.length"
            class="mt-6 flex flex-col lg:flex-row w-full max-w-6xl gap-6"
        >
            <!-- Sidebar with filters -->
            <aside
                class="w-full lg:w-1/4 max-h-[60vh] overflow-y-auto pr-1"
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
                    :cuisines="allCuisines"
                    :selected="selectedCuisine"
                    :disabled="false"
                    @select="selectedCuisine = $event"
                />
            </aside>

            <!-- Restaurant results -->
            <section class="flex-1">
                <h2
                    v-if="restaurantCountText"
                    class="mb-4 font-bold text-lg"
                >
                    {{ restaurantCountText }}
                </h2>

                <InfiniteList
                    :items="filteredRestaurants"
                    :step="10"
                    test-id="restaurant-list"
                >
                    <template #default="{ item }">
                        <RestaurantCard :restaurant="item" />
                    </template>
                </InfiniteList>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

import PostcodeSearchBox from '@/components/search/PostcodeSearchBox.vue'
import CuisineFilter from '@/components/search/CuisineFilter.vue'
import RestaurantCard from '@/components/search/RestaurantCard.vue'
import InfiniteList from '@/components/search/InfiniteList.vue'
import Spinner from '@/components/common/Spinner.vue'
import NoResults from '@/components/search/NoResults.vue'

import { useRestaurantSearch } from '@/composables/useRestaurantSearch'
import { updateQueryParam } from '@/utils/url'

/**
 * Access to the current route object, used to read query params.
 */
const route = useRoute()

/**
 * Postcode entered by the user (used with v-model)
 */
const postcode = ref('')

/**
 * The postcode that was last submitted/searched
 */
const searchedPostcode = ref('')

/**
 * Currently selected cuisine filter, or null for all
 */
const selectedCuisine = ref<string | null>(null)

/**
 * Composable providing search logic and state.
 * Includes loading status, list of restaurants, and cuisine options.
 */
const {
  loading,
  error,
  restaurants,
  allCuisines,
  searchRestaurants
} = useRestaurantSearch()

/**
 * Restaurants filtered by the selected cuisine
 */
const filteredRestaurants = computed(() => {
  if (!selectedCuisine.value) return restaurants.value
  return restaurants.value.filter((restaurant) =>
    restaurant.cuisines.some(
      (cuisine) =>
        cuisine.name.toLowerCase() === selectedCuisine.value?.toLowerCase()
    )
  )
})

/**
 * Dynamic message like:
 * "4 Italian restaurants deliver to SW1A"
 */
const restaurantCountText = computed(() => {
  const count = filteredRestaurants.value.length
  const postcodeText = searchedPostcode.value.toUpperCase()

  if (!count || !postcodeText) return ''

  const isSingular = count === 1
  const cuisineText = selectedCuisine.value
    ? `${selectedCuisine.value} restaurant${isSingular ? '' : 's'}`
    : `restaurant${isSingular ? '' : 's'}`
  const verb = isSingular ? 'delivers' : 'deliver'

  return `${count} ${cuisineText} ${verb} to ${postcodeText}`
})

/**
 * Handles postcode search submission.
 * If the search is successful, updates state and URL.
 *
 * @param {string} value - The postcode submitted by the user
 */
const handleSearch = async (value: string) => {
  await searchRestaurants(value)

  if (!error.value) {
    postcode.value = value
    searchedPostcode.value = value
    selectedCuisine.value = null
    updateQueryParam('postcode', value)
  }
}

/**
 * Automatically runs a search when a `postcode` query param exists in the URL.
 * Only updates state if the fetch succeeds.
 */
watch(
  () => route.query.postcode,
  async (newPostcode: unknown) => {
    if (typeof newPostcode === 'string' && newPostcode.trim()) {
      await searchRestaurants(newPostcode)

      if (!error.value) {
        postcode.value = newPostcode
        searchedPostcode.value = newPostcode
        selectedCuisine.value = null
      }
    }
  },
  { immediate: true }
)
</script>

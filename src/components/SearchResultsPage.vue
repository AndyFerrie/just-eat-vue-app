<template>
    <div
        class="min-h-screen bg-[#f5f3f1] p-4 flex flex-col items-center"
        :class="{ 'justify-center': searchedPostcode && restaurants?.length === 0 }"
    >
        <transition
            name="fade"
            mode="out-in"
        >
            <template v-if="loading">
                <div
                    class="flex flex-col items-center justify-center min-h-[60vh]"
                >
                    <Spinner label="Finding restaurants near you..." />
                </div>
            </template>
            <template v-else>
                <PostcodeSearchBox
                    v-model="postcode"
                    @submit="handleSearch"
                />
            </template>
        </transition>

        <NoResults
            v-if="searchedPostcode && restaurants && restaurants.length === 0"
            :searchQuery="searchedPostcode"
        />

        <div class="mt-6 flex flex-col lg:flex-row w-full max-w-6xl gap-6">
            <!-- Sidebar with filters -->
            <aside
                v-if="restaurants && restaurants.length"
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
                    v-if="filteredRestaurants.length"
                    :items="filteredRestaurants"
                    :step="10"
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
import { toast } from 'vue-sonner'
import { useRoute } from 'vue-router'
import PostcodeSearchBox from '@/components/PostcodeSearchBox.vue'
import CuisineFilter from '@/components/CuisineFilter.vue'
import RestaurantCard from '@/components/RestaurantCard.vue'
import InfiniteList from '@/components/InfiniteList.vue'
import Spinner from '@/components/Spinner.vue'
import NoResults from './NoResults.vue'
import { fetchRestaurantsByPostcode } from '@/api/justEatApi'
import type { Restaurant } from '@/types/restaurants'

const route = useRoute()
const postcode = ref('')
const searchedPostcode = ref('')
const loading = ref(false)
const restaurants = ref<Restaurant[] | null>(null)
const allCuisines = ref<string[]>([])
const selectedCuisine = ref<string | null>(null)
const error = ref<string | null>(null)

const filteredRestaurants = computed(() => {
  if (!restaurants.value) return []
  if (!selectedCuisine.value) return restaurants.value
  return restaurants.value.filter((r) =>
    r.cuisines.some(
      (c) => c.name.toLowerCase() === selectedCuisine.value?.toLowerCase()
    )
  )
})

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

const handleSearch = async (value: string) => {
  postcode.value = value
  searchedPostcode.value = value
  error.value = null
  loading.value = true

  restaurants.value = null
  allCuisines.value = []
  selectedCuisine.value = null
  try {
    const result = await fetchRestaurantsByPostcode(value)
    restaurants.value = result.restaurants
    allCuisines.value = result.cuisines
    selectedCuisine.value = null
  } catch (err: any) {
    const message = err.message || 'Something went wrong'

    error.value = message
    toast.error(message)

    restaurants.value = null
    allCuisines.value = []
    selectedCuisine.value = null
  } finally {
    loading.value = false
  }
}

watch(
  () => route.query.postcode,
  async (newPostcode: unknown) => {
    if (typeof newPostcode === 'string' && newPostcode.trim()) {
      try {
        postcode.value = newPostcode
        await handleSearch(newPostcode)
      } catch (error) {
        console.error('Error in handleSearch:', error)
      }
    }
  },
  { immediate: true }
)
</script>

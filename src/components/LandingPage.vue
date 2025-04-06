<script setup lang="ts">
import PostcodeSearchBox from '@/components/PostcodeSearchBox.vue'
import { fetchRestaurantsByPostcode } from '@/api/justEatApi'
import type { Restaurant } from '@/types/restaurants'
import { ref } from 'vue'

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
</script>

<template>
    <div class="min-h-screen bg-[#f5f3f1] p-4 flex flex-col items-center">
        <PostcodeSearchBox
            v-model="postcode"
            @submit="handleSearch"
        />

        <div
            v-if="error"
            class="mt-4 text-red-600"
        >
            {{ error }}
        </div>

        <ul
            v-if="restaurants"
            class="mt-6 w-full max-w-xl space-y-4"
        >
            <li
                v-for="restaurant in restaurants"
                :key="restaurant.id"
                class="bg-white p-4 rounded shadow"
            >
                <h3 class="font-bold text-lg">{{ restaurant.name }}</h3>
                <p class="text-sm text-gray-600">
                    Rating: {{ restaurant.rating.starRating }} ★<br />
                    Cuisines:
                    {{ restaurant.cuisines.map(c => c.name).join(', ') }}
                </p>
            </li>
        </ul>
    </div>
</template>

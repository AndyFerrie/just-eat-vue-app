<template>
    <div class="min-h-screen grid grid-cols-1 md:grid-cols-2">
        <!-- Left: Text + Search Box -->
        <div
            class="flex flex-col justify-center items-center text-center p-8 bg-[#f5f3f1]"
        >
            <div class="max-w-md w-full">
                <h1 class="text-4xl font-extrabold text-gray-900 mb-4">
                    Order food and more
                </h1>
                <p class="text-lg text-gray-700 mb-8 font-semibold">
                    Restaurants and grocery stores delivering near you
                </p>
                <PostcodeSearchBox @submit="handleSearch" />
            </div>
        </div>

        <!-- Right: Hero Image -->
        <div class="bg-brand flex items-center justify-center p-4">
            <img
                src="@/assets/hero-image.png"
                alt="Just Eat pizza and branding"
                class="max-w-full h-auto object-contain"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import PostcodeSearchBox from '@/components/search/PostcodeSearchBox.vue'
import { useRestaurantSearch } from '@/composables/useRestaurantSearch'
import { useRouter } from 'vue-router'

const router = useRouter()
const { searchRestaurants, error } = useRestaurantSearch()

/**
 * Handles postcode search submission.
 * Calls the API, shows error toast if needed, and navigates on success.
 */
const handleSearch = async (postcode: string) => {
  await searchRestaurants(postcode)

  if (!error.value) {
  router.push({ name: 'SearchResults', query: { postcode } })
  }
}
</script>

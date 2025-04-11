import { ref } from "vue"
import type { Restaurant } from "@/types/restaurants"
import { fetchRestaurantsByPostcode } from "@/api/justEatApi"
import { toast } from "vue-sonner"

/**
 * Provides reactive state and search logic for fetching restaurants by postcode.
 *
 * Handles loading state, error messaging, and parsing restaurant + cuisine data from the API.
 * Useful for separating business logic from component code.
 *
 * @example
 * const {
 *   loading,
 *   error,
 *   restaurants,
 *   allCuisines,
 *   searchRestaurants
 * } = useRestaurantSearch()
 *
 * await searchRestaurants('SW1A 1AA')
 */
export function useRestaurantSearch() {
    const loading = ref(false)
    const restaurants = ref<Restaurant[]>([])
    const allCuisines = ref<string[]>([])
    const error = ref<string | null>(null)

    const searchRestaurants = async (postcode: string) => {
        loading.value = true
        error.value = null
        try {
            const result = await fetchRestaurantsByPostcode(postcode)
            restaurants.value = result.restaurants
            allCuisines.value = result.cuisines
        } catch (err: any) {
            const message = err.message || "Something went wrong"
            error.value = message
            toast.error(message)
        } finally {
            loading.value = false
        }
    }

    return {
        loading,
        error,
        restaurants,
        allCuisines,
        searchRestaurants,
    }
}

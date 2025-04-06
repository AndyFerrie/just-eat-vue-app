import axios from "axios"
import type { RestaurantsResponse } from "@/types/restaurants"
import { transformRestaurant } from "@/utils/transform"

export const apiClient = axios.create({
    baseURL: "/api",
    timeout: 5000,
})

export const fetchRestaurantsByPostcode = async (
    postcode: string
): Promise<RestaurantsResponse> => {
    try {
        const response = await apiClient.get(
            `/restaurants/bypostcode/${postcode}`
        )

        return {
            restaurants: response.data.Restaurants.map(transformRestaurant),
            cuisines:
                response.data.MetaData?.CuisineDetails.map(
                    (c: any) => c.Name
                ).sort() || [],
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (!error.response) {
                throw new Error(
                    "Network error – please check your connection and try again."
                )
            }

            switch (error.response.status) {
                case 400:
                    throw new Error(
                        "Invalid request – please check the postcode and try again."
                    )
                case 404:
                    throw new Error(
                        "Postcode not found – please enter a valid UK postcode"
                    )
                case 429:
                    throw new Error(
                        "We’re receiving a lot of traffic right now. Please try again shortly."
                    )
                case 500:
                    throw new Error(
                        "Something went wrong. Please try again later."
                    )
                default:
                    throw new Error(error.message)
            }
        }
        throw new Error("An unexpected error occurred")
    }
}

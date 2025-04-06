import axios from "axios"
import type { Restaurant } from "../types/Restaurant"

export const apiClient = axios.create({
    baseURL: "https://uk.api.just-eat.io",
    timeout: 5000,
})

export const fetchRestaurantsByPostcode = async (
    postcode: string
): Promise<Restaurant[]> => {
    const response = await apiClient.get(`/restaurants/bypostcode/${postcode}`)
    return response.data.Restaurants.map((restaurant: any) => ({
        id: restaurant.Id,
        name: restaurant.Name,
        logoUrl: restaurant.LogoUrl,
        rating: { starRating: restaurant.Rating.StarRating },
        cuisines: restaurant.Cuisines.map((cuisine: any) => ({
            name: cuisine.Name,
        })),
    }))
}

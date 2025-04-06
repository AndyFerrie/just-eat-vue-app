import axios from "axios"

export const apiClient = axios.create({
    baseURL: "https://uk.api.just-eat.io",
    timeout: 5000,
})

export const fetchRestaurantsByPostcode = async (postcode: string) => {
    const response = await apiClient.get(`/restaurants/bypostcode/${postcode}`)
    return response.data.Restaurants
}

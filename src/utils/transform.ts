import type { Restaurant } from "@/types/restaurants"

export const transformRestaurant = (restaurant: any): Restaurant => ({
    id: restaurant.Id,
    name: restaurant.Name,
    logoUrl: restaurant.LogoUrl,
    rating: { starRating: restaurant.Rating.StarRating },
    cuisines: restaurant.Cuisines.map((cuisine: any) => ({
        name: cuisine.Name,
    })),
})

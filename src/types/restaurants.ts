export interface CuisineDetail {
    name: string
}

export interface Restaurant {
    id: number
    name: string
    logoUrl: string
    rating: { starRating: number }
    cuisines: CuisineDetail[]
}

export interface RestaurantsResponse {
    restaurants: Restaurant[]
    cuisines: string[]
}

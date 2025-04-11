export interface Restaurant {
    id: number
    name: string
    logoUrl: string
    rating: { starRating: number }
    cuisines: Array<{ name: string }>
}

export interface CuisineDetail {
    name: string
}

export interface RestaurantsResponse {
    restaurants: Restaurant[]
    cuisines: CuisineDetail[]
}

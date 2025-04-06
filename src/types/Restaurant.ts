export interface Restaurant {
    id: number
    name: string
    logoUrl: string
    rating: { starRating: number }
    cuisines: Array<{ name: string }>
}

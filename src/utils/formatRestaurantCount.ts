/**
 * Formats a dynamic message like:
 * "4 Italian restaurants deliver to SW1A"
 *
 * @param count - Number of restaurants
 * @param cuisine - Selected cuisine filter, or null
 * @param postcode - Postcode the user searched for
 * @returns A formatted string or empty string if inputs are missing/invalid
 */
export function formatRestaurantCount(
    count: number,
    cuisine: string | null,
    postcode: string
): string {
    if (!count || !postcode) return ""

    const isSingular = count === 1
    const cuisineText = cuisine
        ? `${cuisine} restaurant${isSingular ? "" : "s"}`
        : `restaurant${isSingular ? "" : "s"}`
    const verb = isSingular ? "delivers" : "deliver"

    return `${count} ${cuisineText} ${verb} to ${postcode.toUpperCase()}`
}

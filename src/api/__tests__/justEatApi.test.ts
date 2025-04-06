import { describe, it, expect } from "vitest"
import MockAdapter from "axios-mock-adapter"
import { fetchRestaurantsByPostcode, apiClient } from "../justEatApi"

const mock = new MockAdapter(apiClient)

describe("fetchRestaurantsByPostcode", () => {
    it("fetches restaurants successfully", async () => {
        const postcode = "ec4m"

        mock.onGet(
            `https://uk.api.just-eat.io/restaurants/bypostcode/${postcode}`
        ).reply(200, {
            Restaurants: [
                {
                    Id: 1,
                    Name: "The Big Cheese Pizza Co.",
                    Rating: { StarRating: 4.9 },
                    Cuisines: [{ Name: "Pizza" }, { Name: "Italian" }],
                },
            ],
        })

        const restaurants = await fetchRestaurantsByPostcode(postcode)

        expect(restaurants).toEqual([
            {
                Id: 1,
                Name: "The Big Cheese Pizza Co.",
                Rating: { StarRating: 4.9 },
                Cuisines: [{ Name: "Pizza" }, { Name: "Italian" }],
            },
        ])
    })
})

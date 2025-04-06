import { describe, it, expect } from "vitest"
import MockAdapter from "axios-mock-adapter"
import { fetchRestaurantsByPostcode, apiClient } from "../justEatApi"

const mock = new MockAdapter(apiClient)

describe("fetchRestaurantsByPostcode", () => {
    const postcode = "ec4m"
    it("fetches restaurants successfully", async () => {
        mock.onGet(
            `https://uk.api.just-eat.io/restaurants/bypostcode/${postcode}`
        ).reply(200, {
            Restaurants: [
                {
                    Id: 1,
                    Name: "The Big Cheese Pizza Co.",
                    LogoUrl: "img.com/logo",
                    Rating: { StarRating: 4.9 },
                    Cuisines: [{ Name: "Pizza" }, { Name: "Italian" }],
                },
            ],
        })

        const restaurants = await fetchRestaurantsByPostcode(postcode)

        expect(restaurants).toEqual([
            {
                id: 1,
                name: "The Big Cheese Pizza Co.",
                logoUrl: "img.com/logo",
                rating: { starRating: 4.9 },
                cuisines: [{ name: "Pizza" }, { name: "Italian" }],
            },
        ])
    })
    it("transforms raw API data into Restaurant objects", async () => {
        mock.onGet(
            `https://uk.api.just-eat.io/restaurants/bypostcode/${postcode}`
        ).reply(200, {
            Area: "London",
            Restaurants: [
                {
                    Id: 1,
                    Name: "The Big Cheese Pizza Co.",
                    LogoUrl: "img.com/logo",
                    City: "London",
                    Postcode: "EC4M 1AA",
                    isHalal: false,
                    Rating: { StarRating: 4.9 },
                    Cuisines: [{ Name: "Pizza" }, { Name: "Italian" }],
                },
            ],
            ShortResultText: "ECM4",
        })

        const restaurants = await fetchRestaurantsByPostcode(postcode)

        expect(restaurants).toEqual([
            {
                id: 1,
                name: "The Big Cheese Pizza Co.",
                logoUrl: "img.com/logo",
                rating: { starRating: 4.9 },
                cuisines: [{ name: "Pizza" }, { name: "Italian" }],
            },
        ])
    })
})

import { describe, it, expect, afterEach } from "vitest"
import MockAdapter from "axios-mock-adapter"
import { fetchRestaurantsByPostcode, apiClient } from "../justEatApi"

const mock = new MockAdapter(apiClient)
const getApiPath = (postcode: string) =>
    `/api/restaurants/bypostcode/${postcode}`

describe("fetchRestaurantsByPostcode", () => {
    const postcode = "ec4m"

    afterEach(() => {
        mock.reset()
    })

    it("fetches restaurants successfully", async () => {
        mock.onGet(getApiPath(postcode)).reply(200, {
            MetaData: {
                CuisineDetails: [],
            },
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

        const result = await fetchRestaurantsByPostcode(postcode)

        expect(result.restaurants).toEqual([
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
        mock.onGet(getApiPath(postcode)).reply(200, {
            Area: "London",
            MetaData: {
                CuisineDetails: [],
            },
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

        const result = await fetchRestaurantsByPostcode(postcode)

        expect(result.restaurants).toEqual([
            {
                id: 1,
                name: "The Big Cheese Pizza Co.",
                logoUrl: "img.com/logo",
                rating: { starRating: 4.9 },
                cuisines: [{ name: "Pizza" }, { name: "Italian" }],
            },
        ])
    })
    it("returns an empty array when API responds with no restaurants", async () => {
        const postcode = "zz999"

        mock.onGet(getApiPath(postcode)).reply(200, {
            MetaData: {
                CuisineDetails: [],
            },
            Restaurants: [],
        })

        const result = await fetchRestaurantsByPostcode(postcode)

        expect(result).toEqual({
            cuisines: [],
            restaurants: [],
        })
    })
    it("returns an array of cuisine names alphabetically", async () => {
        mock.onGet(getApiPath(postcode)).reply(200, {
            Restaurants: [],
            MetaData: {
                CuisineDetails: [
                    { Name: "Pizza", SeoName: "pizza", Total: 5 },
                    { Name: "Chinese", SeoName: "chinese", Total: 6 },
                ],
            },
        })

        const result = await fetchRestaurantsByPostcode(postcode)

        expect(result.cuisines).toEqual(["Chinese", "Pizza"])
    })

    describe("error handling", () => {
        const errorPostcode = "!!!"
        const postcode = "ec4m"

        it("throws a user-friendly message on bad request (400)", async () => {
            mock.onGet(getApiPath(errorPostcode)).reply(400)

            await expect(
                fetchRestaurantsByPostcode(errorPostcode)
            ).rejects.toThrow(
                "Invalid request – please check the postcode and try again."
            )
        })
        it("throws a user-friendly error when postcode is completely invalid (404)", async () => {
            mock.onGet(getApiPath(errorPostcode)).reply(404)

            await expect(
                fetchRestaurantsByPostcode(errorPostcode)
            ).rejects.toThrow(
                "Postcode not found – please enter a valid UK postcode"
            )
        })
        it("throws a user-friendly message when rate limit (429) is hit", async () => {
            mock.onGet(getApiPath(postcode)).reply(429)

            await expect(fetchRestaurantsByPostcode(postcode)).rejects.toThrow(
                "We’re receiving a lot of traffic right now. Please try again shortly."
            )
        })
        it("throws a general error when the server returns 500", async () => {
            mock.onGet(getApiPath(postcode)).reply(500)

            await expect(fetchRestaurantsByPostcode(postcode)).rejects.toThrow(
                "Something went wrong. Please try again later."
            )
        })
        it("throws a user-friendly message when a network error occurs", async () => {
            mock.onGet(getApiPath(postcode)).networkError()

            await expect(fetchRestaurantsByPostcode(postcode)).rejects.toThrow(
                "Network error – please check your connection and try again."
            )
        })
    })
})

/// <reference types="cypress" />

describe("Just Eat Search Page", () => {
    beforeEach(() => {
        cy.intercept("GET", "/api/restaurants/bypostcode/EC4M", {
            fixture: "ec4m.json",
        }).as("getRestaurants")

        cy.visit("/")
        cy.get('input[aria-label="Enter your postcode"]').type("EC4M")
        cy.get('button[aria-label="Search by postcode"]').click()

        cy.url().should("include", "/search?postcode=EC4M")

        cy.wait("@getRestaurants")
    })

    it("shows search results for EC4M", () => {
        cy.get('[data-testid="spinner"]').should("not.exist")
        cy.contains(/^1995 restaurants deliver to EC4M$/).should("exist")
        cy.get('[data-testid="restaurant-list"]')
            .find('[role="listitem"]')
            .should("have.length.greaterThan", 0)
    })

    it("filters restaurants by Authentic Pizza", () => {
        cy.get('[data-testid="spinner"]').should("not.exist")
        cy.contains("Authentic Pizza").click()
        cy.contains(/^1 Authentic Pizza restaurant delivers to EC4M$/).should(
            "exist"
        )
    })

    it("filters restaurants by Burgers", () => {
        cy.get('[data-testid="spinner"]').should("not.exist")
        cy.contains("Burgers").click()
        cy.contains(/^252 Burgers restaurants deliver to EC4M$/).should("exist")
    })

    it("shows message when no restaurants are found", () => {
        cy.intercept("GET", "**/restaurants/bypostcode/NORESTAURANTS", {
            MetaData: { CuisineDetails: [] },
            Restaurants: [],
        }).as("getEmptyResults")

        cy.visit("/")
        cy.get('input[aria-label="Enter your postcode"]').type("NORESTAURANTS")
        cy.get('button[aria-label="Search by postcode"]').click()

        cy.url().should("include", "/search?postcode=NORESTAURANTS")
        cy.wait("@getEmptyResults")

        cy.get('[data-testid="spinner"]').should("not.exist")
        cy.contains("Hm, we couldn’t find 'NORESTAURANTS'").should("exist")
    })

    it("updates the url when searching again", () => {
        cy.get('[data-testid="spinner"]').should("not.exist")
        cy.get('input[aria-label="Enter your postcode"]').clear().type("BS8")
        cy.get('button[aria-label="Search by postcode"]').click()

        cy.url().should("include", "/search?postcode=BS8")
    })
})

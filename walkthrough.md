# 🍽️ Just Eat Postcode Search

A front-end proof of concept for postcode-based restaurant discovery using the public Just Eat API.

Built with Vue 3 (Composition API), TypeScript, and Tailwind CSS — with a focus on accessibility, modularity, and testability.

---

## ✅ Walkthrough Summary

-   Built with TDD and TypeScript, starting from an Axios API client
-   Handled edge cases: rate limits, invalid postcodes, no results, and network failures
-   Applied Tailwind with Just Eat branding and custom font integration
-   Designed a modular, accessible UI using reusable Vue 3 components
-   Prioritised accessibility with semantic HTML, keyboard support, and clear feedback
-   Added cuisine filters, infinite scroll, star ratings, and user-friendly feedback
-   Connected views using Vue Router with postcode-driven query params
-   Tested key flows with Cypress using mocked fixtures for stability

---

## 🔧 Architecture Choices

The app is structured for clarity, testability, and ease of change:

-   **API logic** is isolated in a dedicated module:

    -   Axios client: `src/api/justEatApi.ts`
    -   Transform utility: `src/utils/transform.ts`

-   **Views** are managed with Vue Router and query string state:

    -   `src/router/index.ts`

-   **Components** are composable and scoped by responsibility:

    -   `src/components/PostcodeSearchBox.vue`
    -   `src/components/CuisineFilter.vue`

-   **UI feedback** (e.g. spinners, empty states, and errors) is handled consistently:
    -   `src/components/Spinner.vue`
    -   `src/components/NoResults.vue`
    -   Error messaging surfaced via toast notifications

---

## ✅ Test-Driven API Integration

Created an Axios client to manage API interactions centrally and predictably.

📁 `src/api/justEatApi.ts`

Used Vitest with `axios-mock-adapter` to guide implementation. Leveraged TypeScript to define strict types and added a `transformRestaurant()` utility to shape raw API data into predictable domain objects.

Covered:

-   Fetches and transforms API data into typed `Restaurant` objects
-   Returns an empty array on no results
-   Handles:
    -   400 (bad request) → user-friendly message
    -   404 (invalid postcode) → clear user feedback
    -   429 (rate-limited) → prompt to try again later
    -   500 (server error) → fallback message
    -   Network errors → graceful offline handling

📁 `src/api/__tests__/justEatApi.test.ts`  
📁 `src/types/restaurants.ts`  
📁 `src/utils/transform.ts`

---

## 🎨 Branding & Styles

Tailwind CSS was configured with Just Eat's brand colors and the JetSansDigital font. Utility classes helped keep styling consistent and responsive.

📁 `src/styles/`  
📁 `tailwind.config.cjs`

---

## 🧱 Reusable Component System

Built foundational UI components early on:

-   `Button.vue`: Accessible button with styling variants
-   `Input.vue`: Styled text input
-   `PostcodeSearchBox.vue`: Composed from input and button, with validation logic

📁 `src/components/`

---

## 🧪 CORS Proxy with Vite

Encountered CORS issues when testing against the real API. Solved this using Vite’s proxy config during development.

📁 `vite.config.ts`

---

## 🍽️ Cuisine Filter

Built an accessible, vertical single-select filter menu. Extracted cuisine names from the API and sorted them alphabetically.

📁 `src/components/CuisineFilter.vue`

---

## 🍔 Restaurant Card

Created a clean, responsive component to display restaurant listings:

-   Logo, name, cuisine tags, and rating
-   Works with transformed restaurant data

📁 `src/components/RestaurantCard.vue`

---

## 🔁 Infinite Scroll

Implemented `InfiniteList.vue` using the Intersection Observer API to handle paginated scroll.

📁 `src/components/InfiniteList.vue`

---

## ⭐ Star Rating

Used SVG icons to display star ratings, rounded to the nearest whole number.

📁 `src/components/StarRating.vue`

---

## 🚨 Error Toaster

Error feedback is surfaced using a toast-style notification — clear, non-blocking, and accessible.

---

## 🧭 Page Layout & Routing

Introduced a clean split between landing and results pages:

-   `LandingPage.vue`: Entry point with hero image and postcode search
-   `SearchResultsPage.vue`: Fetches and displays filtered restaurant data
-   Used Vue Router to navigate between pages and manage query params

📁 `src/components/LandingPage.vue`  
📁 `src/components/SearchResultsPage.vue`  
📁 `src/router/index.ts`

---

## 🧪 Cypress End-to-End Tests

Tested real user flows using mocked fixtures for reliability and speed:

-   Displays expected results for EC4M
-   Cuisine filter updates results correctly
-   No results message appears when appropriate
-   Query string updates as users interact

📁 `cypress/e2e/search.cy.ts`  
📁 `cypress/fixtures/ec4m.json`

---

## 🧪 Additional Testing Considerations

With more time, I’d expand coverage to include:

-   Component-level tests for filters, loading states, and star rating logic
-   Accessibility checks via `axe-core` or Cypress integrations
-   Tests for slow responses, retry logic, and network timeouts
-   Debounce or throttle behavior under rapid input

---

## 🤔 API Feedback

The Just Eat API works well but could benefit from a few improvements:

-   Support **pagination or limit/offset** to reduce payload size (EC4M returns ~5MB)
-   Allow **filtering by cuisine via query param** (e.g. `?cuisine=Pizza`)
-   Return a more consistent response shape to reduce defensive coding

---

## 🔮 Future Improvements

-   Replace the toast notification with a more consistent and accessible error display
-   Improve test coverage across all layers (unit, component, E2E)
-   Implement **debouncing/throttling** to reduce API load and handle 429s
-   Add **caching** for repeated postcode lookups
-   Introduce **skeleton loaders** to improve perceived performance
-   Enhance **mobile responsiveness**
-   Continue improving accessibility (screen reader support, skip links, focus states)

/**
 * Updates a single query parameter in the browser's URL without reloading the page.
 * Uses the History API's `pushState` to avoid triggering a full navigation.
 *
 * @param {string} key - The name of the query parameter to update.
 * @param {string} value - The value to set for the query parameter.
 *
 * @example
 * updateQueryParam('postcode', 'SW1A1AA')
 * // Results in: ?postcode=SW1A1AA
 */
export const updateQueryParam = (key: string, value: string) => {
    const url = new URL(window.location.href)
    url.searchParams.set(key, value)
    window.history.pushState({}, "", url)
}

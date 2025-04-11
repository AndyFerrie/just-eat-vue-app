import { createRouter, createWebHistory } from "vue-router"
import LandingPage from "@/components/layout/LandingPage.vue"
import SearchResults from "@/components/search/SearchResultsPage.vue"

const routes = [
    {
        path: "/",
        name: "Home",
        component: LandingPage,
    },
    {
        path: "/search",
        name: "SearchResults",
        component: SearchResults,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

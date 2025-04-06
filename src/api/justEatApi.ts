import axios from "axios"

const apiClient = axios.create({
    baseURL: "https://uk.api.just-eat.io",
    timeout: 5000,
})

export default apiClient

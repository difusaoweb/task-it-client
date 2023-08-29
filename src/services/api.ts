import axios from "axios"

export const axiosAPI = axios.create({
    baseURL:process.env.NEXT_PUBLIC_BASE_URL_API
});
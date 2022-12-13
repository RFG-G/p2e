import axios from "axios";

const BASE_URL = process.env.BASE_URL ?? "http://46.17.100.150"

const requestClient = axios.create({
    baseURL: `${BASE_URL}/api/v1/`,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

requestClient.interceptors.request.use((config) => {
    if (config.headers) config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    return config
}, (error) => {
    return Promise.reject(error);
})

requestClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error);
});

export const getProfilePhotoURL = (username: string) => `${BASE_URL}/image/user/${username}.png`

export default requestClient;
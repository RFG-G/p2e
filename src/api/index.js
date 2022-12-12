import axios from "axios";

const requestClient = axios.create({
    baseURL: "https://1428-176-52-97-193.eu.ngrok.io/api/v1/",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

requestClient.interceptors.request.use((config) => {
    config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    return config
}, (error) => {
    return Promise.reject(error);
})

requestClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error.response);
});

export default requestClient;
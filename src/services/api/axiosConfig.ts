import axios from "axios";
import { BASE_ENDPOINT_DEV } from "constans/baseEndPoint";
import { LocalStorageManager } from "local-storage";



 export const api = axios.create({
    baseURL: BASE_ENDPOINT_DEV
})

api.interceptors.request.use(
    (config) => {
        const localStorage =  new LocalStorageManager<{access_token: string}>('token');
        const token = localStorage.getData();
        if (token) config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
    (error) =>  Promise.reject(error)
)

api.interceptors.response.use(
    (config) => {
        const localStorage =  new LocalStorageManager<{access_token: string}>('token');
        const token = localStorage.getData();
        if (token) config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
)



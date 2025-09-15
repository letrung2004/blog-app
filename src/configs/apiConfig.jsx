import axios from "axios";
import { tokenStorage } from "../utils/storage";

const URL = "https://aucontech-intern-test-blog-management-system-production.up.railway.app/api";

export const API = axios.create({
    baseURL: URL,
});

export const AUTH_REQUEST = axios.create({
    baseURL: URL,
});

AUTH_REQUEST.interceptors.request.use((config) => {
    const token = tokenStorage.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

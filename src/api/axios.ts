import axiosBase, { AxiosInstance } from 'axios';

const axios = axiosBase.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default axios as AxiosInstance;
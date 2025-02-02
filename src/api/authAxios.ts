import axiosBase, { AxiosInstance } from 'axios';
import { fetchAuthSession } from 'aws-amplify/auth';
import auth from './auth';

const axios = axiosBase.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

axios.interceptors.request.use(async (config) => {
    try {
        const session = await fetchAuthSession();
        if (session) {
            const accessToken = session.tokens?.accessToken.toString();
            if (accessToken) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
        }
    } catch (err) {
        console.error(err);
    }
    return config;
});

axios.interceptors.response.use(
    response => response,
    async (err) => {
        const config = err.config;
        if (err.response?.status === 401 && !config.__isRetryRequest) {
            config.__isRetryRequest = true;
            config.__retryCount = config.__retryCount || 0;

            try {
                const session = await fetchAuthSession({ forceRefresh: true });
                const newAccessToken = session.tokens?.accessToken.toString();

                if (newAccessToken) {
                    config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axios(config);
                }
            } catch (err) {
                console.error("Error refreshing token:", err);
            }
        }

        if (config.__retryCount < 3) {
            config.__retryCount++;
            return new Promise(resolve => {
                setTimeout(() => resolve(axios(config)), 1000);
            });
        }

        if (err.response?.status === 401) {
            try {
                await auth.logoutUser();
            } catch (err) {
                console.error('Error logging out:', err);
            }
        }

        return Promise.reject(err);
    }
);

export default axios as AxiosInstance;
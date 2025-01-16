import axiosBase, { AxiosInstance } from 'axios';
import userPool from '@/utils/userPool';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

const axios = axiosBase.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

axios.interceptors.request.use((config) => {
    const user = userPool.getCurrentUser();
    if (user) {
        user.getSession((err: Error | null, session: CognitoUserSession | null) => {
            if (err) return console.error(err);
            const accessToken = session!.getAccessToken().getJwtToken();
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        });
    }
    return config;
});

axios.interceptors.response.use(response => response, (err) => {
    const config = err.config;
    if (err.response?.status === 401 && !config.__isRetryRequest) {
        config.__isRetryRequest = true;
        config.__retryCount = config.__retryCount || 0;

        const user = userPool.getCurrentUser();
        if (user) {
            user.getSession((err: Error | null, session: CognitoUserSession | null) => {
                if (err) return console.error(err);
                const accessToken = session!.getAccessToken().getJwtToken();
                config.headers['Authorization'] = `Bearer ${accessToken}`;
                return axios(config);
            });
        }
    }

    if (config.__retryCount < 3) {
        config.__retryCount++;
        return setTimeout(() => axios(config), 1000);
    }

    if (err.response?.status === 401) {
        userPool.getCurrentUser()?.signOut();
    }

    return Promise.reject(err);
});

export default axios as AxiosInstance;
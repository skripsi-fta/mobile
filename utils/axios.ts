import type { Profile } from '@/infrastructure/models/auth/profile';
import axios from 'axios';
import { getItem, removeItem, setItem } from './AsyncStorage';

const http = axios.create({
    baseURL: `${process.env.EXPO_PUBLIC_API_URL}`
});

const refreshAccessToken = async () => {
    try {
        const userData: Profile.Response | null = await getItem('user-data');

        if (!userData) {
            throw new Error('No User Data');
        }

        const response = await axios.get('/auth/refresh', {
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            headers: {
                Authorization: `Bearer ${userData.refreshToken}`
            }
        });

        const { token } = response.data;

        await setItem('user-data', { ...userData, token });

        return token;
    } catch (error) {
        console.error('Failed to refresh token', error);
        throw error;
    }
};

http.interceptors.request.use(
    async (config) => {
        const userData: Profile.Response | null = await getItem('user-data');

        if (!userData) {
            return config;
        }

        config.headers.Authorization = `Bearer ${userData.token}`;

        return config;
    },
    (error) => {
        throw error;
    }
);

http.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry &&
            originalRequest?.headers?.Authorization
        ) {
            originalRequest._retry = true;

            try {
                const newToken = await refreshAccessToken();

                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                return http(originalRequest);
            } catch (refreshError) {
                await removeItem('user-data');

                // toast.error('Session Expired');

                // window.location.href = '/login';

                return Promise.reject(refreshError);
            }
        }

        throw error;
    }
);

export default http;

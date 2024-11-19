import type { Profile } from '@/infrastructure/models/auth/profile';
import { getItem, removeItem, setItem } from '@/utils/AsyncStorage';
import axios, { type AxiosInstance } from 'axios';
import { useNavigation } from 'expo-router';
import {
    createContext,
    useContext,
    type FC,
    type PropsWithChildren,
    useEffect,
    useState
} from 'react';
import { useQuery } from 'react-query';

export interface AuthContextType {
    user: Profile.PatientData | null;
    isLoading: boolean;
    isError: boolean;
    isAuthenticated: boolean;
    refetchAuth: () => void;
    http: AxiosInstance;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const { data, isLoading, isError, refetch } =
        useQuery<Profile.PatientData | null>({
            queryKey: ['user-data'],
            queryFn: async () => {
                const user: Profile.PatientData | null = await getItem(
                    'user-data'
                );

                return user;
            }
        });

    const isAuthenticated = Boolean(data);

    const navigation = useNavigation();

    const http = axios.create({
        baseURL: `${process.env.EXPO_PUBLIC_API_URL}`,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    });

    const refreshAccessToken = async () => {
        try {
            const userData: Profile.Response | null = await getItem(
                'user-data'
            );

            if (!userData) {
                throw new Error('No User Data');
            }

            const response = await axios.get('/auth/refresh', {
                baseURL: process.env.EXPO_PUBLIC_API_URL,
                headers: {
                    Authorization: `Bearer ${userData.refreshToken}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
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
            const userData: Profile.Response | null = await getItem(
                'user-data'
            );

            if (userData?.token) {
                config.headers.Authorization = `Bearer ${userData.token}`;
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
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

                    navigation.reset({
                        index: 0,
                        routes: [{ name: '(tabs)' as never }]
                    });

                    refetch();

                    return Promise.reject(refreshError);
                }
            }

            throw error;
        }
    );

    return (
        <AuthContext.Provider
            value={{
                user: data ?? null,
                isLoading,
                isError,
                isAuthenticated,
                refetchAuth: refetch,
                http
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            'Make sure the component is wrapped by AuthContext Provider'
        );
    }

    return context;
};

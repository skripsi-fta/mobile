import type { Profile } from '@/infrastructure/models/auth/profile';
import { getItem } from '@/utils/AsyncStorage';
import {
    createContext,
    useContext,
    type FC,
    type PropsWithChildren
} from 'react';
import { useQuery } from 'react-query';

export interface AuthContextType {
    user: Profile.PatientData | null;
    isLoading: boolean;
    isError: boolean;
    isAuthenticated: boolean;
    refetchAuth: () => void;
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

    return (
        <AuthContext.Provider
            value={{
                user: data ?? null,
                isLoading,
                isError,
                isAuthenticated,
                refetchAuth: refetch
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

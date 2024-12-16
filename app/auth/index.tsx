import { Stack } from 'expo-router';
import LoginScreenComponent from '@/presentation/screens/auth/login/Component';

const AuthPage = () => {
    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Home',
                    headerShown: false
                }}
            />

            <LoginScreenComponent />
        </>
    );
};

export default AuthPage;

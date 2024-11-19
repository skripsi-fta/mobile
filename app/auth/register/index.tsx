import RegisterScreenComponent from '@/presentation/screens/auth/register/Component';
import { Stack } from 'expo-router';

const RegisterPage = () => {
    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Home',
                    headerShown: false
                }}
            />

            <RegisterScreenComponent />
        </>
    );
};

export default RegisterPage;

import RegisterFinishScreenComponent from '@/presentation/screens/auth/register/finished/Component';
import { Stack } from 'expo-router';

const RegisterFinishPage = () => {
    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Home',
                    headerShown: false,
                    gestureEnabled: false
                }}
            />

            <RegisterFinishScreenComponent />
        </>
    );
};

export default RegisterFinishPage;

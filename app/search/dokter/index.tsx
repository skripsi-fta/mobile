import DokterPageComponent from '@/presentation/screens/search/dokter/Component';
import { Stack } from 'expo-router';

const DokterPage = () => {
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,
                    fullScreenGestureEnabled: true
                }}
            />

            <DokterPageComponent />
        </>
    );
};

export default DokterPage;

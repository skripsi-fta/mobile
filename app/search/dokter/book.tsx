import DokterPageBookComponent from '@/presentation/screens/search/dokter/book/Component';
import { Stack } from 'expo-router';

const DokterBookPage = () => {
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,
                    fullScreenGestureEnabled: true
                }}
            />

            <DokterPageBookComponent />
        </>
    );
};

export default DokterBookPage;

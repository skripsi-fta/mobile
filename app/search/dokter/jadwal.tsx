import DokterPageJadwalComponent from '@/presentation/screens/search/dokter/jadwal/Component';
import { Stack } from 'expo-router';

const DokterJadwalPage = () => {
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,
                    fullScreenGestureEnabled: true
                }}
            />

            <DokterPageJadwalComponent />
        </>
    );
};

export default DokterJadwalPage;

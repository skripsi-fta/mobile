import LinkPatientComponent from '@/presentation/screens/profile/patient/link/Component';
import { Stack } from 'expo-router';

const LinkPatientPage = () => {
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false
                }}
            />

            <LinkPatientComponent />
        </>
    );
};

export default LinkPatientPage;

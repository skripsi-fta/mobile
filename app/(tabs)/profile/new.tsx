import NewPatientComponent from '@/presentation/screens/profile/patient/new/Component';
import { Stack } from 'expo-router';

const NewPatientPage = () => {
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false
                }}
            />

            <NewPatientComponent />
        </>
    );
};

export default NewPatientPage;

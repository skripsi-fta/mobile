import DetailAppointmentComponent from '@/presentation/screens/appointment/Detail/Component';
import { Stack } from 'expo-router';

const AppointmentDetailPage = () => {
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,
                    fullScreenGestureEnabled: true
                }}
            />

            <DetailAppointmentComponent />
        </>
    );
};

export default AppointmentDetailPage;

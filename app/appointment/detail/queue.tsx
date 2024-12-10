import QueueAppointmentComponent from '@/presentation/screens/appointment/Queue/Component';
import { Stack } from 'expo-router';

const AppointmentDetailQueuePage = () => {
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,
                    fullScreenGestureEnabled: true
                }}
            />

            <QueueAppointmentComponent />
        </>
    );
};

export default AppointmentDetailQueuePage;

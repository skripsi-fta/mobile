import { Stack } from 'expo-router';

export default function ProfileLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                fullScreenGestureEnabled: true
            }}
        >
            <Stack.Screen
                name='index'
                options={{ headerShown: false, gestureEnabled: true }}
            />
            <Stack.Screen
                name='new'
                options={{ headerShown: false, gestureEnabled: true }}
            />
            <Stack.Screen
                name='link'
                options={{ headerShown: false, gestureEnabled: true }}
            />
        </Stack>
    );
}

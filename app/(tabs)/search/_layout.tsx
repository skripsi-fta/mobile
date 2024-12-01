import { Stack } from 'expo-router';

export default function SearchLayout() {
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
        </Stack>
    );
}

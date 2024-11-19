import { Stack, useFocusEffect, useNavigation } from 'expo-router';
import React from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { BackHandler } from 'react-native';

export default function TabLayout() {
    const { isAuthenticated } = useAuth();

    const navigation = useNavigation();

    useFocusEffect(() => {
        const onBackPress = () => {
            navigation.reset({
                index: 0,
                routes: [{ name: '(tabs)' as never }]
            });
            return true;
        };

        BackHandler.addEventListener('hardwareBackPress', onBackPress);

        if (isAuthenticated) {
            onBackPress();
        }

        return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    });

    return (
        <Stack
            screenOptions={{
                fullScreenGestureEnabled: true
            }}
        >
            <Stack.Screen
                name='index'
                options={{
                    title: 'Home'
                }}
            />

            <Stack.Screen name='register' options={{ title: 'register' }} />
        </Stack>
    );
}

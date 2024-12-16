import SpesialisasiPageComponent from '@/presentation/screens/search/spesialisasi/Component';
import { Stack } from 'expo-router';
import React from 'react';

const SpesialisasiPage = () => {
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,
                    fullScreenGestureEnabled: true
                }}
            />

            <SpesialisasiPageComponent />
        </>
    );
};

export default SpesialisasiPage;

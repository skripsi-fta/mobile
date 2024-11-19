import { Tabs } from 'expo-router';
import React from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { colors } from '@/constants/colors';
import { CustomIcons } from '@/presentation/components/CustomIcons';

export default function TabLayout() {
    const { isAuthenticated } = useAuth();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarInactiveTintColor: '#717173',
                tabBarActiveTintColor: colors.primaryBlue
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Beranda',
                    tabBarIcon: ({ color, focused }) => (
                        <CustomIcons
                            type='ion'
                            name={focused ? 'home' : 'home-outline'}
                            color={color}
                        />
                    )
                }}
            />

            <Tabs.Screen
                name='search/index'
                options={{
                    title: 'Cari',
                    tabBarIcon: ({ color, focused }) => (
                        <CustomIcons
                            type='ion'
                            name={focused ? 'search' : 'search-outline'}
                            color={color}
                        />
                    )
                }}
            />

            <Tabs.Screen
                name='appointment/index'
                options={{
                    title: 'Janji Temu',
                    tabBarIcon: ({ color, focused }) => (
                        <CustomIcons
                            type='ion'
                            name={
                                focused
                                    ? 'calendar-clear'
                                    : 'calendar-clear-outline'
                            }
                            color={color}
                        />
                    )
                }}
                redirect={!isAuthenticated}
            />

            <Tabs.Screen
                name='test'
                options={{
                    title: 'Test',
                    tabBarIcon: ({ color, focused }) => (
                        <CustomIcons
                            type='ion'
                            name={focused ? 'code-slash' : 'code-slash-outline'}
                            color={color}
                        />
                    )
                }}
                redirect={true}
            />

            <Tabs.Screen
                name='profile/index'
                options={{
                    title: 'Profil',
                    tabBarIcon: ({ color, focused }) => (
                        <CustomIcons
                            type='ion'
                            name={focused ? 'person' : 'person-outline'}
                            color={color}
                        />
                    )
                }}
            />
        </Tabs>
    );
}

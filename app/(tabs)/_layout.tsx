import { Tabs, useNavigation, usePathname, useSegments } from 'expo-router';
import React, { useEffect, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { colors } from '@/constants/colors';
import { CustomIcons } from '@/presentation/components/CustomIcons';
import { useModal } from '@/providers/ModalProvider';
import NoticeModal from '@/presentation/screens/profile/patient/Components/NoticeModal';

export default function TabLayout() {
    const { isAuthenticated, user } = useAuth();

    const navigation = useNavigation();

    const segments = useSegments();

    const hideBottomBar = useMemo(() => {
        if (segments.length > 2) return true;
    }, [segments]);

    const nestedHomePageOpened = useMemo(() => {
        return (
            segments.length > 2 &&
            segments[0] === '(tabs)' &&
            segments[1] === 'profile'
        );
    }, [segments]);

    const { openModal } = useModal();

    useEffect(() => {
        if (user?.user && navigation.isFocused()) {
            if (!user.user.patient) {
                openModal(<NoticeModal />, {});
            }
        }
    }, [user, navigation.isFocused()]);

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarInactiveTintColor: '#717173',
                tabBarActiveTintColor: colors.primaryBlue,
                tabBarStyle: hideBottomBar ? { display: 'none' } : {}
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
                name='search'
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
                name='profile'
                options={{
                    title: 'Profil',
                    tabBarIcon: ({ color, focused }) => (
                        <CustomIcons
                            type='ion'
                            name={focused ? 'person' : 'person-outline'}
                            color={color}
                        />
                    ),
                    tabBarStyle: nestedHomePageOpened ? { display: 'none' } : {}
                }}
            />
        </Tabs>
    );
}

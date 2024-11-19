import { CustomText } from '@/presentation/components/CustomText';
import { Slot, Stack, Tabs, useRouter } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const RegisterPage = () => {
    const insets = useSafeAreaInsets();

    const router = useRouter();

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Home',
                    headerShown: false
                }}
            />

            <View
                style={{
                    flex: 1,
                    paddingTop: insets.top + 8,
                    paddingHorizontal: 16
                }}
            >
                <CustomText onPress={() => router.push('/auth')}>
                    this is register page, Go to Index Page
                </CustomText>
            </View>
        </>
    );
};

export default RegisterPage;

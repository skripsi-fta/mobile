import { CustomText } from '@/presentation/components/CustomText';
import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AuthPage = () => {
    const insets = useSafeAreaInsets();

    return (
        <>
            <Tabs.Screen
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarStyle: {
                        display: 'none'
                    }
                }}
            />
            <View
                style={{
                    flex: 1,
                    paddingTop: insets.top + 8,
                    paddingHorizontal: 16
                }}
            >
                <CustomText>auth Page</CustomText>
            </View>
        </>
    );
};

export default AuthPage;

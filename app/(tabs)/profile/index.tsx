import { useAuth } from '@/contexts/AuthContext';
import { CustomText } from '@/presentation/components/CustomText';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProfilePage = () => {
    const { isAuthenticated } = useAuth();

    const insets = useSafeAreaInsets();

    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            // router.push('/auth');
        }
    }, [isAuthenticated]);

    return (
        <View
            style={{
                flex: 1,
                paddingTop: insets.top + 8,
                paddingHorizontal: 16
            }}
        >
            <CustomText>Account Page</CustomText>
        </View>
    );
};

export default ProfilePage;

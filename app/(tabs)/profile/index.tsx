import { useAuth } from '@/contexts/AuthContext';
import { CustomText } from '@/presentation/components/CustomText';
import { removeItem } from '@/utils/AsyncStorage';
import { useFocusEffect, useNavigation, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProfilePage = () => {
    const { isAuthenticated, refetchAuth } = useAuth();

    const insets = useSafeAreaInsets();

    const router = useRouter();

    useFocusEffect(() => {
        if (!isAuthenticated) {
            router.push('/auth');
        }
    });

    if (!isAuthenticated) {
        return null;
    }

    const navigation = useNavigation();

    const backToHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: '(tabs)' as never }]
        });
        refetchAuth();
    };

    return (
        <View
            style={{
                flex: 1,
                paddingTop: insets.top + 8,
                paddingHorizontal: 16
            }}
        >
            <CustomText>Account Page</CustomText>
            <TouchableOpacity
                onPress={async () => {
                    await removeItem('user-data');
                    backToHome();
                }}
            >
                <Text>logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProfilePage;

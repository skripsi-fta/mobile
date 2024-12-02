import { CustomText } from '@/presentation/components/CustomText';
import { Stack, useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function NotFoundScreen() {
    const router = useRouter();

    return (
        <>
            <Stack.Screen options={{ title: 'Oops!', headerShown: false }} />
            <View style={styles.container}>
                <CustomText type='title'>Page not found! 😭</CustomText>
                <TouchableOpacity
                    onPress={() => {
                        router.replace('/(tabs)');
                    }}
                    style={styles.link}
                >
                    <CustomText type='link'>Go to home screen!</CustomText>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    link: {
        marginTop: 15,
        paddingVertical: 15
    }
});

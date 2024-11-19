import { colors } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import type { UserLoginForm } from '@/infrastructure/models/auth/login';
import { AuthAPI } from '@/infrastructure/usecase/auth';
import { CustomText } from '@/presentation/components/CustomText';
import LoadingOverlay from '@/presentation/components/LoadingOverlay';
import { setItem } from '@/utils/AsyncStorage';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Image, TouchableOpacity, View } from 'react-native';
import { useMutation } from 'react-query';

const RegisterFinishScreenComponent = () => {
    const { refetchAuth, http } = useAuth();

    const { password, username } = useLocalSearchParams() as unknown as {
        username: string;
        password: string;
    };

    const navigation = useNavigation();

    const backToHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: '(tabs)' as never }]
        });
        refetchAuth();
    };
    const useCase = new AuthAPI(http);

    const { mutate: login, isLoading: isLoadingLogin } = useMutation({
        mutationKey: ['login'],
        mutationFn: (data: UserLoginForm) => useCase.login(data),
        onSuccess: async (data) => {
            await setItem('user-data', data);
            backToHome();
        }
    });

    return (
        <>
            {isLoadingLogin && <LoadingOverlay />}

            <View
                style={{
                    flex: 1,
                    backgroundColor: colors.primaryBlue,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    paddingHorizontal: 24
                }}
            >
                <Image
                    source={require('@/assets/images/auth/mail.png')}
                    style={{
                        width: 250,
                        height: 250,
                        resizeMode: 'contain',
                        alignSelf: 'center'
                    }}
                />

                <View
                    style={{
                        backgroundColor: 'white',
                        width: '100%',
                        minHeight: 225,
                        borderRadius: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 40
                    }}
                >
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 16,
                            alignItems: 'center'
                        }}
                    >
                        <CustomText
                            style={{ fontSize: 26, fontFamily: 'Poppins-Bold' }}
                        >
                            Registrasi Sukses
                        </CustomText>
                        <CustomText style={{ fontSize: 15 }}>
                            Selamat! Akun mu telah selesai dibuat
                        </CustomText>
                    </View>

                    <TouchableOpacity
                        style={{
                            backgroundColor: colors.primaryBlue,
                            borderRadius: 20,
                            alignItems: 'center',
                            height: 45,
                            justifyContent: 'center',
                            width: '80%'
                        }}
                        onPress={() =>
                            login({
                                username,
                                password
                            })
                        }
                    >
                        <CustomText
                            type='defaultSemiBold'
                            style={{ color: 'white' }}
                        >
                            GO TO HOMEPAGE
                        </CustomText>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default RegisterFinishScreenComponent;

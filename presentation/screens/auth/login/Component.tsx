import { colors } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import {
    userLoginValidation,
    type UserLoginForm
} from '@/infrastructure/models/auth/login';
import { AuthAPI } from '@/infrastructure/usecase/auth';
import { CustomIcons } from '@/presentation/components/CustomIcons';
import { CustomText } from '@/presentation/components/CustomText';
import { TextInput } from '@/presentation/components/CustomTextInput';
import LoadingOverlay from '@/presentation/components/LoadingOverlay';
import ParallaxScrollView from '@/presentation/components/ParallaxScrollView';
import { setItem } from '@/utils/AsyncStorage';
import { zodResolver } from '@hookform/resolvers/zod';
import type { AxiosError } from 'axios';
import { useNavigation, useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation } from 'react-query';

const LoginScreenComponent = () => {
    const { refetchAuth, http } = useAuth();

    const [error, setError] = useState<string>('');

    const navigation = useNavigation();

    const router = useRouter();

    const backToHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: '(tabs)' as never }]
        });

        refetchAuth();
    };

    const { control, handleSubmit } = useForm<UserLoginForm>({
        defaultValues: { username: '', password: '' },
        resolver: zodResolver(userLoginValidation)
    });

    const useCase = new AuthAPI(http);

    const { mutate: login, isLoading } = useMutation({
        mutationKey: ['login'],
        mutationFn: (data: UserLoginForm) => useCase.login(data),
        onSuccess: async (data) => {
            await setItem('user-data', data);
            backToHome();
        },
        onError: (res: AxiosError<{ message: string }>) => {
            setError(() => res.response?.data.message ?? '');
        }
    });

    return (
        <>
            {isLoading && <LoadingOverlay />}

            <ParallaxScrollView
                headerBackgroundColor={colors.primaryBlue}
                headerContent={
                    <SafeAreaView
                        style={{
                            flex: 1,
                            paddingHorizontal: 24,
                            minWidth: '100%',
                            position: 'relative'
                        }}
                    >
                        <TouchableOpacity
                            style={{ zIndex: 100 }}
                            onPress={backToHome}
                        >
                            <CustomIcons
                                type='ion'
                                name='arrow-back'
                                color='white'
                                size={36}
                            />
                        </TouchableOpacity>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0
                            }}
                        >
                            <Image
                                source={require('@/assets/images/auth/doctor-illustrate.png')}
                                style={{
                                    width: 180,
                                    height: 180,
                                    resizeMode: 'contain'
                                }}
                            />
                        </View>
                    </SafeAreaView>
                }
                headerHeight={225}
                childrenStyle={{
                    borderRadius: 50,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    backgroundColor: 'white'
                }}
                fullHeight
            >
                <View
                    style={{
                        flex: 1,
                        padding: 24,
                        paddingHorizontal: 20,
                        paddingTop: 40,
                        flexDirection: 'column',
                        height: '100%'
                    }}
                >
                    <View
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 8
                        }}
                    >
                        <CustomText
                            style={{ textAlign: 'center' }}
                            type='subtitle'
                        >
                            Welcome
                        </CustomText>
                        <CustomText
                            style={{ textAlign: 'center' }}
                            type='default'
                        >
                            Login untuk melanjutkan
                        </CustomText>
                    </View>

                    <View
                        style={{
                            marginTop: 60,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 24
                        }}
                    >
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 8
                            }}
                        >
                            <CustomText type='small'>
                                Email atau nomor telepon
                            </CustomText>
                            <Controller
                                control={control}
                                name='username'
                                render={({
                                    field: { ref, onChange, ...field },
                                    fieldState: { error }
                                }) => (
                                    <TextInput
                                        {...field}
                                        inputMode='email'
                                        keyboardType='email-address'
                                        style={{
                                            borderColor: '#DADADA',
                                            color: 'black',
                                            height: 45
                                        }}
                                        onChangeText={(text) => onChange(text)}
                                        placeholder='Masukkan email atau nomor telepon'
                                        error={error}
                                    />
                                )}
                            />
                        </View>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 8
                            }}
                        >
                            <CustomText type='small'>Kata Sandi</CustomText>
                            <Controller
                                control={control}
                                name='password'
                                render={({
                                    field: { ref, onChange, ...field },
                                    fieldState: { error }
                                }) => (
                                    <TextInput
                                        {...field}
                                        secureTextEntry
                                        keyboardType='default'
                                        style={{
                                            borderColor: '#DADADA',
                                            color: 'black',
                                            height: 45
                                        }}
                                        placeholder='Masukkan kata sandi'
                                        onChangeText={(text) => onChange(text)}
                                        error={error}
                                    />
                                )}
                            />
                            <TouchableOpacity
                                onPress={() => router.push('/auth/register')}
                            >
                                <CustomText
                                    type='verysmall'
                                    style={{
                                        alignSelf: 'flex-end',
                                        color: colors.primaryBlue
                                    }}
                                >
                                    Belum mempunyai akun?
                                </CustomText>
                            </TouchableOpacity>
                        </View>

                        <CustomText
                            style={{
                                color: '#ef4444',
                                textAlign: 'center'
                            }}
                            type='small'
                        >
                            {error}
                        </CustomText>

                        <TouchableOpacity
                            style={{
                                backgroundColor: colors.primaryBlue,
                                borderRadius: 20,
                                alignItems: 'center',
                                height: 45,
                                justifyContent: 'center'
                            }}
                            onPress={handleSubmit((e) => login(e))}
                        >
                            <CustomText
                                type='defaultSemiBold'
                                style={{ color: 'white' }}
                            >
                                LOGIN
                            </CustomText>
                        </TouchableOpacity>
                    </View>
                </View>
            </ParallaxScrollView>
        </>
    );
};

export default LoginScreenComponent;

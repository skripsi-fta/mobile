import { colors } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import {
    userRegisterValidation,
    type UserRegisterForm
} from '@/infrastructure/models/auth/register';
import { AuthAPI } from '@/infrastructure/usecase/auth';
import { CustomIcons } from '@/presentation/components/CustomIcons';
import { CustomText } from '@/presentation/components/CustomText';
import { TextInput } from '@/presentation/components/CustomTextInput';
import LoadingOverlay from '@/presentation/components/LoadingOverlay';
import ParallaxScrollView from '@/presentation/components/ParallaxScrollView';
import { zodResolver } from '@hookform/resolvers/zod';
import type { AxiosError } from 'axios';
import { useNavigation, useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation } from 'react-query';

const RegisterScreenComponent = () => {
    const { http } = useAuth();

    const [error, setError] = useState<string>('');

    const router = useRouter();

    const { control, handleSubmit, watch } = useForm<UserRegisterForm>({
        defaultValues: { credentials: '', password: '', confirmPassword: '' },
        resolver: zodResolver(userRegisterValidation)
    });

    const password = watch('password');

    const username = watch('credentials');

    const useCase = new AuthAPI(http);

    const { mutate: register, isLoading } = useMutation({
        mutationKey: ['register'],
        mutationFn: (data: UserRegisterForm) => useCase.register(data),
        onSuccess: async () => {
            router.push({
                pathname: '/auth/register/finish',
                params: {
                    username,
                    password
                }
            });
        },
        onError: (res: AxiosError<{ message: string }>) => {
            setError(() => res.response?.data.message ?? '');
        }
    });

    return (
        <>
            {(isLoading || isLoading) && <LoadingOverlay />}

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
                            onPress={() => router.back()}
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
                        flexDirection: 'column'
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
                            Buat akun untuk melanjutkan
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
                                name='credentials'
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
                        </View>

                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 8
                            }}
                        >
                            <CustomText type='small'>
                                Konfirmasi Kata Sandi
                            </CustomText>
                            <Controller
                                control={control}
                                name='confirmPassword'
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
                                        placeholder='Masukkan konfirmasi kata sandi'
                                        onChangeText={(text) => onChange(text)}
                                        error={error}
                                    />
                                )}
                            />
                            <TouchableOpacity onPress={() => router.back()}>
                                <CustomText
                                    type='verysmall'
                                    style={{
                                        alignSelf: 'flex-end',
                                        color: colors.primaryBlue
                                    }}
                                >
                                    Sudah mempunyai akun?
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
                            onPress={handleSubmit((e) => register(e))}
                        >
                            <CustomText
                                type='defaultSemiBold'
                                style={{ color: 'white' }}
                            >
                                REGISTER
                            </CustomText>
                        </TouchableOpacity>
                    </View>
                </View>
            </ParallaxScrollView>
        </>
    );
};

export default RegisterScreenComponent;

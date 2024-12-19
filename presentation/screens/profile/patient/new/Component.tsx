import { CustomIcons } from '@/presentation/components/CustomIcons';
import { CustomText } from '@/presentation/components/CustomText';
import { useNavigation } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import {
    createPatientValidation,
    type CreatePatientValidation
} from '@/infrastructure/models/patient/patient';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { TextInput } from '@/presentation/components/CustomTextInput';
import CustomKeyboardAwareScrollView from '@/presentation/components/CustomKeyboardAwareScrollView';
import CustomDropdownPicker from '@/presentation/components/CustomDropdownPicker';
import { colors } from '@/constants/Colors';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import CustomDatePicker from '@/presentation/components/CustomDatePicker';
import { PatientAPI } from '@/infrastructure/usecase/patient';
import { useMutation } from 'react-query';
import type { AxiosError } from 'axios';
import LoadingOverlay from '@/presentation/components/LoadingOverlay';
import { getItem, setItem } from '@/utils/AsyncStorage';

const NewPatientComponent = () => {
    const { refetchAuth, http } = useAuth();

    const [error, setError] = useState<string>('');

    const navigation = useNavigation();

    const backToHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: '(tabs)' as never }]
        });
    };

    const { control, handleSubmit } = useForm<CreatePatientValidation>({
        defaultValues: {
            nama: '',
            address: '',
            gender: 'MALE',
            dateOfBirth: dayjs().format('YYYY-MM-DD'),
            idNumber: '',
            idType: 'NATIONAL_ID'
        },
        resolver: zodResolver(createPatientValidation)
    });

    const useCase = new PatientAPI(http);

    const { mutate: createPatient, isLoading } = useMutation({
        mutationKey: ['create-patient'],
        mutationFn: (data: CreatePatientValidation) => useCase.create(data),
        onSuccess: async (data) => {
            const patientData = await getItem('user-data');

            await setItem('user-data', {
                ...(patientData as Object),
                user: data.data
            });

            refetchAuth();
            setTimeout(() => {
                backToHome();
            }, 200);
        },
        onError: (res: AxiosError<{ message: string }>) => {
            setError(() => res.response?.data.message ?? '');
        }
    });

    return (
        <>
            {isLoading && <LoadingOverlay />}

            <CustomKeyboardAwareScrollView
                containerStyle={{
                    backgroundColor: 'white'
                }}
            >
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 24,
                        paddingTop: 8,
                        paddingHorizontal: 24,
                        backgroundColor: 'white',
                        paddingBottom: 32
                    }}
                >
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 16,
                            alignItems: 'center'
                        }}
                    >
                        <TouchableOpacity onPress={backToHome}>
                            <CustomIcons
                                type='ion'
                                name='arrow-back'
                                color='black'
                                size={28}
                            />
                        </TouchableOpacity>
                        <CustomText
                            style={{
                                fontFamily: 'Poppins-Medium',
                                fontSize: 20
                            }}
                        >
                            Daftar Pasien Baru
                        </CustomText>
                    </View>
                    <View
                        style={{
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
                            <CustomText type='small'>Nama Pasien</CustomText>
                            <Controller
                                control={control}
                                name='nama'
                                render={({
                                    field: { ref, onChange, ...field },
                                    fieldState: { error }
                                }) => (
                                    <TextInput
                                        {...field}
                                        inputMode='text'
                                        style={{
                                            borderColor: 'black',
                                            color: 'black',
                                            height: 45,
                                            backgroundColor: 'white'
                                        }}
                                        onChangeText={(text) => onChange(text)}
                                        placeholder='Masukkan nama pasien'
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
                            <CustomText type='small'>Tanggal Lahir</CustomText>
                            <Controller
                                control={control}
                                name='dateOfBirth'
                                render={({ field: { onChange, value } }) => (
                                    <CustomDatePicker
                                        onChange={onChange}
                                        date={dayjs(
                                            value,
                                            'YYYY-MM-DD'
                                        ).toDate()}
                                    />
                                )}
                            />
                        </View>
                    </View>

                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 24
                        }}
                    >
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 8,
                                zIndex: 2
                            }}
                        >
                            <CustomText type='small'>Jenis Kelamin</CustomText>
                            <Controller
                                control={control}
                                name='gender'
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error }
                                }) => (
                                    <CustomDropdownPicker
                                        callbackOnChange={onChange}
                                        items={[
                                            {
                                                label: 'Laki - Laki',
                                                value: 'MALE'
                                            },
                                            {
                                                label: 'Perempuan',
                                                value: 'FEMALE'
                                            }
                                        ]}
                                        value={value}
                                        placeHolder='Pilih jenis kelamin'
                                        style={{
                                            borderColor: 'black',
                                            minHeight: 45,
                                            backgroundColor: 'white'
                                        }}
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
                            <CustomText type='small'>Alamat</CustomText>
                            <Controller
                                control={control}
                                name='address'
                                render={({
                                    field: { ref, onChange, ...field },
                                    fieldState: { error }
                                }) => (
                                    <TextInput
                                        {...field}
                                        inputMode='text'
                                        style={{
                                            borderColor: 'black',
                                            color: 'black',
                                            height: 45,
                                            backgroundColor: 'white'
                                        }}
                                        onChangeText={(text) => onChange(text)}
                                        placeholder='Masukkan alamat'
                                        error={error}
                                    />
                                )}
                            />
                        </View>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 8,
                                zIndex: 1
                            }}
                        >
                            <CustomText type='small'>
                                Kartu Identitas
                            </CustomText>
                            <Controller
                                control={control}
                                name='idType'
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error }
                                }) => (
                                    <CustomDropdownPicker
                                        callbackOnChange={onChange}
                                        items={[
                                            {
                                                label: 'Kartu Tanda Penduduk',
                                                value: 'NATIONAL_ID'
                                            },
                                            {
                                                label: 'Paspor',
                                                value: 'PASSPORT'
                                            },
                                            {
                                                label: 'Surat Izin Mengemudi',
                                                value: 'DRIVER_LICENSE'
                                            }
                                        ]}
                                        value={value}
                                        placeHolder='Pilih kartu identitas'
                                        style={{
                                            borderColor: 'black',
                                            minHeight: 45,
                                            backgroundColor: 'white'
                                        }}
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
                                Nomor Kartu Identitas
                            </CustomText>
                            <Controller
                                control={control}
                                name='idNumber'
                                render={({
                                    field: { ref, onChange, ...field },
                                    fieldState: { error }
                                }) => (
                                    <TextInput
                                        {...field}
                                        inputMode='numeric'
                                        style={{
                                            borderColor: 'black',
                                            color: 'black',
                                            height: 45,
                                            backgroundColor: 'white'
                                        }}
                                        onChangeText={(text) => onChange(text)}
                                        placeholder='Masukkan alamat'
                                        error={error}
                                    />
                                )}
                            />
                        </View>

                        {error && (
                            <CustomText
                                style={{
                                    color: '#ef4444',
                                    textAlign: 'center'
                                }}
                                type='small'
                            >
                                {error}
                            </CustomText>
                        )}

                        <TouchableOpacity
                            style={{
                                backgroundColor: colors.primaryBlue,
                                borderRadius: 20,
                                alignItems: 'center',
                                height: 45,
                                justifyContent: 'center'
                            }}
                            onPress={handleSubmit((e) => createPatient(e))}
                        >
                            <CustomText
                                type='defaultSemiBold'
                                style={{ color: 'white' }}
                            >
                                Daftar Pasien Baru
                            </CustomText>
                        </TouchableOpacity>
                    </View>
                </View>
            </CustomKeyboardAwareScrollView>
        </>
    );
};

export default NewPatientComponent;

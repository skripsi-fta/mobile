import { colors } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import {
    checkPatientValidation,
    type CheckPatientValidation
} from '@/infrastructure/models/patient/patient';
import { PatientAPI } from '@/infrastructure/usecase/patient';
import CustomDropdownPicker from '@/presentation/components/CustomDropdownPicker';
import { CustomIcons } from '@/presentation/components/CustomIcons';
import CustomKeyboardAwareScrollView from '@/presentation/components/CustomKeyboardAwareScrollView';
import { CustomText } from '@/presentation/components/CustomText';
import { TextInput } from '@/presentation/components/CustomTextInput';
import LoadingOverlay from '@/presentation/components/LoadingOverlay';
import { genderType, identityType } from '@/shared/constant';
import { getItem, setItem } from '@/utils/AsyncStorage';
import dayjsUtils from '@/utils/dayjs';
import { zodResolver } from '@hookform/resolvers/zod';
import type { AxiosError } from 'axios';
import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';
import { useMutation } from 'react-query';

const LinkPatientComponent = () => {
    const { refetchAuth, http } = useAuth();

    const [error, setError] = useState<string>('');

    const [error2, setError2] = useState<string>('');

    const navigation = useNavigation();

    const backToHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: '(tabs)' as never }]
        });
    };

    const { control, handleSubmit, watch } = useForm<CheckPatientValidation>({
        defaultValues: {
            idNumber: '',
            idType: 'NATIONAL_ID'
        },
        resolver: zodResolver(checkPatientValidation)
    });

    const useCase = new PatientAPI(http);

    const idNumber = watch('idNumber');

    const {
        data,
        mutate: checkPatient,
        isLoading
    } = useMutation({
        mutationKey: ['check-patient', idNumber],
        mutationFn: (data: CheckPatientValidation) => useCase.check(data),
        onSuccess: () => {
            setError(() => '');
            setError2(() => '');
        },
        onError: (res: AxiosError<{ message: string }>) => {
            setError(() => res.response?.data.message ?? '');
        }
    });

    const { mutate: linkPatient, isLoading: isLoadingLinkPatient } =
        useMutation({
            mutationKey: ['link-patient', idNumber],
            mutationFn: (data: CheckPatientValidation) => useCase.link(data),
            onSuccess: async (data) => {
                setError(() => '');
                setError2(() => '');

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
                setError2(() => res.response?.data.message ?? '');
            }
        });

    return (
        <>
            {(isLoading || isLoadingLinkPatient) && <LoadingOverlay />}

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
                            Kaitkan Pasien
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
                            onPress={handleSubmit((e) => checkPatient(e))}
                        >
                            <CustomText
                                type='defaultSemiBold'
                                style={{ color: 'white' }}
                            >
                                Cek Pasien
                            </CustomText>
                        </TouchableOpacity>

                        {data && (
                            <>
                                <CustomText
                                    type='subtitle'
                                    style={{ textAlign: 'center' }}
                                >
                                    Pasien Ditemukan
                                </CustomText>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}
                                >
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 4,
                                            flex: 1
                                        }}
                                    >
                                        <CustomText type='defaultSemiBold'>
                                            Nama
                                        </CustomText>
                                        <CustomText>
                                            {data.data.name}
                                        </CustomText>
                                    </View>

                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 4,
                                            flex: 1
                                        }}
                                    >
                                        <CustomText type='defaultSemiBold'>
                                            Jenis Kelamin
                                        </CustomText>
                                        <CustomText>
                                            {genderType[data.data.gender]}
                                        </CustomText>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}
                                >
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 4,
                                            flex: 1
                                        }}
                                    >
                                        <CustomText type='defaultSemiBold'>
                                            Tanggal Lahir
                                        </CustomText>
                                        <CustomText>
                                            {dayjsUtils(
                                                data.data.dateOfBirth,
                                                'YYYY-MM-DD'
                                            ).format('DD MMMM YYYY')}
                                        </CustomText>
                                    </View>

                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 4,
                                            flex: 1
                                        }}
                                    >
                                        <CustomText type='defaultSemiBold'>
                                            Alamat
                                        </CustomText>
                                        <CustomText>
                                            {data.data.address}
                                        </CustomText>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}
                                >
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 4,
                                            flex: 1
                                        }}
                                    >
                                        <CustomText type='defaultSemiBold'>
                                            Kartu Identitas
                                        </CustomText>
                                        <CustomText>
                                            {identityType[data.data.idType]}
                                        </CustomText>
                                    </View>

                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 4,
                                            flex: 1
                                        }}
                                    >
                                        <CustomText type='defaultSemiBold'>
                                            Nomor Kartu Identitas
                                        </CustomText>
                                        <CustomText>
                                            {data.data.idNumber}
                                        </CustomText>
                                    </View>
                                </View>

                                {error2 && (
                                    <CustomText
                                        style={{
                                            color: '#ef4444',
                                            textAlign: 'center'
                                        }}
                                        type='small'
                                    >
                                        {error2}
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
                                    onPress={handleSubmit((e) =>
                                        linkPatient(e)
                                    )}
                                >
                                    <CustomText
                                        type='defaultSemiBold'
                                        style={{ color: 'white' }}
                                    >
                                        Kaitkan Pasien
                                    </CustomText>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </CustomKeyboardAwareScrollView>
        </>
    );
};

export default LinkPatientComponent;

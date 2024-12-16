import { colors } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import type { DoctorModel } from '@/infrastructure/models/doctor/doctor';
import type { ScheduleModel } from '@/infrastructure/models/schedule/schedule';
import { AppointmentAPI } from '@/infrastructure/usecase/appointment';
import BackHeader from '@/presentation/components/BackHeader';
import CustomKeyboardAwareScrollView from '@/presentation/components/CustomKeyboardAwareScrollView';
import { CustomText } from '@/presentation/components/CustomText';
import LoadingOverlay from '@/presentation/components/LoadingOverlay';
import { useModal } from '@/providers/ModalProvider';
import dayjsUtils from '@/utils/dayjs';
import type { AxiosError } from 'axios';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useMutation } from 'react-query';
import SuccessModal from './Components/SuccessModal';

const DokterPageBookComponent = () => {
    const { doctorDataString, scheduleDataString } =
        useLocalSearchParams() as unknown as {
            scheduleDataString: string;
            doctorDataString: string;
        };

    const doctorData = doctorDataString
        ? (JSON.parse(doctorDataString) as DoctorModel.Response.Data)
        : null;

    const scheduleData = scheduleDataString
        ? (JSON.parse(scheduleDataString) as ScheduleModel.Response.Data)
        : null;

    if (!doctorData || !scheduleData) {
        return <Redirect href={'/+not-found'} />;
    }

    const { user, http } = useAuth();

    const appointmentAPI = new AppointmentAPI(http);

    const [error, setError] = useState<string>('');

    const { mutate: bookSchedule, isLoading } = useMutation({
        mutationFn: () =>
            appointmentAPI.create({ scheduleId: scheduleData.id }),
        onSuccess: (data) => {
            openModal(<SuccessModal appointmentId={data.data.id} />, {
                disableClickOutside: true
            });

            setError(() => '');
        },
        onError: (res: AxiosError<{ message: string }>) => {
            setError(() => res.response?.data.message ?? '');
        }
    });

    const { openModal } = useModal();

    return (
        <>
            {isLoading ? (
                <LoadingOverlay />
            ) : (
                <>
                    <CustomKeyboardAwareScrollView
                        containerStyle={{ backgroundColor: 'white' }}
                    >
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                paddingTop: 8,
                                paddingHorizontal: 24,
                                backgroundColor: 'white',
                                paddingBottom: 32
                            }}
                        >
                            <BackHeader title='Periksa Janji Temu' />

                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    marginTop: 4,
                                    gap: 12
                                }}
                            >
                                <CustomText
                                    style={{
                                        fontFamily: 'Poppins-SemiBold',
                                        fontSize: 18
                                    }}
                                >
                                    Informasi Pasien
                                </CustomText>

                                <View
                                    style={{
                                        backgroundColor: 'white',
                                        borderRadius: 10,
                                        width: '100%',
                                        shadowColor: '#000000',
                                        shadowOffset: { width: 0, height: 1 },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 4,
                                        elevation: 5,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        padding: 16,
                                        gap: 8
                                    }}
                                >
                                    <CustomText
                                        style={{
                                            fontFamily: 'Poppins-SemiBold',
                                            fontSize: 15
                                        }}
                                    >
                                        {user?.user.patient?.name}
                                    </CustomText>
                                    <CustomText style={{ fontSize: 15 }}>
                                        {dayjsUtils(
                                            user?.user.patient?.dateOfBirth,
                                            'YYYY-MM-DD'
                                        ).format('DD MMMM YYYY')}
                                    </CustomText>
                                    <CustomText style={{ fontSize: 15 }}>
                                        {user?.user.email ??
                                            user?.user.phoneNumber}
                                    </CustomText>
                                </View>

                                <CustomText
                                    style={{
                                        fontFamily: 'Poppins-SemiBold',
                                        fontSize: 18,
                                        marginTop: 16
                                    }}
                                >
                                    Informasi Janji Temu
                                </CustomText>

                                <View
                                    style={{
                                        backgroundColor: 'white',
                                        borderRadius: 10,
                                        width: '100%',
                                        shadowColor: '#000000',
                                        shadowOffset: { width: 0, height: 1 },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 4,
                                        elevation: 5,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        padding: 16,
                                        gap: 18
                                    }}
                                >
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 4
                                        }}
                                    >
                                        <CustomText
                                            style={{
                                                fontFamily: 'Poppins-SemiBold',
                                                fontSize: 15
                                            }}
                                        >
                                            Dokter
                                        </CustomText>
                                        <CustomText style={{ fontSize: 15 }}>
                                            {doctorData.name}
                                        </CustomText>
                                    </View>
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 4
                                        }}
                                    >
                                        <CustomText
                                            style={{
                                                fontFamily: 'Poppins-SemiBold',
                                                fontSize: 15
                                            }}
                                        >
                                            Spesialis
                                        </CustomText>
                                        <CustomText style={{ fontSize: 15 }}>
                                            {doctorData.namaSpesialisasi}
                                        </CustomText>
                                    </View>

                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 4
                                        }}
                                    >
                                        <CustomText
                                            style={{
                                                fontFamily: 'Poppins-SemiBold',
                                                fontSize: 15
                                            }}
                                        >
                                            Tanggal
                                        </CustomText>
                                        <CustomText style={{ fontSize: 15 }}>
                                            {dayjsUtils(
                                                scheduleData.date,
                                                'YYYY-MM-DD'
                                            ).format('dddd, DD MMMM YYYY')}
                                        </CustomText>
                                    </View>

                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 4
                                        }}
                                    >
                                        <CustomText
                                            style={{
                                                fontFamily: 'Poppins-SemiBold',
                                                fontSize: 15
                                            }}
                                        >
                                            Waktu
                                        </CustomText>
                                        <CustomText style={{ fontSize: 15 }}>
                                            {scheduleData.startTime} -{' '}
                                            {scheduleData.endTime}
                                        </CustomText>
                                    </View>
                                </View>
                            </View>

                            {error && (
                                <CustomText
                                    style={{
                                        color: '#ef4444',
                                        textAlign: 'center',
                                        marginTop: 32
                                    }}
                                    type='small'
                                >
                                    {error}
                                </CustomText>
                            )}

                            <TouchableOpacity
                                style={{
                                    borderColor: colors.primaryBlue,
                                    backgroundColor: 'white',
                                    borderRadius: 20,
                                    alignItems: 'center',
                                    height: 50,
                                    justifyContent: 'center',
                                    flex: 1,
                                    borderWidth: 1,
                                    marginTop: 32
                                }}
                                onPress={() => {
                                    bookSchedule();
                                }}
                            >
                                <CustomText
                                    style={{ color: colors.primaryBlue }}
                                >
                                    BUAT PESANAN
                                </CustomText>
                            </TouchableOpacity>
                        </View>
                    </CustomKeyboardAwareScrollView>
                </>
            )}
        </>
    );
};

export default DokterPageBookComponent;

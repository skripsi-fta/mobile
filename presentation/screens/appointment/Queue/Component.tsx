import { colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { AppointmentAPI } from '@/infrastructure/usecase/appointment';
import BackHeader from '@/presentation/components/BackHeader';
import CustomKeyboardAwareScrollView from '@/presentation/components/CustomKeyboardAwareScrollView';
import { CustomText } from '@/presentation/components/CustomText';
import LoadingOverlay from '@/presentation/components/LoadingOverlay';
import dayjsUtils from '@/utils/dayjs';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { useQuery } from 'react-query';

const QueueAppointmentComponent = () => {
    const { appointmentId } = useLocalSearchParams() as unknown as {
        appointmentId: string;
    };

    if (!appointmentId) {
        return <Redirect href={'/+not-found'} />;
    }

    const router = useRouter();

    const { http, user } = useAuth();

    const appointmentAPI = new AppointmentAPI(http);

    const {
        data: appointmentData,
        isLoading,
        isError,
        refetch
    } = useQuery({
        queryKey: ['appointment-detail-queue', appointmentId],
        queryFn: () =>
            appointmentAPI.getQueue({ appointmentId: Number(appointmentId) })
    });

    if (isError) {
        return <Redirect href={'/+not-found'} />;
    }

    const [refreshing, setRefreshing] = useState<boolean>(false);

    const onRefresh = async () => {
        setRefreshing(() => true);

        await refetch();

        setRefreshing(() => false);
    };

    const getStateAntrian = () => {
        if (appointmentData?.detailAppointment.status === 'checkin') {
            return 'Rekam Medis';
        } else if (
            appointmentData?.detailAppointment.status === 'doctor queue'
        ) {
            return 'Dokter';
        } else if (
            appointmentData?.detailAppointment.status === 'pharmacy queue'
        ) {
            return 'Farmasi';
        } else if (
            appointmentData?.detailAppointment.status === 'cashier queue'
        ) {
            return 'Kasir';
        }
    };

    const getStateAntrianNumber = () => {
        if (appointmentData?.detailAppointment.status === 'checkin') {
            return appointmentData.detailAppointment.globalQueueNumber;
        } else if (
            appointmentData?.detailAppointment.status === 'doctor queue'
        ) {
            return appointmentData.detailAppointment.doctorQueueNumber;
        } else if (
            appointmentData?.detailAppointment.status === 'pharmacy queue'
        ) {
            return appointmentData.detailAppointment.pharmacyQueueNumber;
        } else if (
            appointmentData?.detailAppointment.status === 'cashier queue'
        ) {
            return appointmentData.detailAppointment.cashierQueueNumber;
        }
    };

    const getCurrentAntrian = () => {
        if (appointmentData?.detailAppointment.status === 'checkin') {
            return appointmentData.globalQueue;
        } else if (
            appointmentData?.detailAppointment.status === 'doctor queue'
        ) {
            return appointmentData.doctorQueue;
        } else if (
            appointmentData?.detailAppointment.status === 'pharmacy queue'
        ) {
            return appointmentData.pharmacyQueue;
        } else if (
            appointmentData?.detailAppointment.status === 'cashier queue'
        ) {
            return appointmentData.cashierQueue;
        }
    };

    return (
        <>
            {isLoading ? (
                <LoadingOverlay />
            ) : (
                <CustomKeyboardAwareScrollView
                    containerStyle={{
                        backgroundColor: 'white',
                        position: 'relative'
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            paddingHorizontal: 24,
                            backgroundColor: 'white',
                            paddingTop: 8,
                            paddingBottom: 32
                        }}
                    >
                        <BackHeader title='Detail Antrian' />

                        <View
                            style={{
                                backgroundColor: 'white',
                                borderRadius: 20,
                                width: '100%',
                                shadowColor: '#000000',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 5,
                                display: 'flex',
                                flexDirection: 'column',
                                padding: 16
                            }}
                        >
                            <CustomText
                                style={{
                                    fontFamily: 'Poppins-SemiBold',
                                    fontSize: 18
                                }}
                            >
                                {user?.user.patient?.name}
                            </CustomText>

                            <CustomText
                                style={{
                                    fontFamily: 'Poppins-SemiBold',
                                    fontSize: 22,
                                    marginVertical: 4,
                                    marginTop: 8
                                }}
                            >
                                Antrian anda adalah {getStateAntrianNumber()}
                            </CustomText>

                            <CustomText style={{ fontSize: 14 }}>
                                Anda berada di antrian {getStateAntrian()}
                            </CustomText>
                            <View
                                style={{
                                    marginTop: 16,
                                    flexDirection: 'column',
                                    display: 'flex',
                                    gap: 4
                                }}
                            >
                                <CustomText
                                    style={{
                                        fontSize: 14,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                >
                                    {
                                        appointmentData?.detailAppointment
                                            .doctorName
                                    }
                                </CustomText>

                                <CustomText
                                    style={{
                                        fontSize: 14,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                >
                                    {
                                        appointmentData?.detailAppointment
                                            .spesialisasiName
                                    }
                                </CustomText>

                                <CustomText style={{ fontSize: 14 }}>
                                    {
                                        appointmentData?.detailAppointment
                                            .roomName
                                    }
                                </CustomText>

                                <CustomText
                                    style={{
                                        fontSize: 14,
                                        fontFamily: 'Poppins-Medium',
                                        color: '#717173',
                                        marginTop: 8
                                    }}
                                >
                                    {dayjsUtils(
                                        appointmentData?.detailAppointment
                                            ?.scheduleDate,
                                        'YYYY-MM-DD'
                                    ).format('dddd, D MMMM YYYY')}
                                    {'  '}
                                    {
                                        appointmentData?.detailAppointment
                                            ?.startTime
                                    }{' '}
                                    -{' '}
                                    {
                                        appointmentData?.detailAppointment
                                            ?.endTime
                                    }
                                </CustomText>
                            </View>
                        </View>

                        <View
                            style={{
                                backgroundColor: 'white',
                                borderRadius: 20,
                                width: '100%',
                                shadowColor: '#000000',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 5,
                                display: 'flex',
                                flexDirection: 'column',
                                padding: 16,
                                paddingTop: 16,
                                paddingBottom: 16,
                                marginTop: 36
                            }}
                        >
                            <CustomText
                                style={{
                                    fontFamily: 'Poppins-SemiBold',
                                    fontSize: 18
                                }}
                            >
                                Antrian {getStateAntrian()} Sekarang
                            </CustomText>

                            <View
                                style={{
                                    marginHorizontal: 'auto',
                                    marginTop: 8
                                }}
                            >
                                <CustomText
                                    style={{
                                        color: colors.primaryBlue,
                                        fontFamily: 'Poppins-Bold',
                                        fontSize: 48
                                    }}
                                >
                                    {getCurrentAntrian()
                                        ? getCurrentAntrian()?.queueNumber
                                        : '--'}
                                </CustomText>
                            </View>
                        </View>
                    </View>
                </CustomKeyboardAwareScrollView>
            )}
        </>
    );
};

export default QueueAppointmentComponent;

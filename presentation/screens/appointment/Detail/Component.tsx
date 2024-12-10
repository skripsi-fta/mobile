import { colors } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import { AppointmentAPI } from '@/infrastructure/usecase/appointment';
import BackHeader from '@/presentation/components/BackHeader';
import { CustomIcons } from '@/presentation/components/CustomIcons';
import CustomKeyboardAwareScrollView from '@/presentation/components/CustomKeyboardAwareScrollView';
import { CustomText } from '@/presentation/components/CustomText';
import LoadingOverlay from '@/presentation/components/LoadingOverlay';
import dayjsUtils from '@/utils/dayjs';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { RefreshControl, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useQuery } from 'react-query';

const DetailAppointmentComponent = () => {
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
        queryKey: ['appointment-detail', appointmentId],
        queryFn: () =>
            appointmentAPI.getDetail({ appointmentId: Number(appointmentId) })
    });

    if (isError) {
        return <Redirect href={'/+not-found'} />;
    }

    const isAppointmentCanceled = Boolean(appointmentData?.status === 'cancel');

    const needCheckIn = Boolean(!appointmentData?.checkedIn);

    const canSeeQueue = Boolean(
        appointmentData?.status.includes('queue') ||
            appointmentData?.status === 'checkin'
    );

    const canSeeHistory = Boolean(appointmentData?.status === 'done');

    const [refreshing, setRefreshing] = useState<boolean>(false);

    const onRefresh = async () => {
        setRefreshing(() => true);

        await refetch();

        setRefreshing(() => false);
    };

    return (
        <>
            {isLoading ? (
                <LoadingOverlay />
            ) : (
                <CustomKeyboardAwareScrollView
                    containerStyle={{ backgroundColor: 'white' }}
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
                        <BackHeader title='Detail Janji Temu' />

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
                                paddingVertical: 16,
                                gap: 16
                            }}
                        >
                            <CustomText
                                style={{
                                    fontFamily: 'Poppins-SemiBold',
                                    fontSize: 18,
                                    paddingHorizontal: 16
                                }}
                            >
                                Informasi Janji Temu
                            </CustomText>

                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '100%',
                                    borderBottomWidth: 1,
                                    borderBottomColor: 'rgba(239,240,249,1)',
                                    paddingHorizontal: 16,
                                    alignItems: 'center',
                                    gap: 16,
                                    paddingBottom: 16
                                }}
                            >
                                <CustomIcons
                                    type='ion'
                                    name='person-sharp'
                                    size={36}
                                />

                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        gap: 8
                                    }}
                                >
                                    <CustomText style={{ fontSize: 13 }}>
                                        {user?.user.patient?.name}
                                    </CustomText>
                                    <CustomText style={{ fontSize: 13 }}>
                                        {user?.user.email
                                            ? user.user.email
                                            : user?.user.phoneNumber}
                                    </CustomText>
                                </View>
                            </View>

                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '100%',
                                    borderBottomWidth: 1,
                                    borderBottomColor: 'rgba(239,240,249,1)',
                                    paddingHorizontal: 16,
                                    alignItems: 'center',
                                    gap: 16,
                                    paddingBottom: 16,
                                    paddingLeft: 18
                                }}
                            >
                                <CustomIcons
                                    type='awesome6'
                                    name='user-doctor'
                                    size={36}
                                />

                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        gap: 8
                                    }}
                                >
                                    <CustomText style={{ fontSize: 13 }}>
                                        {appointmentData?.doctorName}
                                    </CustomText>
                                    <CustomText style={{ fontSize: 13 }}>
                                        {appointmentData?.spesialisasiName}
                                    </CustomText>
                                </View>
                            </View>

                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '100%',
                                    borderBottomWidth: 1,
                                    borderBottomColor: 'rgba(239,240,249,1)',
                                    paddingHorizontal: 16,
                                    alignItems: 'center',
                                    gap: 16,
                                    paddingBottom: 16
                                }}
                            >
                                <CustomIcons
                                    type='entypo'
                                    name='calendar'
                                    size={36}
                                />

                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        gap: 8
                                    }}
                                >
                                    <CustomText style={{ fontSize: 13 }}>
                                        {dayjsUtils(
                                            appointmentData?.scheduleDate,
                                            'YYYY-MM-DD'
                                        ).format('dddd, D MMMM YYYY')}
                                    </CustomText>
                                    <CustomText style={{ fontSize: 13 }}>
                                        {appointmentData?.startTime} -{' '}
                                        {appointmentData?.endTime}
                                    </CustomText>
                                </View>
                            </View>

                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '100%',
                                    paddingHorizontal: 16,
                                    alignItems: 'center',
                                    gap: 16,
                                    paddingBottom: 8
                                }}
                            >
                                <CustomIcons
                                    type='entypo'
                                    name='location'
                                    size={36}
                                />

                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: 8
                                    }}
                                >
                                    <CustomText style={{ fontSize: 13 }}>
                                        {appointmentData?.roomName}
                                    </CustomText>
                                </View>
                            </View>
                        </View>

                        {isAppointmentCanceled ? (
                            <CustomText
                                style={{
                                    fontSize: 16,
                                    color: 'red',
                                    textAlign: 'center',
                                    marginTop: 24
                                }}
                            >
                                Janji temu dibatalkan karena adanya perpindahan
                                jadwal. Silahkan cek janji temu kembali dengan
                                jadwal yang baru.
                            </CustomText>
                        ) : (
                            <>
                                {needCheckIn && (
                                    <View
                                        style={{
                                            backgroundColor: 'white',
                                            borderRadius: 10,
                                            width: '100%',
                                            shadowColor: '#000000',
                                            shadowOffset: {
                                                width: 0,
                                                height: 1
                                            },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 4,
                                            elevation: 5,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            paddingVertical: 16,
                                            paddingHorizontal: 16,
                                            gap: 16,
                                            marginTop: 32
                                        }}
                                    >
                                        <CustomText
                                            style={{
                                                fontFamily: 'Poppins-SemiBold',
                                                fontSize: 18
                                            }}
                                        >
                                            Tiket Janji Temu
                                        </CustomText>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <CustomText
                                                style={{ fontSize: 13 }}
                                            >
                                                Kode Booking
                                            </CustomText>
                                            <CustomText
                                                style={{ fontSize: 13 }}
                                            >
                                                {' '}
                                                {appointmentData?.bookingCode}
                                            </CustomText>
                                        </View>

                                        <View style={{ alignSelf: 'center' }}>
                                            <QRCode
                                                value={
                                                    appointmentData?.bookingCode
                                                }
                                                size={100}
                                            />
                                        </View>

                                        <CustomText
                                            style={{
                                                fontSize: 13,
                                                textAlign: 'center'
                                            }}
                                        >
                                            Scan QR Code di klinik saat
                                            melakukan check-in
                                        </CustomText>

                                        <CustomText
                                            style={{
                                                fontSize: 11,
                                                textAlign: 'center',
                                                color: 'red',
                                                fontFamily: 'Poppins-SemiBold'
                                            }}
                                        >
                                            Mohon hadir tepat waktu pada jadwal
                                            yang ditentukan
                                        </CustomText>
                                    </View>
                                )}
                            </>
                        )}

                        {canSeeQueue && (
                            <TouchableOpacity
                                style={{
                                    borderRadius: 20,
                                    backgroundColor: colors.primaryBlue,

                                    alignItems: 'center',
                                    height: 50,
                                    justifyContent: 'center',
                                    flex: 1,
                                    marginTop: 32
                                }}
                                onPress={() => {
                                    router.push({
                                        pathname: '/appointment/detail/queue',
                                        params: { appointmentId }
                                    });
                                }}
                            >
                                <CustomText
                                    style={{
                                        color: 'white',
                                        fontFamily: 'Poppins-SemiBold'
                                    }}
                                >
                                    LIHAT ANTRIAN
                                </CustomText>
                            </TouchableOpacity>
                        )}

                        {canSeeHistory && (
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: 10,
                                    width: '100%',
                                    shadowColor: '#000000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 1
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                    elevation: 5,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    paddingVertical: 16,
                                    paddingHorizontal: 16,
                                    gap: 16,
                                    marginTop: 32
                                }}
                            >
                                <CustomText
                                    style={{
                                        fontFamily: 'Poppins-SemiBold',
                                        fontSize: 18
                                    }}
                                >
                                    Histori Pemeriksaan
                                </CustomText>

                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 8,
                                        marginBottom: 8
                                    }}
                                >
                                    <CustomText
                                        style={{
                                            fontFamily: 'Poppins-SemiBold',
                                            fontSize: 15
                                        }}
                                    >
                                        Catatan Dokter
                                    </CustomText>
                                    <CustomText
                                        style={{
                                            fontSize: 13
                                        }}
                                    >
                                        {appointmentData?.notesDoctor}
                                    </CustomText>
                                </View>

                                {appointmentData?.prescription.length !== 0 && (
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 8
                                        }}
                                    >
                                        <CustomText
                                            style={{
                                                fontFamily: 'Poppins-SemiBold',
                                                fontSize: 15
                                            }}
                                        >
                                            Obat
                                        </CustomText>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 6
                                            }}
                                        >
                                            {appointmentData?.prescription.map(
                                                (d) => (
                                                    <CustomText
                                                        style={{
                                                            fontSize: 13
                                                        }}
                                                        key={d}
                                                    >
                                                        {d}
                                                    </CustomText>
                                                )
                                            )}
                                        </View>
                                    </View>
                                )}
                            </View>
                        )}
                    </View>
                </CustomKeyboardAwareScrollView>
            )}
        </>
    );
};

export default DetailAppointmentComponent;

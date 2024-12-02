import { colors } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import type { DoctorModel } from '@/infrastructure/models/doctor/doctor';
import { DoctorAPI } from '@/infrastructure/usecase/doctor';
import BackHeader from '@/presentation/components/BackHeader';
import CustomImage from '@/presentation/components/CustomImage';
import CustomKeyboardAwareScrollView from '@/presentation/components/CustomKeyboardAwareScrollView';
import { CustomText } from '@/presentation/components/CustomText';
import LoadingOverlay from '@/presentation/components/LoadingOverlay';
import { formatNumberTotalPasien } from '@/presentation/components/doctor/DoctorItem';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { useQuery } from 'react-query';

const DokterPageComponent = () => {
    const { data } = useLocalSearchParams() as unknown as {
        data: string;
    };

    const doctorData = data
        ? (JSON.parse(data) as DoctorModel.Response.Data)
        : null;

    if (!doctorData) {
        return <Redirect href={'/+not-found'} />;
    }

    const { http } = useAuth();

    const doctorAPI = new DoctorAPI(http);

    const { data: detailData, isLoading } = useQuery({
        queryKey: ['doctor-detail', doctorData.id],
        queryFn: () => doctorAPI.detail({ doctorId: doctorData.id })
    });

    const mappingDay = [
        'SENIN',
        'SELASA',
        'RABU',
        'KAMIS',
        'JUMAT',
        'SABTU',
        'MINGGU'
    ];

    const noRepetitiveSchedule = Boolean(
        Object.keys(detailData?.scheduleData ?? {}).length === 0
    );

    const router = useRouter();

    return (
        <>
            {isLoading ? (
                <LoadingOverlay />
            ) : (
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
                        <BackHeader title='Dokter' />

                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginTop: 4,
                                gap: 16
                            }}
                        >
                            <View
                                style={{
                                    borderRadius: 20,
                                    shadowColor: '#000000',
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                    elevation: 5,
                                    backgroundColor: 'white'
                                }}
                            >
                                <CustomImage
                                    source={{
                                        uri: `${process.env.EXPO_PUBLIC_API_URL}/storage?path=${detailData?.doctorData.photoPath}`
                                    }}
                                    height={300}
                                    width={'100%'}
                                    style={{
                                        borderTopLeftRadius: 20,
                                        borderTopRightRadius: 20
                                    }}
                                />
                                <View
                                    style={{
                                        width: '100%',
                                        padding: 16,
                                        gap: 6
                                    }}
                                >
                                    <CustomText
                                        style={{
                                            fontFamily: 'Poppins-SemiBold',
                                            fontSize: 20
                                        }}
                                    >
                                        {detailData?.doctorData.name}
                                    </CustomText>
                                    <CustomText style={{ fontSize: 16 }}>
                                        Dokter Spesialis{' '}
                                        {
                                            detailData?.doctorData
                                                .namaSpesialisasi
                                        }
                                    </CustomText>
                                    <CustomText
                                        style={{
                                            fontSize: 14,
                                            color: '#888888'
                                        }}
                                    >
                                        {formatNumberTotalPasien(
                                            detailData?.doctorData
                                                .totalPasien as number
                                        )}{' '}
                                        pasien | {detailData?.doctorData.rating}{' '}
                                        Rating
                                    </CustomText>
                                </View>
                            </View>
                            {!noRepetitiveSchedule && (
                                <View
                                    style={{
                                        borderRadius: 20,
                                        shadowColor: '#000000',
                                        shadowOffset: { width: 0, height: 1 },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 4,
                                        elevation: 5,
                                        backgroundColor: 'white',
                                        width: '100%',
                                        padding: 16,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 8
                                    }}
                                >
                                    <CustomText
                                        style={{
                                            fontFamily: 'Poppins-SemiBold',
                                            fontSize: 20
                                        }}
                                    >
                                        Jadwal
                                    </CustomText>
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 12
                                        }}
                                    >
                                        {mappingDay.map((d) => {
                                            const scheduleData =
                                                detailData?.scheduleData[d];

                                            if (scheduleData) {
                                                return (
                                                    <View
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection:
                                                                'row',
                                                            justifyContent:
                                                                'space-between'
                                                        }}
                                                        key={d}
                                                    >
                                                        <CustomText
                                                            style={{
                                                                fontSize: 16,
                                                                textTransform:
                                                                    'capitalize'
                                                            }}
                                                        >
                                                            {d.toLowerCase()}
                                                        </CustomText>

                                                        <View
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection:
                                                                    'column',
                                                                gap: 4
                                                            }}
                                                        >
                                                            {scheduleData.map(
                                                                (
                                                                    data,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <CustomText
                                                                            key={`${index}${d}`}
                                                                        >
                                                                            {
                                                                                data.startTime
                                                                            }{' '}
                                                                            -{' '}
                                                                            {
                                                                                data.endTime
                                                                            }
                                                                        </CustomText>
                                                                    );
                                                                }
                                                            )}
                                                        </View>
                                                    </View>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </View>
                                </View>
                            )}

                            <TouchableOpacity
                                style={{
                                    backgroundColor: colors.primaryBlue,
                                    borderRadius: 20,
                                    alignItems: 'center',
                                    height: 50,
                                    justifyContent: 'center',
                                    marginTop: 24
                                }}
                                onPress={() => {
                                    router.push({
                                        pathname: '/search/dokter/jadwal',
                                        params: {
                                            data: JSON.stringify(doctorData)
                                        }
                                    });
                                }}
                            >
                                <CustomText
                                    type='defaultSemiBold'
                                    style={{ color: 'white' }}
                                >
                                    BUAT PESANAN
                                </CustomText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </CustomKeyboardAwareScrollView>
            )}
        </>
    );
};

export default DokterPageComponent;

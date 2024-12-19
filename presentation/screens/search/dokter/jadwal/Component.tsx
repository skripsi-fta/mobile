import { colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import type { DoctorModel } from '@/infrastructure/models/doctor/doctor';
import { DoctorAPI } from '@/infrastructure/usecase/doctor';
import BackHeader from '@/presentation/components/BackHeader';
import CustomCalendar from '@/presentation/components/CustomCalendar';
import CustomImage from '@/presentation/components/CustomImage';
import CustomKeyboardAwareScrollView from '@/presentation/components/CustomKeyboardAwareScrollView';
import { CustomText } from '@/presentation/components/CustomText';
import LoadingOverlay from '@/presentation/components/LoadingOverlay';
import dayjsUtils from '@/utils/dayjs';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import type { DateData } from 'react-native-calendars';
import { useQuery } from 'react-query';

const DokterPageJadwalComponent = () => {
    const { data } = useLocalSearchParams() as unknown as {
        data: string;
    };

    const doctorData = data
        ? (JSON.parse(data) as DoctorModel.Response.Data)
        : null;

    if (!doctorData) {
        return <Redirect href={'/+not-found'} />;
    }

    const [selectedDate, setSelectedDate] = useState<string>(
        dayjsUtils().format('YYYY-MM-DD')
    );

    const onDayPress = useCallback((day: DateData) => {
        setSelectedDate(() => day.dateString);
    }, []);

    const { http, isAuthenticated } = useAuth();

    const doctorAPI = new DoctorAPI(http);

    const { data: scheduleData, isLoading } = useQuery({
        queryKey: [
            'doctor-schedule',
            doctorData.id,
            dayjsUtils(selectedDate, 'YYYY-MM-DD').month(),
            dayjsUtils(selectedDate, 'YYYY-MM-DD').year()
        ],
        queryFn: () =>
            doctorAPI.getSchedule({
                doctorId: doctorData.id,
                monthNumber: dayjsUtils(selectedDate, 'YYYY-MM-DD').month(),
                yearNumber: dayjsUtils(selectedDate, 'YYYY-MM-DD').year()
            })
    });

    const router = useRouter();

    const dotsData = useMemo(() => {
        return Object.keys(scheduleData ?? {}).reduce(
            (
                acc: {
                    [key: string]: {
                        dots: {
                            key: string;
                            color: string;
                            selectedDotColor: string;
                        }[];
                    };
                },
                d
            ) => {
                if (scheduleData?.[d]) {
                    acc[d] = { dots: scheduleData[d].dots };
                }
                return acc;
            },
            {}
        );
    }, [scheduleData]);

    const selectedScheduleDetailData = scheduleData
        ? scheduleData[selectedDate]?.data ?? null
        : undefined;

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
                        <BackHeader title='Pendaftaran Layanan' />

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
                                    fontSize: 20,
                                    textAlign: 'center'
                                }}
                            >
                                Pilih Tanggal
                            </CustomText>

                            <CustomCalendar
                                enableSwipeMonths
                                current={selectedDate}
                                minDate={dayjsUtils().format('YYYY-MM-DD')}
                                onDayPress={onDayPress}
                                markingType={'multi-dot'}
                                markedDates={{
                                    ...dotsData,
                                    [selectedDate]: {
                                        selected: true,
                                        selectedColor: '#0C41FF',
                                        selectedTextColor: 'white',
                                        ...(dotsData[selectedDate]?.dots
                                            ? {
                                                  dots: dotsData[selectedDate]
                                                      .dots
                                              }
                                            : {})
                                    }
                                }}
                                onMonthChange={onDayPress}
                            />

                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    paddingHorizontal: 20,
                                    gap: 8
                                }}
                            >
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: 8,
                                        alignItems: 'center'
                                    }}
                                >
                                    <View
                                        style={{
                                            height: 15,
                                            width: 15,
                                            borderRadius: 7.5,
                                            backgroundColor: '#000000'
                                        }}
                                    />
                                    <CustomText style={{ fontSize: 13 }}>
                                        Tersedia
                                    </CustomText>
                                </View>

                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: 8,
                                        alignItems: 'center'
                                    }}
                                >
                                    <View
                                        style={{
                                            height: 15,
                                            width: 15,
                                            borderRadius: 7.5,
                                            backgroundColor: '#FF872E'
                                        }}
                                    />
                                    <CustomText style={{ fontSize: 13 }}>
                                        Hampir Penuh
                                    </CustomText>
                                </View>

                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: 8,
                                        alignItems: 'center'
                                    }}
                                >
                                    <View
                                        style={{
                                            height: 15,
                                            width: 15,
                                            borderRadius: 7.5,
                                            backgroundColor: '#FF1F00'
                                        }}
                                    />
                                    <CustomText style={{ fontSize: 13 }}>
                                        Tidak Tersedia
                                    </CustomText>
                                </View>
                            </View>

                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 12,
                                    marginTop: 16
                                }}
                            >
                                <CustomText
                                    style={{
                                        fontFamily: 'Poppins-SemiBold',
                                        fontSize: 18
                                    }}
                                >
                                    Detail Dokter
                                </CustomText>

                                <View
                                    style={{
                                        backgroundColor: 'white',
                                        height: 80,
                                        borderRadius: 10,
                                        width: '100%',
                                        shadowColor: '#000000',
                                        shadowOffset: { width: 0, height: 1 },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 4,
                                        elevation: 5,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        padding: 16,
                                        gap: 16
                                    }}
                                >
                                    <CustomImage
                                        height={60}
                                        width={60}
                                        style={{
                                            borderRadius: 30
                                        }}
                                        source={{
                                            uri: `${process.env.EXPO_PUBLIC_API_URL}/storage?path=${doctorData.photoPath}`
                                        }}
                                    />
                                    <View
                                        style={{
                                            flex: 1,
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 4
                                        }}
                                    >
                                        <CustomText
                                            type='defaultSemiBold'
                                            ellipsizeMode='tail'
                                            numberOfLines={1}
                                        >
                                            {doctorData.name}
                                        </CustomText>
                                        <CustomText
                                            type='small'
                                            style={{
                                                fontSize: 13
                                            }}
                                            ellipsizeMode='tail'
                                            numberOfLines={1}
                                        >
                                            Dokter Spesialis{' '}
                                            {doctorData.namaSpesialisasi}
                                        </CustomText>
                                    </View>
                                </View>

                                {selectedScheduleDetailData ? (
                                    <>
                                        <CustomText
                                            style={{
                                                fontFamily: 'Poppins-SemiBold',
                                                fontSize: 18,
                                                marginTop: 8
                                            }}
                                        >
                                            Pilih Jadwal
                                        </CustomText>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 16
                                            }}
                                        >
                                            {selectedScheduleDetailData.map(
                                                (d, i) => (
                                                    <TouchableOpacity
                                                        key={i}
                                                        onPress={() => {
                                                            if (
                                                                d.status ===
                                                                'Tidak Tersedia'
                                                            ) {
                                                                return;
                                                            }

                                                            if (
                                                                !isAuthenticated
                                                            ) {
                                                                router.replace(
                                                                    '/auth'
                                                                );
                                                                return;
                                                            }

                                                            router.push({
                                                                pathname:
                                                                    '/search/dokter/book',
                                                                params: {
                                                                    doctorDataString:
                                                                        JSON.stringify(
                                                                            doctorData
                                                                        ),
                                                                    scheduleDataString:
                                                                        JSON.stringify(
                                                                            d
                                                                        )
                                                                }
                                                            });
                                                        }}
                                                    >
                                                        <View
                                                            style={{
                                                                backgroundColor:
                                                                    'white',
                                                                borderRadius: 10,
                                                                width: '100%',
                                                                shadowColor:
                                                                    '#000000',
                                                                shadowOffset: {
                                                                    width: 0,
                                                                    height: 1
                                                                },
                                                                shadowOpacity: 0.25,
                                                                shadowRadius: 4,
                                                                elevation: 5,
                                                                display: 'flex',
                                                                flexDirection:
                                                                    'column',
                                                                padding: 16,
                                                                gap: 8,
                                                                opacity:
                                                                    d.status ===
                                                                    'Tidak Tersedia'
                                                                        ? 0.3
                                                                        : 1
                                                            }}
                                                        >
                                                            <View
                                                                style={{
                                                                    display:
                                                                        'flex',
                                                                    flexDirection:
                                                                        'row',
                                                                    justifyContent:
                                                                        'space-between',
                                                                    alignItems:
                                                                        'center'
                                                                }}
                                                            >
                                                                <CustomText
                                                                    style={{
                                                                        fontSize: 15
                                                                    }}
                                                                >
                                                                    Sisa Slot
                                                                </CustomText>
                                                                <CustomText
                                                                    style={{
                                                                        fontSize: 15
                                                                    }}
                                                                >
                                                                    {Math.abs(
                                                                        d.capacity -
                                                                            d.totalPasien
                                                                    )}
                                                                </CustomText>
                                                            </View>
                                                            <View
                                                                style={{
                                                                    display:
                                                                        'flex',
                                                                    flexDirection:
                                                                        'row',
                                                                    justifyContent:
                                                                        'space-between',
                                                                    alignItems:
                                                                        'center'
                                                                }}
                                                            >
                                                                <CustomText
                                                                    style={{
                                                                        fontSize: 15
                                                                    }}
                                                                >
                                                                    {dayjsUtils(
                                                                        d.date,
                                                                        'YYYY-MM-DD'
                                                                    ).format(
                                                                        'dddd, D MMMM YYYY'
                                                                    )}
                                                                </CustomText>
                                                                <CustomText
                                                                    style={{
                                                                        fontSize: 15
                                                                    }}
                                                                >
                                                                    {
                                                                        d.startTime
                                                                    }{' '}
                                                                    -{' '}
                                                                    {d.endTime}
                                                                </CustomText>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            )}
                                        </View>
                                    </>
                                ) : (
                                    <>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: 8
                                            }}
                                        >
                                            <Image
                                                source={require('@/assets/images/not-found.png')}
                                                style={{
                                                    width: 100,
                                                    height: 100
                                                }}
                                            />
                                            <CustomText
                                                style={{
                                                    color: colors.primaryBlue,
                                                    fontFamily:
                                                        'Poppins-SemiBold',
                                                    textAlign: 'center'
                                                }}
                                            >
                                                Maaf, jadwal tidak tersedia di
                                                tanggal ini
                                            </CustomText>
                                        </View>
                                    </>
                                )}
                            </View>
                        </View>
                    </View>
                </CustomKeyboardAwareScrollView>
            )}
        </>
    );
};

export default DokterPageJadwalComponent;

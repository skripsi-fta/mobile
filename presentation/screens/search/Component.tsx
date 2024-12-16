import { colors } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import { DoctorAPI } from '@/infrastructure/usecase/doctor';
import { CustomIcons } from '@/presentation/components/CustomIcons';
import CustomKeyboardAwareScrollView from '@/presentation/components/CustomKeyboardAwareScrollView';
import { CustomText } from '@/presentation/components/CustomText';
import { TextInput } from '@/presentation/components/CustomTextInput';
import { useCallback, useEffect, useState } from 'react';
import {
    RefreshControl,
    StyleSheet,
    TouchableOpacity,
    View,
    type NativeSyntheticEvent,
    type NativeScrollEvent
} from 'react-native';
import { useInfiniteQuery } from 'react-query';
import DoctorComponent from './DoctorComponent';
import { SpesialisasiAPI } from '@/infrastructure/usecase/spesialisasi';
import SpesialisasiComponent from './SpesialisasiComponent';
import { ScheduleAPI } from '@/infrastructure/usecase/schedule';
import dayjsUtils from '@/utils/dayjs';
import ScheduleComponent from './ScheduleComponent';
import { useModal } from '@/providers/ModalProvider';
import SearchDate from './Component/SearchDate';
import { useLocalSearchParams } from 'expo-router';

const SearchPageComponent = () => {
    const { typeInit } = useLocalSearchParams() as unknown as {
        typeInit?: 'doctor' | 'spesialisasi' | 'jadwal';
    };

    const { http } = useAuth();

    const [name, setName] = useState<string>('');

    const [stepper, setStepper] = useState<
        'doctor' | 'spesialisasi' | 'jadwal'
    >(typeInit || 'doctor');

    const doctorAPI = new DoctorAPI(http);

    const specializationAPI = new SpesialisasiAPI(http);

    const scheduleAPI = new ScheduleAPI(http);

    const [refreshing, setRefreshing] = useState<boolean>(false);

    const [scrollTimeout, setScrollTimeout] = useState<ReturnType<
        typeof setTimeout
    > | null>(null);

    const {
        data: dataDoctor,
        fetchNextPage: fetchNextPageDoctor,
        hasNextPage: hasNextPageDoctor,
        isFetchingNextPage: isFetchingNextPageDoctor,
        refetch: refetchDoctor
    } = useInfiniteQuery({
        queryKey: ['doctor-list', name],
        queryFn: ({ pageParam = 1 }) => {
            return doctorAPI.getDoctor({
                pageNumber: Number(pageParam),
                pageSize: 5,
                name
            });
        },
        getNextPageParam: (lastPage) =>
            lastPage.currentPage < lastPage.totalPages
                ? lastPage.currentPage + 1
                : undefined,
        enabled: stepper === 'doctor'
    });

    const {
        data: dataSpesialisasi,
        fetchNextPage: fetchNextPageSpesialisasi,
        hasNextPage: hasNextPageSpesialisasi,
        isFetchingNextPage: isFetchingNextPageSpesialisasi,
        refetch: refetchSpesialisasi
    } = useInfiniteQuery({
        queryKey: ['spesialisasi-list', name],
        queryFn: ({ pageParam = 1 }) => {
            return specializationAPI.getSpecialization({
                pageNumber: Number(pageParam),
                pageSize: 18,
                name
            });
        },
        getNextPageParam: (lastPage) =>
            lastPage.currentPage < lastPage.totalPages
                ? lastPage.currentPage + 1
                : undefined,
        enabled: stepper === 'spesialisasi'
    });

    const [dateParam, setDateParam] = useState<{
        startDate: string;
        endDate?: string;
    }>({
        startDate: dayjsUtils().format('YYYY-MM-DD')
    });

    const {
        data: dataSchedule,
        fetchNextPage: fetchNextPageSchedule,
        hasNextPage: hasNextPageSchedule,
        isFetchingNextPage: isFetchingNextPageSchedule,
        refetch: refetchSchedule
    } = useInfiniteQuery({
        queryKey: ['schedule-list', dateParam],
        queryFn: ({ pageParam = 1 }) => {
            return scheduleAPI.getSchedule({
                pageNumber: Number(pageParam),
                pageSize: 10,
                startDate: dateParam.startDate,
                endDate: dateParam.endDate
            });
        },
        getNextPageParam: (lastPage) =>
            lastPage.currentPage < lastPage.totalPages
                ? lastPage.currentPage + 1
                : undefined,
        enabled: stepper === 'jadwal'
    });

    const onRefresh = async () => {
        setRefreshing(() => true);

        if (stepper === 'doctor') {
            await refetchDoctor();
        } else if (stepper === 'spesialisasi') {
            await refetchSpesialisasi();
        } else if (stepper === 'jadwal') {
            await refetchSchedule();
        }

        setRefreshing(() => false);
    };

    const doctorData = dataDoctor?.pages?.flatMap((page) => page.data) ?? [];

    const spesialisasiData =
        dataSpesialisasi?.pages?.flatMap((page) => page.data) ?? [];

    const scheduleData =
        dataSchedule?.pages?.flatMap((page) => page.data) ?? [];

    const fetchDoctorInfinite = () => {
        if (hasNextPageDoctor && !isFetchingNextPageDoctor) {
            fetchNextPageDoctor();
        }
    };

    const fetchSpesialisasiInfinite = () => {
        if (hasNextPageSpesialisasi && !isFetchingNextPageSpesialisasi) {
            fetchNextPageSpesialisasi();
        }
    };

    const fetchScheduleInfinite = () => {
        if (hasNextPageSchedule && !isFetchingNextPageSchedule) {
            fetchNextPageSchedule();
        }
    };

    const handleScroll = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            const { layoutMeasurement, contentOffset, contentSize } =
                event.nativeEvent;

            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }

            const timeoutId = setTimeout(() => {
                if (
                    layoutMeasurement.height + contentOffset.y >=
                    contentSize.height - 50
                ) {
                    if (stepper === 'doctor') {
                        fetchDoctorInfinite();
                    } else if (stepper === 'spesialisasi') {
                        fetchSpesialisasiInfinite();
                    } else if (stepper === 'jadwal') {
                        fetchScheduleInfinite();
                    }
                }
            }, 50);

            setScrollTimeout(timeoutId);
        },
        [stepper, scrollTimeout]
    );

    const handleStepper = (name: 'doctor' | 'spesialisasi' | 'jadwal') => {
        setStepper(() => name);

        setName(() => '');

        setDateParam(() => ({ startDate: dayjsUtils().format('YYYY-MM-DD') }));
    };

    const { openModal } = useModal();

    const handleOpenModalSearchDate = () => {
        openModal(
            <SearchDate dateParam={dateParam} setDateParam={setDateParam} />,
            { disableClickOutside: false }
        );
    };

    return (
        <>
            <CustomKeyboardAwareScrollView
                containerStyle={{ backgroundColor: 'white' }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                onScroll={handleScroll}
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
                    <CustomText
                        style={{
                            textAlign: 'center',
                            fontSize: 22,
                            fontFamily: 'Poppins-SemiBold'
                        }}
                    >
                        Cari Dokter/Spesialis
                    </CustomText>

                    {stepper === 'jadwal' ? (
                        <TouchableOpacity
                            style={{
                                borderColor: colors.primaryBlue,
                                height: 50,
                                marginTop: 16,
                                width: '100%',
                                borderRadius: 20,
                                flex: 1,
                                padding: 8,
                                borderWidth: 1,
                                justifyContent: 'center',
                                position: 'relative'
                            }}
                            onPress={handleOpenModalSearchDate}
                        >
                            <CustomText
                                style={{
                                    color: '#888888',
                                    fontSize: 14
                                }}
                            >
                                Pilih Tanggal
                            </CustomText>
                            <View
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    display: 'flex',
                                    backgroundColor: colors.primaryBlue,
                                    height: 50,
                                    bottom: 0,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 60,
                                    borderRadius: 20
                                }}
                            >
                                <CustomIcons
                                    type='ant-design'
                                    name='search1'
                                    color='white'
                                />
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <TextInput
                            inputMode='text'
                            style={{
                                borderColor: colors.primaryBlue,
                                color: 'black',
                                height: 50,
                                marginTop: 16,
                                width: '100%',
                                borderRadius: 20
                            }}
                            onEndEditing={(e) => {
                                setName(() => e.nativeEvent.text);
                            }}
                            placeholder='Cari'
                            customIcon={
                                <View
                                    style={{
                                        position: 'absolute',
                                        right: 0,
                                        display: 'flex',
                                        backgroundColor: colors.primaryBlue,
                                        height: 50,
                                        bottom: 0,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 60,
                                        borderRadius: 20
                                    }}
                                >
                                    <CustomIcons
                                        type='ant-design'
                                        name='search1'
                                        color='white'
                                    />
                                </View>
                            }
                        />
                    )}

                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 24,
                            width: '100%',
                            marginTop: 24
                        }}
                    >
                        <TouchableOpacity
                            style={[
                                stepper === 'doctor'
                                    ? styles.activeButton
                                    : styles.inactiveButton
                            ]}
                            onPress={() => handleStepper('doctor')}
                        >
                            <CustomText
                                style={{
                                    fontSize: 14,
                                    color:
                                        stepper === 'doctor'
                                            ? 'white'
                                            : colors.primaryBlue
                                }}
                            >
                                Dokter
                            </CustomText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                stepper === 'spesialisasi'
                                    ? styles.activeButton
                                    : styles.inactiveButton
                            ]}
                            onPress={() => handleStepper('spesialisasi')}
                        >
                            <CustomText
                                style={{
                                    fontSize: 14,
                                    color:
                                        stepper === 'spesialisasi'
                                            ? 'white'
                                            : colors.primaryBlue
                                }}
                            >
                                Spesialis
                            </CustomText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                stepper === 'jadwal'
                                    ? styles.activeButton
                                    : styles.inactiveButton
                            ]}
                            onPress={() => handleStepper('jadwal')}
                        >
                            <CustomText
                                style={{
                                    fontSize: 14,
                                    color:
                                        stepper === 'jadwal'
                                            ? 'white'
                                            : colors.primaryBlue
                                }}
                            >
                                Jadwal
                            </CustomText>
                        </TouchableOpacity>
                    </View>

                    {stepper === 'doctor' && (
                        <>
                            <DoctorComponent
                                doctorData={doctorData}
                                isFetchingNextPageDoctor={
                                    isFetchingNextPageDoctor
                                }
                            />
                        </>
                    )}

                    {stepper === 'spesialisasi' && (
                        <SpesialisasiComponent
                            isFetchingNextPageSpesialisasi={
                                isFetchingNextPageSpesialisasi
                            }
                            spesialisasiData={spesialisasiData}
                        />
                    )}

                    {stepper === 'jadwal' && (
                        <ScheduleComponent
                            isFetchingNextPageSchedule={
                                isFetchingNextPageSchedule
                            }
                            scheduleData={scheduleData}
                            dateParam={dateParam}
                        />
                    )}
                </View>
            </CustomKeyboardAwareScrollView>
        </>
    );
};

export default SearchPageComponent;

const styles = StyleSheet.create({
    activeButton: {
        backgroundColor: colors.primaryBlue,
        borderRadius: 20,
        alignItems: 'center',
        height: 35,
        justifyContent: 'center',
        flex: 1
    },
    inactiveButton: {
        borderColor: colors.primaryBlue,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        height: 35,
        justifyContent: 'center',
        flex: 1,
        borderWidth: 2
    }
});

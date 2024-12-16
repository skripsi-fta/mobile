import { colors } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import { AppointmentAPI } from '@/infrastructure/usecase/appointment';
import CustomKeyboardAwareScrollView from '@/presentation/components/CustomKeyboardAwareScrollView';
import { CustomText } from '@/presentation/components/CustomText';
import { useCallback, useState } from 'react';
import {
    RefreshControl,
    type NativeScrollEvent,
    type NativeSyntheticEvent,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { useInfiniteQuery } from 'react-query';
import MendatangComponent from './MendatangComponent';
import LaluComponent from './LaluComponent';

const AppointmentPageComponent = () => {
    const { http } = useAuth();

    const [stepper, setStepper] = useState<'mendatang' | 'lalu'>('mendatang');

    const [refreshing, setRefreshing] = useState<boolean>(false);

    const [scrollTimeout, setScrollTimeout] = useState<ReturnType<
        typeof setTimeout
    > | null>(null);

    const appointmentAPI = new AppointmentAPI(http);

    const {
        data: dataUpcomingSchedule,
        fetchNextPage: fetchNextUpcomingSchedule,
        hasNextPage: hasNextUpcomingSchedule,
        isFetchingNextPage: isFetchingUpcomingSchedule,
        refetch: refetchUpcomingSchedule
    } = useInfiniteQuery({
        queryKey: ['upcoming-schedule', 'mendatang'],
        queryFn: ({ pageParam = 1 }) => {
            return appointmentAPI.getList({
                pageNumber: Number(pageParam),
                pageSize: 5,
                type: 'mendatang'
            });
        },
        getNextPageParam: (lastPage) =>
            lastPage.currentPage < lastPage.totalPages
                ? lastPage.currentPage + 1
                : undefined,
        enabled: stepper === 'mendatang'
    });

    const {
        data: dataHistorySchedule,
        fetchNextPage: fetchNextHistorySchedule,
        hasNextPage: hasNextHistorySchedule,
        isFetchingNextPage: isFetchingHistorySchedule,
        refetch: refetchHistorySchedule
    } = useInfiniteQuery({
        queryKey: ['history-schedule', 'lalu'],
        queryFn: ({ pageParam = 1 }) => {
            return appointmentAPI.getList({
                pageNumber: Number(pageParam),
                pageSize: 5,
                type: 'lalu'
            });
        },
        getNextPageParam: (lastPage) =>
            lastPage.currentPage < lastPage.totalPages
                ? lastPage.currentPage + 1
                : undefined,
        enabled: stepper === 'lalu'
    });

    const upcomingScheduleData =
        dataUpcomingSchedule?.pages?.flatMap((page) => page.data) ?? [];

    const historyScheduleData =
        dataHistorySchedule?.pages?.flatMap((page) => page.data) ?? [];

    const fetchUpcomingScheduleData = () => {
        if (hasNextUpcomingSchedule && !isFetchingUpcomingSchedule) {
            fetchNextUpcomingSchedule();
        }
    };

    const fetchHistoryScheduleData = () => {
        if (hasNextHistorySchedule && !isFetchingHistorySchedule) {
            fetchNextHistorySchedule();
        }
    };

    const onRefresh = async () => {
        setRefreshing(() => true);

        if (stepper === 'lalu') {
            await refetchHistorySchedule();
        } else if (stepper === 'mendatang') {
            await refetchUpcomingSchedule();
        }
        setRefreshing(() => false);
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
                    if (stepper === 'lalu') {
                        fetchHistoryScheduleData();
                    } else if (stepper === 'mendatang') {
                        fetchUpcomingScheduleData();
                    }
                }
            }, 50);

            setScrollTimeout(timeoutId);
        },
        [stepper, scrollTimeout]
    );

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
                        paddingBottom: 32,
                        gap: 16
                    }}
                >
                    <CustomText
                        style={{
                            textAlign: 'center',
                            fontSize: 22,
                            fontFamily: 'Poppins-SemiBold'
                        }}
                    >
                        Janji Temu
                    </CustomText>

                    <View
                        style={{
                            width: '100%',
                            backgroundColor: '#EFF0F9',
                            padding: 8,
                            borderRadius: 20,
                            gap: 8,
                            flexDirection: 'row'
                        }}
                    >
                        <TouchableOpacity
                            style={[
                                stepper === 'mendatang'
                                    ? styles.activeButton
                                    : styles.inactiveButton
                            ]}
                            onPress={() => setStepper(() => 'mendatang')}
                        >
                            <CustomText
                                style={{
                                    fontSize: 14,
                                    color:
                                        stepper === 'mendatang'
                                            ? 'white'
                                            : 'black'
                                }}
                            >
                                Mendatang
                            </CustomText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                stepper === 'lalu'
                                    ? styles.activeButton
                                    : styles.inactiveButton
                            ]}
                            onPress={() => setStepper(() => 'lalu')}
                        >
                            <CustomText
                                style={{
                                    fontSize: 14,
                                    color:
                                        stepper === 'lalu' ? 'white' : 'black'
                                }}
                            >
                                Lalu
                            </CustomText>
                        </TouchableOpacity>
                    </View>

                    {stepper === 'mendatang' && (
                        <>
                            <MendatangComponent
                                isFetchingUpcomingSchedule={
                                    isFetchingUpcomingSchedule
                                }
                                upcomingScheduleData={upcomingScheduleData}
                            />
                        </>
                    )}

                    {stepper === 'lalu' && (
                        <>
                            <LaluComponent
                                historyScheduleData={historyScheduleData}
                                isFetchingHistorySchedule={
                                    isFetchingHistorySchedule
                                }
                            />
                        </>
                    )}
                </View>
            </CustomKeyboardAwareScrollView>
        </>
    );
};

export default AppointmentPageComponent;

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
        borderRadius: 20,
        alignItems: 'center',
        height: 35,
        justifyContent: 'center',
        flex: 1
    }
});

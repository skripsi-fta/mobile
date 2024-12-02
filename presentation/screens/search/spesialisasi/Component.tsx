import { useAuth } from '@/contexts/AuthContext';
import { DoctorAPI } from '@/infrastructure/usecase/doctor';
import CustomKeyboardAwareScrollView from '@/presentation/components/CustomKeyboardAwareScrollView';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import {
    RefreshControl,
    View,
    type NativeSyntheticEvent,
    type NativeScrollEvent
} from 'react-native';
import { useInfiniteQuery } from 'react-query';
import DoctorComponent from '../DoctorComponent';
import BackHeader from '@/presentation/components/BackHeader';

const SpesialisasiPageComponent = () => {
    const { http } = useAuth();

    const [refreshing, setRefreshing] = useState<boolean>(false);

    const [scrollTimeout, setScrollTimeout] = useState<ReturnType<
        typeof setTimeout
    > | null>(null);

    const { spesialisasiId, spesialisasiName } =
        useLocalSearchParams() as unknown as {
            spesialisasiId: string;
            spesialisasiName: string;
        };

    const {
        data: dataDoctor,
        fetchNextPage: fetchNextPageDoctor,
        hasNextPage: hasNextPageDoctor,
        isFetchingNextPage: isFetchingNextPageDoctor,
        refetch: refetchDoctor
    } = useInfiniteQuery({
        queryKey: ['doctor-list', spesialisasiId],
        queryFn: ({ pageParam = 1 }) => {
            return doctorAPI.getDoctor({
                pageNumber: Number(pageParam),
                pageSize: 5,
                spesialisasiId: spesialisasiId
            });
        },
        getNextPageParam: (lastPage) =>
            lastPage.currentPage < lastPage.totalPages
                ? lastPage.currentPage + 1
                : undefined,
        enabled: Boolean(spesialisasiId)
    });

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
                    if (hasNextPageDoctor && !isFetchingNextPageDoctor) {
                        fetchNextPageDoctor();
                    }
                }
            }, 50);

            setScrollTimeout(timeoutId);
        },
        [scrollTimeout]
    );

    const onRefresh = async () => {
        setRefreshing(() => true);

        await refetchDoctor();

        setRefreshing(() => false);
    };

    const doctorAPI = new DoctorAPI(http);

    const doctorData = dataDoctor?.pages?.flatMap((page) => page.data) ?? [];

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
                    <BackHeader
                        title={`Daftar Dokter untuk ${spesialisasiName}`}
                    />

                    <DoctorComponent
                        doctorData={doctorData}
                        isFetchingNextPageDoctor={isFetchingNextPageDoctor}
                        hideHeader
                    />
                </View>
            </CustomKeyboardAwareScrollView>
        </>
    );
};

export default SpesialisasiPageComponent;

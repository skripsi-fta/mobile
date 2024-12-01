import { useAuth } from '@/contexts/AuthContext';
import { DoctorAPI } from '@/infrastructure/usecase/doctor';
import { CustomIcons } from '@/presentation/components/CustomIcons';
import CustomKeyboardAwareScrollView from '@/presentation/components/CustomKeyboardAwareScrollView';
import { CustomText } from '@/presentation/components/CustomText';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
    RefreshControl,
    View,
    type NativeSyntheticEvent,
    type NativeScrollEvent,
    TouchableOpacity
} from 'react-native';
import { useInfiniteQuery } from 'react-query';
import DoctorComponent from '../DoctorComponent';

const SpesialisasiPageComponent = () => {
    const { http } = useAuth();

    const router = useRouter();

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
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 16,
                            marginBottom: 24
                        }}
                    >
                        <TouchableOpacity onPress={() => router.back()}>
                            <CustomIcons
                                type='ion'
                                name='arrow-back'
                                color='black'
                                size={24}
                            />
                        </TouchableOpacity>

                        <CustomText
                            style={{
                                fontSize: 20,
                                fontFamily: 'Poppins-Medium'
                            }}
                        >
                            Daftar Dokter untuk {spesialisasiName}
                        </CustomText>
                    </View>

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

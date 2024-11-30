import { colors } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import { DoctorAPI } from '@/infrastructure/usecase/doctor';
import { CustomIcons } from '@/presentation/components/CustomIcons';
import CustomKeyboardAwareScrollView from '@/presentation/components/CustomKeyboardAwareScrollView';
import { CustomText } from '@/presentation/components/CustomText';
import { TextInput } from '@/presentation/components/CustomTextInput';
import DoctorItem from '@/presentation/components/doctor/DoctorItem';
import { useCallback, useState } from 'react';
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    TouchableOpacity,
    View,
    type NativeSyntheticEvent,
    type NativeScrollEvent,
    ActivityIndicator
} from 'react-native';
import { useInfiniteQuery } from 'react-query';

const SearchPageComponent = () => {
    const { http } = useAuth();

    const [name, setName] = useState<string>('');

    const [stepper, setStepper] = useState<
        'doctor' | 'spesialisasi' | 'jadwal'
    >('doctor');

    const doctorAPI = new DoctorAPI(http);

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

    const onRefresh = async () => {
        setRefreshing(() => true);

        if (stepper === 'doctor') {
            await refetchDoctor();
        }

        setRefreshing(() => false);
    };

    const doctorData = dataDoctor?.pages?.flatMap((page) => page.data) ?? [];

    const fetchDoctorInfinite = () => {
        if (hasNextPageDoctor && !isFetchingNextPageDoctor) {
            fetchNextPageDoctor();
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
                            <CustomText
                                style={{
                                    marginTop: 32,
                                    marginBottom: 24,
                                    fontSize: 22,
                                    fontFamily: 'Poppins-Medium'
                                }}
                            >
                                Dokter Popular
                            </CustomText>
                            <FlatList
                                data={doctorData}
                                renderItem={({ item, index }) => (
                                    <DoctorItem data={item} index={index} />
                                )}
                                keyExtractor={(item) => item.id.toString()}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                ItemSeparatorComponent={() => (
                                    <View style={{ height: 24 }} />
                                )}
                                scrollEnabled={false}
                                ListFooterComponent={() => (
                                    <>
                                        {isFetchingNextPageDoctor && (
                                            <ActivityIndicator
                                                style={{ marginTop: 24 }}
                                                color={colors.primaryBlue}
                                                size={'large'}
                                            />
                                        )}
                                    </>
                                )}
                            />
                        </>
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

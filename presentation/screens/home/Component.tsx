import { colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { DoctorAPI } from '@/infrastructure/usecase/doctor';
import { SpesialisasiAPI } from '@/infrastructure/usecase/spesialisasi';
import CustomKeyboardAwareScrollView from '@/presentation/components/CustomKeyboardAwareScrollView';
import { CustomText } from '@/presentation/components/CustomText';
import { HelloWave } from '@/presentation/components/HelloWave';
import DoctorItem from '@/presentation/components/doctor/DoctorItem';
import SpesialisasiItem from '@/presentation/components/spesialisasi/SpesialisasiItem';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    RefreshControl,
    ScrollView,
    TouchableOpacity,
    View
} from 'react-native';
import { useQuery } from 'react-query';

const HomePageComponent = () => {
    const { user, http } = useAuth();

    const specializationAPI = new SpesialisasiAPI(http);

    const doctorAPI = new DoctorAPI(http);

    const [refreshing, setRefreshing] = useState<boolean>(false);

    const {
        data: dataSpecialization,
        isLoading: loadingSpecialization,
        refetch: refetchSpecialization
    } = useQuery({
        queryKey: ['specialization-recommendation'],
        queryFn: () =>
            specializationAPI.getSpecialization({ pageNumber: 1, pageSize: 6 })
    });

    const {
        data: dataDoctor,
        isLoading: loadingDoctor,
        refetch: refetchDoctor
    } = useQuery({
        queryKey: ['doctor-recommendation'],
        queryFn: () => doctorAPI.getDoctor({ pageNumber: 1, pageSize: 3 })
    });

    const onRefresh = async () => {
        setRefreshing(() => true);

        await refetchSpecialization();

        await refetchDoctor();

        setRefreshing(() => false);
    };

    const router = useRouter();

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
            >
                <ScrollView
                    scrollEventThrottle={16}
                    contentContainerStyle={{
                        display: 'flex',
                        flexDirection: 'column',
                        paddingTop: 8,
                        paddingHorizontal: 24,
                        gap: 48,
                        backgroundColor: 'white',
                        paddingBottom: 32
                    }}
                >
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 16
                        }}
                    >
                        {user?.user?.patient && (
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: 4,
                                    alignItems: 'center'
                                }}
                            >
                                <CustomText type='subtitle'>
                                    Hi, {user.user.patient.name}!
                                </CustomText>
                                <HelloWave />
                            </View>
                        )}

                        <Image
                            style={{
                                width: '100%',
                                borderRadius: 10,
                                height: 175,
                                resizeMode: 'cover'
                            }}
                            source={require('@/assets/images/home/backdrop.png')}
                        />
                    </View>

                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 16
                        }}
                    >
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <CustomText type='subtitle'>
                                Rekomendasi Poli
                            </CustomText>

                            <TouchableOpacity
                                onPress={() =>
                                    router.push({
                                        pathname: '/search',
                                        params: {
                                            typeInit: 'spesialisasi'
                                        }
                                    })
                                }
                            >
                                <CustomText
                                    style={{ color: '#888888', fontSize: 12 }}
                                >
                                    lihat semua {'>'}
                                </CustomText>
                            </TouchableOpacity>
                        </View>

                        {!loadingSpecialization ? (
                            <View>
                                <FlatList
                                    horizontal
                                    contentContainerStyle={{
                                        padding: 20
                                    }}
                                    style={{ margin: -20 }}
                                    data={dataSpecialization?.data ?? []}
                                    renderItem={({ item, index }) => (
                                        <SpesialisasiItem
                                            data={item}
                                            index={index}
                                            onClick={() => {
                                                router.push({
                                                    pathname:
                                                        '/search/spesialisasi',
                                                    params: {
                                                        spesialisasiId: item.id,
                                                        spesialisasiName:
                                                            item.name
                                                    }
                                                });
                                            }}
                                        />
                                    )}
                                    keyExtractor={(item) => item.id.toString()}
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                        ) : (
                            <View
                                style={{
                                    width: '100%',
                                    height: 100,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <ActivityIndicator
                                    size='large'
                                    color={colors.primaryBlue}
                                />
                            </View>
                        )}
                    </View>

                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 16
                        }}
                    >
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <CustomText type='subtitle'>
                                Rekomendasi Dokter
                            </CustomText>

                            <TouchableOpacity
                                onPress={() =>
                                    router.push({
                                        pathname: '/search',
                                        params: {
                                            typeInit: 'doctor'
                                        }
                                    })
                                }
                            >
                                <CustomText
                                    style={{ color: '#888888', fontSize: 12 }}
                                >
                                    lihat semua {'>'}
                                </CustomText>
                            </TouchableOpacity>
                        </View>

                        {!loadingDoctor ? (
                            <FlatList
                                data={dataDoctor?.data ?? []}
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
                                contentContainerStyle={{
                                    padding: 20
                                }}
                                style={{ margin: -20 }}
                            />
                        ) : (
                            <View
                                style={{
                                    width: '100%',
                                    height: 100,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <ActivityIndicator
                                    size='large'
                                    color={colors.primaryBlue}
                                />
                            </View>
                        )}
                    </View>
                </ScrollView>
            </CustomKeyboardAwareScrollView>
        </>
    );
};

export default HomePageComponent;

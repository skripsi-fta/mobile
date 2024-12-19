import { colors } from '@/constants/Colors';
import type { SpesialisasiModel } from '@/infrastructure/models/spesialisasi/spesialisasi';
import { CustomText } from '@/presentation/components/CustomText';
import SpesialisasiItem from '@/presentation/components/spesialisasi/SpesialisasiItem';
import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Image, View } from 'react-native';

interface SpesialisasiComponentProps {
    spesialisasiData: SpesialisasiModel.Response.Data[];
    isFetchingNextPageSpesialisasi: boolean;
}

const SpesialisasiComponent = ({
    isFetchingNextPageSpesialisasi,
    spesialisasiData
}: SpesialisasiComponentProps) => {
    const router = useRouter();

    return (
        <>
            <CustomText
                style={{
                    marginTop: 32,
                    marginBottom: 24,
                    fontSize: 22,
                    fontFamily: 'Poppins-Medium'
                }}
            >
                Spesialisasi Popular
            </CustomText>

            {spesialisasiData.length === 0 ? (
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 4
                    }}
                >
                    <Image
                        source={require('@/assets/images/not-found.png')}
                        style={{ width: 100, height: 100 }}
                    />
                    <CustomText
                        style={{
                            color: colors.primaryBlue,
                            fontFamily: 'Poppins-SemiBold'
                        }}
                    >
                        Data tidak ditemukan
                    </CustomText>
                </View>
            ) : (
                <FlatList
                    data={spesialisasiData}
                    contentContainerStyle={{
                        padding: 20
                    }}
                    style={{ margin: -20 }}
                    renderItem={({ item, index }) => (
                        <SpesialisasiItem
                            data={item}
                            index={index}
                            direction='vertical'
                            onClick={() => {
                                router.push({
                                    pathname: '/search/spesialisasi',
                                    params: {
                                        spesialisasiId: item.id,
                                        spesialisasiName: item.name
                                    }
                                });
                            }}
                        />
                    )}
                    keyExtractor={(item, index) =>
                        `${item.id.toString()}${index}`
                    }
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => (
                        <View style={{ height: 24 }} />
                    )}
                    scrollEnabled={false}
                    numColumns={3}
                    ListFooterComponent={() => (
                        <>
                            {isFetchingNextPageSpesialisasi && (
                                <ActivityIndicator
                                    style={{ marginTop: 8 }}
                                    color={colors.primaryBlue}
                                    size={'large'}
                                />
                            )}
                        </>
                    )}
                />
            )}
        </>
    );
};

export default SpesialisasiComponent;

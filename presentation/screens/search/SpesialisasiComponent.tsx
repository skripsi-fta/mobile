import { colors } from '@/constants/colors';
import type { SpesialisasiModel } from '@/infrastructure/models/spesialisasi/spesialisasi';
import { CustomText } from '@/presentation/components/CustomText';
import SpesialisasiItem from '@/presentation/components/spesialisasi/SpesialisasiItem';
import { ActivityIndicator, FlatList, View } from 'react-native';

interface SpesialisasiComponentProps {
    spesialisasiData: SpesialisasiModel.Response.Data[];
    isFetchingNextPageSpesialisasi: boolean;
}

const SpesialisasiComponent = ({
    isFetchingNextPageSpesialisasi,
    spesialisasiData
}: SpesialisasiComponentProps) => {
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

            <FlatList
                data={spesialisasiData}
                renderItem={({ item, index }) => (
                    <SpesialisasiItem
                        data={item}
                        index={index}
                        direction='vertical'
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
                scrollEnabled={false}
                numColumns={3}
                ListFooterComponent={() => (
                    <>
                        {isFetchingNextPageSpesialisasi && (
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
    );
};

export default SpesialisasiComponent;

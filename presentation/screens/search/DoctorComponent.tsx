import { colors } from '@/constants/colors';
import type { DoctorModel } from '@/infrastructure/models/doctor/doctor';
import { CustomText } from '@/presentation/components/CustomText';
import DoctorItem from '@/presentation/components/doctor/DoctorItem';
import { ActivityIndicator, FlatList, Image, View } from 'react-native';

interface DoctorComponentProps {
    doctorData: DoctorModel.Response.Data[];
    isFetchingNextPageDoctor: boolean;
    hideHeader?: boolean;
}

const DoctorComponent = ({
    doctorData,
    isFetchingNextPageDoctor,
    hideHeader
}: DoctorComponentProps) => {
    return (
        <>
            {!hideHeader && (
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
            )}

            {doctorData.length === 0 ? (
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
            )}
        </>
    );
};

export default DoctorComponent;

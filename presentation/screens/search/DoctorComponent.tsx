import { colors } from '@/constants/colors';
import type { DoctorModel } from '@/infrastructure/models/doctor/doctor';
import { CustomText } from '@/presentation/components/CustomText';
import DoctorItem from '@/presentation/components/doctor/DoctorItem';
import { ActivityIndicator, FlatList, View } from 'react-native';

interface DoctorCompoenntProps {
    doctorData: DoctorModel.Response.Data[];
    isFetchingNextPageDoctor: boolean;
}

const DoctorComponent = ({
    doctorData,
    isFetchingNextPageDoctor
}: DoctorCompoenntProps) => {
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
                ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
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
    );
};

export default DoctorComponent;

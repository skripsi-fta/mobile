import { colors } from '@/constants/Colors';
import type { AppointmentModel } from '@/infrastructure/models/appointment/appointment';
import { CustomText } from '@/presentation/components/CustomText';
import AppointmentItem from '@/presentation/components/appointment/AppointmentItem';
import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Image, View } from 'react-native';

interface LaluComponentProps {
    historyScheduleData: AppointmentModel.Response.DetailData[];
    isFetchingHistorySchedule: boolean;
}

const LaluComponent = ({
    isFetchingHistorySchedule,
    historyScheduleData
}: LaluComponentProps) => {
    const router = useRouter();

    return (
        <>
            {historyScheduleData.length === 0 ? (
                <>
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
                </>
            ) : (
                <>
                    <FlatList
                        data={historyScheduleData}
                        renderItem={({ item }) => (
                            <AppointmentItem
                                data={item}
                                type='lalu'
                                onClick={() => {
                                    router.push({
                                        pathname: '/appointment/detail',
                                        params: { appointmentId: item.id }
                                    });
                                }}
                            />
                        )}
                        contentContainerStyle={{
                            padding: 20
                        }}
                        style={{ margin: -20 }}
                        keyExtractor={(item, index) =>
                            `${item.id.toString()}${index}`
                        }
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => (
                            <View style={{ height: 24 }} />
                        )}
                        scrollEnabled={false}
                        ListFooterComponent={() => (
                            <>
                                {isFetchingHistorySchedule && (
                                    <ActivityIndicator
                                        style={{ marginTop: 8 }}
                                        color={colors.primaryBlue}
                                        size={'large'}
                                    />
                                )}
                            </>
                        )}
                    />
                </>
            )}
        </>
    );
};

export default LaluComponent;

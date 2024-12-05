import { colors } from '@/constants/colors';
import type { AppointmentModel } from '@/infrastructure/models/appointment/appointment';
import { CustomText } from '@/presentation/components/CustomText';
import AppointmentItem from '@/presentation/components/appointment/AppointmentItem';
import { ActivityIndicator, FlatList, Image, View } from 'react-native';

interface MendatangComponentProps {
    upcomingScheduleData: AppointmentModel.Response.DetailData[];
    isFetchingUpcomingSchedule: boolean;
}

const MendatangComponent = ({
    isFetchingUpcomingSchedule,
    upcomingScheduleData
}: MendatangComponentProps) => {
    return (
        <>
            {upcomingScheduleData.length === 0 ? (
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
                        data={upcomingScheduleData}
                        renderItem={({ item }) => (
                            <AppointmentItem data={item} type='mendatang' />
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
                        ListFooterComponent={() => (
                            <>
                                {isFetchingUpcomingSchedule && (
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

export default MendatangComponent;

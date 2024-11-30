import { colors } from '@/constants/colors';
import type { ScheduleModel } from '@/infrastructure/models/schedule/schedule';
import { CustomText } from '@/presentation/components/CustomText';
import ScheduleItem from '@/presentation/components/schedule/ScheduleItem';
import dayjsUtils from '@/utils/dayjs';
import dayjs from 'dayjs';
import { ActivityIndicator, FlatList, View } from 'react-native';

interface ScheduleComponentProps {
    scheduleData: ScheduleModel.Response.Data[];
    isFetchingNextPageSchedule: boolean;
    dateParam: {
        startDate: string;
        endDate?: string;
    };
}

const ScheduleComponent = ({
    isFetchingNextPageSchedule,
    scheduleData,
    dateParam
}: ScheduleComponentProps) => {
    return (
        <>
            <CustomText
                style={{
                    marginTop: 32,
                    marginBottom: 8,
                    fontSize: 22,
                    fontFamily: 'Poppins-Medium'
                }}
            >
                Jadwal Dokter
            </CustomText>

            <CustomText
                style={{ marginBottom: 24, fontSize: 14, color: '#888888' }}
            >
                Mencari jadwal dari hari{' '}
                {dayjsUtils(dateParam.startDate, 'YYYY-MM-DD').format(
                    'dddd, DD-MM-YYYY'
                )}{' '}
                {dateParam.endDate &&
                    ` - ${dayjs(dateParam.endDate, 'YYYY-MM-DD').format(
                        'dddd, DD-MM-YYYY'
                    )}`}
            </CustomText>

            <FlatList
                data={scheduleData}
                renderItem={({ item }) => (
                    <ScheduleItem data={item} type='list' />
                )}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
                scrollEnabled={false}
                ListFooterComponent={() => (
                    <>
                        {isFetchingNextPageSchedule && (
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

export default ScheduleComponent;

import { colors } from '@/constants/colors';
import type { ScheduleModel } from '@/infrastructure/models/schedule/schedule';
import { CustomText } from '@/presentation/components/CustomText';
import ScheduleItem from '@/presentation/components/schedule/ScheduleItem';
import dayjsUtils from '@/utils/dayjs';
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Image, View } from 'react-native';

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
    const router = useRouter();

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

            {scheduleData.length === 0 ? (
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
                    data={scheduleData}
                    renderItem={({ item }) => (
                        <ScheduleItem
                            data={item}
                            type='list'
                            onClick={() => {
                                router.push({
                                    pathname: '/search/dokter',
                                    params: {
                                        data: JSON.stringify({
                                            id: item.doctorId
                                        })
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
                    ListFooterComponent={() => (
                        <>
                            {isFetchingNextPageSchedule && (
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

export default ScheduleComponent;

import { colors } from '@/constants/colors';
import type { ScheduleModel } from '@/infrastructure/models/schedule/schedule';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { CustomText } from '../CustomText';
import dayjsUtils from '@/utils/dayjs';
import { CustomIcons } from '../CustomIcons';

interface ScheduleItemProps {
    data: ScheduleModel.Response.Data;
    type: 'list' | 'upcoming' | 'finished';
    onClick?: () => void;
}

const ScheduleItem = ({ data, type, onClick }: ScheduleItemProps) => {
    return (
        <>
            <TouchableOpacity onPress={onClick}>
                <View
                    style={{
                        backgroundColor: 'white',
                        height: 110,
                        borderRadius: 10,
                        width: '100%',
                        shadowColor: '#000000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 16,
                        gap: 16,
                        justifyContent: 'space-between',
                        flex: 1
                    }}
                >
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 16
                        }}
                    >
                        <View
                            style={{
                                width: 90,
                                height: 90,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10,
                                borderColor: colors.primaryBlue,
                                padding: 4,
                                borderWidth: 1,
                                gap: 4
                            }}
                        >
                            <CustomText
                                style={{
                                    fontSize: 13,
                                    color: colors.primaryBlue
                                }}
                            >
                                {dayjsUtils(data.date, 'YYYY-MM-DD').format(
                                    'MMMM'
                                )}
                            </CustomText>
                            <CustomText
                                style={{
                                    fontSize: 18,
                                    color: colors.primaryBlue,
                                    fontFamily: 'Poppins-Bold'
                                }}
                            >
                                {dayjsUtils(data.date, 'YYYY-MM-DD').format(
                                    'D'
                                )}
                            </CustomText>
                            <CustomText
                                style={{
                                    fontSize: 11,
                                    color: colors.primaryBlue
                                }}
                            >
                                {dayjsUtils(data.date, 'YYYY-MM-DD').format(
                                    'dddd'
                                )}
                            </CustomText>
                        </View>

                        <View
                            style={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                gap: 8
                            }}
                        >
                            <CustomText
                                type='defaultSemiBold'
                                ellipsizeMode='tail'
                                numberOfLines={1}
                            >
                                {data.doctorName}
                            </CustomText>

                            <CustomText
                                type='small'
                                style={{ fontSize: 13 }}
                                ellipsizeMode='tail'
                                numberOfLines={1}
                            >
                                {data.spesialisasiName}
                            </CustomText>

                            <CustomText
                                type='small'
                                style={{ fontSize: 13, color: '#7A7D84' }}
                                ellipsizeMode='tail'
                                numberOfLines={1}
                            >
                                {data.startTime.substring(0, 5)} -{' '}
                                {data.endTime.substring(0, 5)}
                            </CustomText>
                        </View>
                    </View>

                    {(type === 'list' || type === 'finished') && (
                        <View
                            style={{
                                display: 'flex',
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <CustomIcons
                                type='ion'
                                name='chevron-forward'
                                size={26}
                            />
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        </>
    );
};

export default ScheduleItem;

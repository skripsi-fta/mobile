import { colors } from '@/constants/Colors';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { CustomText } from '../CustomText';
import dayjsUtils from '@/utils/dayjs';
import type { AppointmentModel } from '@/infrastructure/models/appointment/appointment';
import { CustomIcons } from '../CustomIcons';

interface AppointmentItemProps {
    data: AppointmentModel.Response.DetailData;
    type: 'mendatang' | 'lalu';
    onClick?: () => void;
}

const AppointmentItem = ({ data, type, onClick }: AppointmentItemProps) => {
    return (
        <>
            <TouchableOpacity onPress={onClick}>
                <View
                    style={{
                        backgroundColor: 'white',
                        height: 120,
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
                                borderColor:
                                    type === 'mendatang'
                                        ? 'rgba(0,0,0,0.1)'
                                        : colors.primaryBlue,
                                padding: 4,
                                borderWidth: 1,
                                gap: 4
                            }}
                        >
                            <CustomText
                                style={{
                                    fontSize: 13,
                                    color:
                                        type === 'mendatang'
                                            ? 'black'
                                            : colors.primaryBlue
                                }}
                            >
                                {dayjsUtils(data.date, 'YYYY-MM-DD').format(
                                    'MMMM'
                                )}
                            </CustomText>
                            <CustomText
                                style={{
                                    fontSize: 18,
                                    color:
                                        type === 'mendatang'
                                            ? 'black'
                                            : colors.primaryBlue,
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
                                    color:
                                        type === 'mendatang'
                                            ? 'black'
                                            : colors.primaryBlue
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

                    <View
                        style={{
                            display: 'flex',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {type === 'lalu' ? (
                            <CustomIcons
                                type='ion'
                                name='chevron-forward'
                                size={26}
                            />
                        ) : (
                            <CustomIcons
                                type='entypo'
                                name='location'
                                size={26}
                                color='#00B08E'
                            />
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        </>
    );
};

export default AppointmentItem;

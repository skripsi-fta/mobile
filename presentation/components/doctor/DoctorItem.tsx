import type { DoctorModel } from '@/infrastructure/models/doctor/doctor';
import { TouchableOpacity, View } from 'react-native';
import { CustomText } from '../CustomText';
import { CustomIcons } from '../CustomIcons';
import CustomImage from '../CustomImage';
import { useRouter } from 'expo-router';

interface DoctorItemProps {
    data: DoctorModel.Response.Data;
    index: number;
    disableOnClick?: boolean;
}

export const formatNumberTotalPasien = (num: number) => {
    if (num < 100) {
        return num.toString();
    }

    const rounded = Math.floor(num / 100) * 100;

    return `${rounded}+`;
};

const DoctorItem = ({ data, disableOnClick = false }: DoctorItemProps) => {
    const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() => {
                if (!disableOnClick) {
                    router.push({
                        pathname: '/search/dokter',
                        params: {
                            data: JSON.stringify(data)
                        }
                    });
                }
            }}
        >
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
                    gap: 16
                }}
            >
                <CustomImage
                    height={90}
                    width={90}
                    style={{
                        borderRadius: 45
                    }}
                    source={{
                        uri: `${process.env.EXPO_PUBLIC_API_URL}/storage?path=${data.photoPath}`
                    }}
                />
                <View
                    style={{
                        flex: 1,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <CustomText
                        type='defaultSemiBold'
                        ellipsizeMode='tail'
                        numberOfLines={1}
                    >
                        {data.name}
                    </CustomText>
                    <CustomText
                        type='small'
                        style={{ color: '#888888', fontSize: 13 }}
                        ellipsizeMode='tail'
                        numberOfLines={1}
                    >
                        {data.namaSpesialisasi} | {data.totalRating} review
                    </CustomText>

                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flex: 1,
                            marginTop: 8,
                            gap: 16
                        }}
                    >
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 8,
                                flex: 1
                            }}
                        >
                            <View
                                style={{
                                    borderRadius: 4,
                                    borderColor: 'rgba(0,0,0,0.1)',
                                    borderWidth: 2,
                                    height: '100%',
                                    width: '40%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 8
                                }}
                            >
                                <CustomIcons
                                    type='awesome5'
                                    name={'users'}
                                    size={16}
                                    color={'#9497F0'}
                                />
                            </View>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <CustomText
                                    style={{ fontSize: 12, color: '#888888' }}
                                >
                                    Pasien
                                </CustomText>

                                <CustomText
                                    style={{
                                        fontSize: 14,
                                        fontFamily: 'Poppins-Bold'
                                    }}
                                >
                                    {formatNumberTotalPasien(data.totalPasien)}
                                </CustomText>
                            </View>
                        </View>

                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 8,
                                flex: 1
                            }}
                        >
                            <View
                                style={{
                                    borderRadius: 4,
                                    borderColor: 'rgba(0,0,0,0.1)',
                                    borderWidth: 2,
                                    height: '100%',
                                    width: '40%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 8
                                }}
                            >
                                <CustomIcons
                                    type='ant-design'
                                    name={'star'}
                                    size={20}
                                    color={'#EC7525'}
                                />
                            </View>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <CustomText
                                    style={{ fontSize: 12, color: '#888888' }}
                                >
                                    Rating
                                </CustomText>

                                <CustomText
                                    style={{
                                        fontSize: 14,
                                        fontFamily: 'Poppins-Bold'
                                    }}
                                >
                                    {data.rating}
                                </CustomText>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default DoctorItem;

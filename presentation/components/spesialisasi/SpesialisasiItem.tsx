import type { SpesialisasiModel } from '@/infrastructure/models/spesialisasi/spesialisasi';
import { Image, TouchableOpacity, View } from 'react-native';
import { CustomText } from '../CustomText';

interface SpesialisasiItemProps {
    data: SpesialisasiModel.Response.Data;
    index: number;
}

const SpesialisasiItem = ({ data, index }: SpesialisasiItemProps) => {
    return (
        <>
            <TouchableOpacity
                style={[
                    {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: 8
                    },
                    index === 0
                        ? {
                              marginRight: 16
                          }
                        : {
                              marginLeft: 16,
                              marginRight: 16
                          }
                ]}
            >
                <View
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 2,
                        width: 70,
                        height: 70,
                        backgroundColor: 'rgba(239,240,249,0.7)',
                        borderRadius: 35
                    }}
                >
                    <Image
                        style={{
                            width: 40,
                            height: 40,
                            resizeMode: 'contain'
                        }}
                        source={{
                            uri: `${process.env.EXPO_PUBLIC_API_URL}/storage?path=${data.photoPath}`
                        }}
                    />
                </View>
                <CustomText style={{ textAlign: 'center' }} type='small'>
                    {data.name}
                </CustomText>
            </TouchableOpacity>
        </>
    );
};

export default SpesialisasiItem;

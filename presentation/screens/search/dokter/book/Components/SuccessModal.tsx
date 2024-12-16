import { CustomText } from '@/presentation/components/CustomText';
import { useModal } from '@/providers/ModalProvider';
import { useRouter } from 'expo-router';
import { Image, TouchableOpacity, View } from 'react-native';

interface SuccessModalProps {
    appointmentId: number;
}

const SuccessModal = ({ appointmentId }: SuccessModalProps) => {
    const router = useRouter();

    const { closeModal } = useModal();

    const redirect = () => {
        closeModal();
        router.push({
            pathname: '/appointment/detail',
            params: { appointmentId: appointmentId }
        });
    };

    return (
        <>
            <View
                style={{
                    backgroundColor: 'white',
                    borderRadius: 10,
                    padding: 12,
                    paddingVertical: 24,
                    display: 'flex',
                    gap: 28
                }}
            >
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 28
                    }}
                >
                    <Image
                        width={90}
                        height={90}
                        resizeMode='cover'
                        style={{ width: 90, height: 90 }}
                        source={require('@/assets/images/check-success.png')}
                    />

                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 8
                        }}
                    >
                        <CustomText
                            style={{
                                fontFamily: 'Poppins-SemiBold',
                                fontSize: 18
                            }}
                        >
                            Pendaftaran berhasil
                        </CustomText>
                        <CustomText
                            style={{
                                fontSize: 14,
                                textAlign: 'center',
                                paddingHorizontal: 28
                            }}
                        >
                            Pendaftaranmu sudah dikonfirmasi. Periksa histori
                            untuk detil lengkapnya.
                        </CustomText>
                    </View>

                    <TouchableOpacity
                        style={{
                            backgroundColor: '#1ABC9C',
                            borderRadius: 10,
                            alignItems: 'center',
                            height: 45,
                            justifyContent: 'center',
                            width: '70%'
                        }}
                        onPress={redirect}
                    >
                        <CustomText
                            style={{
                                color: '#FFFFFF',
                                fontFamily: 'Poppins-SemiBold'
                            }}
                        >
                            LIHAT DETAIL
                        </CustomText>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default SuccessModal;

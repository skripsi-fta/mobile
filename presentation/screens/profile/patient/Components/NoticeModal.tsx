import { colors } from '@/constants/Colors';
import { CustomText } from '@/presentation/components/CustomText';
import { useModal } from '@/providers/ModalProvider';
import { useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

const NoticeModal = () => {
    const router = useRouter();

    const { closeModal } = useModal();

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
                        alignSelf: 'center',
                        gap: 12
                    }}
                >
                    <CustomText
                        style={{
                            textAlign: 'center',
                            fontFamily: 'Poppins-Bold',
                            fontSize: 18
                        }}
                    >
                        Mohon mengisi informasi berikut
                    </CustomText>
                    <CustomText
                        style={{
                            textAlign: 'center',
                            fontSize: 14
                        }}
                    >
                        Apakah sudah pernah mempunyai kunjungan sebelumnya?
                    </CustomText>
                </View>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 12
                    }}
                >
                    <TouchableOpacity
                        style={{
                            backgroundColor: colors.primaryBlue,
                            borderRadius: 20,
                            alignItems: 'center',
                            height: 45,
                            justifyContent: 'center',
                            width: '100%'
                        }}
                        onPress={() => {
                            closeModal();
                            router.push('/profile/link');
                        }}
                    >
                        <CustomText
                            type='defaultSemiBold'
                            style={{ color: 'white' }}
                        >
                            SUDAH PERNAH
                        </CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            borderRadius: 20,
                            alignItems: 'center',
                            height: 45,
                            justifyContent: 'center',
                            width: '100%',
                            borderColor: colors.primaryBlue,
                            borderWidth: 1
                        }}
                        onPress={() => {
                            closeModal();
                            router.push('/profile/new');
                        }}
                    >
                        <CustomText
                            type='defaultSemiBold'
                            style={{ color: colors.primaryBlue }}
                        >
                            BELUM PERNAH
                        </CustomText>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default NoticeModal;

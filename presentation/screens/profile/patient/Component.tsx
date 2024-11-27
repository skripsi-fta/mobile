import { colors } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import { CustomIcons } from '@/presentation/components/CustomIcons';
import CustomKeyboardAwareScrollView from '@/presentation/components/CustomKeyboardAwareScrollView';
import { CustomText } from '@/presentation/components/CustomText';
import { genderType, identityType } from '@/shared/constant';
import { removeItem } from '@/utils/AsyncStorage';
import dayjsUtils from '@/utils/dayjs';
import { useFocusEffect, useNavigation, useRouter } from 'expo-router';
import { ScrollView, TouchableOpacity, View } from 'react-native';

const PatientPageComponent = () => {
    const { isAuthenticated, refetchAuth, user } = useAuth();

    const router = useRouter();

    useFocusEffect(() => {
        if (!isAuthenticated) {
            router.push('/auth');
        }
    });

    const navigation = useNavigation();

    const backToHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: '(tabs)' as never }]
        });
        refetchAuth();
    };

    const logout = async () => {
        await removeItem('user-data');
        backToHome();
    };

    if (!isAuthenticated) return null;

    return (
        <>
            <CustomKeyboardAwareScrollView
                containerStyle={{ backgroundColor: colors.primaryBlue }}
            >
                <ScrollView
                    scrollEventThrottle={16}
                    style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <View
                        style={{
                            height: 125,
                            backgroundColor: colors.primaryBlue,
                            alignItems: 'center',
                            position: 'relative'
                        }}
                    >
                        <CustomText
                            style={{
                                marginTop: 30,
                                fontSize: 20,
                                fontFamily: 'Poppins-Medium',
                                color: 'white'
                            }}
                        >
                            Profile
                        </CustomText>
                        <View
                            style={{
                                position: 'absolute',
                                bottom: -40,
                                zIndex: 2,
                                backgroundColor: 'white',
                                height: 80,
                                borderRadius: 20,
                                width: '75%',
                                shadowColor: '#000000',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 5,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 20,
                                gap: 24
                            }}
                        >
                            <View>
                                <CustomIcons
                                    type='awesome5'
                                    name='user'
                                    size={40}
                                />
                            </View>
                            <CustomText type='defaultSemiBold'>
                                {user?.user.patient?.name}
                            </CustomText>
                        </View>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'white',
                            zIndex: -100,
                            paddingTop: 60,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 24,
                            paddingHorizontal: 24,
                            minHeight: '100%',
                            paddingBottom: 32
                        }}
                    >
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 8
                            }}
                        >
                            <CustomText type='defaultSemiBold'>Nama</CustomText>
                            <CustomText>{user?.user.patient?.name}</CustomText>
                        </View>

                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 8
                            }}
                        >
                            <CustomText type='defaultSemiBold'>
                                {user?.user.phoneNumber
                                    ? 'Nomor Telepon'
                                    : 'Alamat Email'}
                            </CustomText>
                            <CustomText>
                                {user?.user.email
                                    ? user.user.email
                                    : user?.user.phoneNumber}
                            </CustomText>
                        </View>

                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 8
                            }}
                        >
                            <CustomText type='defaultSemiBold'>
                                Jenis Kelamin
                            </CustomText>
                            <CustomText>
                                {
                                    genderType[
                                        user?.user.patient?.gender as string
                                    ]
                                }
                            </CustomText>
                        </View>

                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 8
                            }}
                        >
                            <CustomText type='defaultSemiBold'>
                                Tanggal Lahir
                            </CustomText>
                            <CustomText>
                                {dayjsUtils(
                                    user?.user.patient?.dateOfBirth,
                                    'YYYY-MM-DD'
                                ).format('DD MMMM YYYY')}
                            </CustomText>
                        </View>

                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 8
                            }}
                        >
                            <CustomText type='defaultSemiBold'>
                                Alamat
                            </CustomText>
                            <CustomText>
                                {user?.user.patient?.address}
                            </CustomText>
                        </View>

                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 8
                            }}
                        >
                            <CustomText type='defaultSemiBold'>
                                Kartu Identitas
                            </CustomText>
                            <CustomText>
                                {
                                    identityType[
                                        user?.user.patient?.idType as string
                                    ]
                                }
                            </CustomText>
                        </View>

                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 8
                            }}
                        >
                            <CustomText type='defaultSemiBold'>
                                Nomor Kartu Identitas
                            </CustomText>
                            <CustomText>
                                {user?.user.patient?.idNumber}
                            </CustomText>
                        </View>

                        <TouchableOpacity
                            style={{
                                backgroundColor: colors.primaryBlue,
                                borderRadius: 20,
                                alignItems: 'center',
                                height: 45,
                                justifyContent: 'center'
                            }}
                            onPress={logout}
                        >
                            <CustomText
                                type='defaultSemiBold'
                                style={{ color: 'white' }}
                            >
                                LOGOUT
                            </CustomText>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </CustomKeyboardAwareScrollView>
        </>
    );
};

export default PatientPageComponent;

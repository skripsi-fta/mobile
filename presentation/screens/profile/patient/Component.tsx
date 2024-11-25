import { useAuth } from '@/contexts/AuthContext';
import { CustomIcons } from '@/presentation/components/CustomIcons';
import CustomKeyboardAwareScrollView from '@/presentation/components/CustomKeyboardAwareScrollView';
import { CustomText } from '@/presentation/components/CustomText';
import { genderType, identityType } from '@/shared/constant';
import { removeItem } from '@/utils/AsyncStorage';
import dayjsUtils from '@/utils/dayjs';
import { useFocusEffect, useNavigation, useRouter } from 'expo-router';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';

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
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: 'white'
                }}
            >
                <CustomKeyboardAwareScrollView
                    containerStyle={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 24,
                        flex: 1,
                        paddingHorizontal: 12
                    }}
                    fullHeight
                >
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 16,
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <CustomText
                            style={{
                                fontFamily: 'Poppins-Medium',
                                fontSize: 24
                            }}
                        >
                            Profil Pasien
                        </CustomText>
                        <TouchableOpacity
                            onPress={logout}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <CustomIcons
                                type='material'
                                name='logout'
                                color='black'
                                size={28}
                            />
                            <CustomText type='default'>Logout</CustomText>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 24
                        }}
                    >
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 4
                            }}
                        >
                            <CustomText type='defaultSemiBold'>
                                {user?.user.phoneNumber
                                    ? 'Nomor Telepon'
                                    : 'Alamat Email'}
                            </CustomText>
                            <CustomText>{user?.user.email ? user.user.email : user?.user.phoneNumber}</CustomText>
                        </View>

                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 4,
                                    flex: 1
                                }}
                            >
                                <CustomText type='defaultSemiBold'>
                                    Nama
                                </CustomText>
                                <CustomText>
                                    {user?.user.patient?.name}
                                </CustomText>
                            </View>

                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 4,
                                    flex: 1
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
                        </View>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 4,
                                    flex: 1
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
                                    gap: 4,
                                    flex: 1
                                }}
                            >
                                <CustomText type='defaultSemiBold'>
                                    Alamat
                                </CustomText>
                                <CustomText>
                                    {user?.user.patient?.address}
                                </CustomText>
                            </View>
                        </View>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 4,
                                    flex: 1
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
                                    gap: 4,
                                    flex: 1
                                }}
                            >
                                <CustomText type='defaultSemiBold'>
                                    Nomor Kartu Identitas
                                </CustomText>
                                <CustomText>
                                    {user?.user.patient?.idNumber}
                                </CustomText>
                            </View>
                        </View>
                    </View>
                </CustomKeyboardAwareScrollView>
            </SafeAreaView>
        </>
    );
};

export default PatientPageComponent;

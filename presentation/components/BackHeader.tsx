import { useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { CustomIcons } from './CustomIcons';
import { CustomText } from './CustomText';

interface BackHeaderProps {
    title: string;
}

const BackHeader = ({ title }: BackHeaderProps) => {
    const router = useRouter();

    return (
        <>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 16,
                    marginBottom: 24
                }}
            >
                <TouchableOpacity onPress={() => router.back()}>
                    <CustomIcons
                        type='ion'
                        name='arrow-back'
                        color='black'
                        size={24}
                    />
                </TouchableOpacity>

                <CustomText
                    style={{
                        fontSize: 20,
                        fontFamily: 'Poppins-Medium'
                    }}
                >
                    {title}
                </CustomText>
            </View>
        </>
    );
};

export default BackHeader;

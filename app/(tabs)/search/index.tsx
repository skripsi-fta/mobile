import { CustomText } from '@/presentation/components/CustomText';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SearchPage = () => {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={{
                flex: 1,
                paddingTop: insets.top + 8,
                paddingHorizontal: 16
            }}
        >
            <CustomText>Search Page</CustomText>
        </View>
    );
};

export default SearchPage;

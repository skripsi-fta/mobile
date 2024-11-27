import type { PropsWithChildren } from 'react';
import {
    Platform,
    SafeAreaView,
    SafeAreaViewBase,
    type RefreshControlProps,
    type StyleProp,
    type ViewStyle
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type Props = PropsWithChildren<{
    containerStyle?: StyleProp<ViewStyle>;
    fullHeight?: boolean;
    refreshControl?: React.ReactElement<RefreshControlProps>;
}>;

const CustomKeyboardAwareScrollView = ({
    children,
    containerStyle,
    fullHeight,
    refreshControl
}: Props) => {
    return (
        <>
            <KeyboardAwareScrollView
                style={[
                    containerStyle,
                    {
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column'
                    },
                    fullHeight ? { flex: 1, minHeight: '100%' } : {}
                ]}
                contentContainerStyle={[
                    containerStyle,
                    fullHeight ? { flex: 1, minHeight: '100%' } : {}
                ]}
                contentInsetAdjustmentBehavior='automatic'
                enableOnAndroid={true}
                refreshControl={refreshControl}
                enableAutomaticScroll={Platform.OS === 'ios'}
            >
                <SafeAreaView>{children}</SafeAreaView>
            </KeyboardAwareScrollView>
        </>
    );
};

export default CustomKeyboardAwareScrollView;

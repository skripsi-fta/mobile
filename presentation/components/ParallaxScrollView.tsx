import type { PropsWithChildren, ReactElement } from 'react';
import {
    StyleSheet,
    View,
    type ViewStyle,
    type StyleProp,
    Platform
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Animated, {
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset
} from 'react-native-reanimated';

type Props = PropsWithChildren<{
    headerContent: ReactElement;
    headerBackgroundColor: string;
    headerHeight?: number;
    childrenStyle?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    fullHeight?: boolean;
}>;

export default function ParallaxScrollView({
    children,
    headerContent,
    headerBackgroundColor,
    headerHeight = 250,
    childrenStyle = {},
    containerStyle = {},
    fullHeight = false
}: Props) {
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-headerHeight, 0, headerHeight],
                        [-headerHeight / 2, 0, headerHeight * 0.75]
                    )
                },
                {
                    scale: interpolate(
                        scrollOffset.value,
                        [-headerHeight, 0, headerHeight],
                        [2, 1, 1]
                    )
                }
            ]
        };
    });

    return (
        <KeyboardAwareScrollView
            style={[
                containerStyle,
                { ...styles.container, backgroundColor: headerBackgroundColor },
                fullHeight ? { flex: 1, minHeight: '100%' } : {}
            ]}
            contentContainerStyle={
                fullHeight ? { flex: 1, minHeight: '100%' } : {}
            }
            enableOnAndroid={true}
            enableAutomaticScroll={Platform.OS === 'ios'}
        >
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
                <Animated.View
                    style={[
                        styles.header,
                        {
                            backgroundColor: headerBackgroundColor,
                            height: headerHeight
                        },
                        headerAnimatedStyle
                    ]}
                >
                    {headerContent}
                </Animated.View>
                <View
                    style={[
                        {
                            ...styles.content,
                            backgroundColor: 'white'
                        },
                        childrenStyle,
                        fullHeight ? { flex: 1, minHeight: '100%' } : {}
                    ]}
                >
                    {children}
                </View>
            </Animated.ScrollView>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        overflow: 'hidden'
    },
    content: {
        flex: 1,
        overflow: 'hidden'
    }
});

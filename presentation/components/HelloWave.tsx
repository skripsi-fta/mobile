import { StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    withSequence
} from 'react-native-reanimated';

import { CustomText } from './CustomText';

export function HelloWave() {
    const rotationAnimation = useSharedValue(0);

    rotationAnimation.value = withRepeat(
        withSequence(
            withTiming(25, { duration: 150 }),
            withTiming(0, { duration: 150 })
        ),
        4
    );

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotationAnimation.value}deg` }]
    }));

    return (
        <Animated.View style={animatedStyle}>
            <CustomText style={styles.text}>👋</CustomText>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 28,
        lineHeight: 32,
        marginTop: -6
    }
});

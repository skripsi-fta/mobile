import { colors } from '@/constants/Colors';
import React from 'react';
import { ActivityIndicator, View, ViewStyle } from 'react-native';

interface Props {
    style?: ViewStyle;
}
const LoadingOverlay = (props: Props) => {
    const { style } = props;

    return (
        <View
            style={[
                {
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#000',
                    opacity: 0.5,
                    position: 'absolute',
                    justifyContent: 'center',
                    zIndex: 100
                },
                style
            ]}
        >
            <ActivityIndicator size='large' color={colors.primaryBlue} />
        </View>
    );
};

export default LoadingOverlay;

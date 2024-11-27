import { colors } from '@/constants/colors';
import { useState } from 'react';
import {
    View,
    type ImageSourcePropType,
    type ImageStyle,
    type StyleProp,
    StyleSheet,
    ActivityIndicator,
    Image
} from 'react-native';

interface CustomImageProps {
    source: ImageSourcePropType;
    width: number;
    height: number;
    style?: StyleProp<ImageStyle>;
    loadingIndicatorColor?: string;
}

const CustomImage = ({
    height,
    source,
    width,
    loadingIndicatorColor = colors.primaryBlue,
    style
}: CustomImageProps) => {
    const [loading, setLoading] = useState<boolean>(true);

    return (
        <>
            <View
                style={{
                    height,
                    width,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {loading && (
                    <View
                        style={{
                            ...StyleSheet.absoluteFillObject,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)'
                        }}
                    >
                        <ActivityIndicator style={{ height, width }} />
                    </View>
                )}

                <Image
                    source={source}
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            height,
                            width
                        },
                        style
                    ]}
                    resizeMode='cover'
                    onLoad={() => setLoading(false)}
                    onError={() => setLoading(false)}
                />
            </View>
        </>
    );
};

export default CustomImage;

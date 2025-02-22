import { Text, type TextProps, StyleSheet } from 'react-native';

export type CustomTextProps = TextProps & {
    type?:
        | 'default'
        | 'title'
        | 'defaultSemiBold'
        | 'subtitle'
        | 'link'
        | 'small'
        | 'verysmall';
    customColor?: string;
};

export function CustomText({
    style,
    type = 'default',
    customColor,
    ...rest
}: CustomTextProps) {
    return (
        <Text
            allowFontScaling={false}
            style={[
                { color: customColor },
                type === 'default' ? styles.default : undefined,
                type === 'title' ? styles.title : undefined,
                type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
                type === 'subtitle' ? styles.subtitle : undefined,
                type === 'link' ? styles.link : undefined,
                type === 'small' ? styles.small : undefined,
                type === 'verysmall' ? styles.verysmall : undefined,
                style
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    verysmall: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular'
    },
    small: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular'
    },
    default: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular'
    },
    defaultSemiBold: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold'
    },
    title: {
        fontSize: 32,
        fontFamily: 'Poppins-Bold'
    },
    subtitle: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold'
    },
    link: {
        fontSize: 16,
        color: '#0a7ea4',
        fontFamily: 'Poppins-Regular'
    },
    poppinsBlack: {
        fontFamily: 'Poppins-Black'
    },
    poppinsBlackItalic: {
        fontFamily: 'Poppins-BlackItalic'
    },
    poppinsBold: {
        fontFamily: 'Poppins-Bold'
    },
    poppinsBoldItalic: {
        fontFamily: 'Poppins-BoldItalic'
    },
    poppinsExtraBold: {
        fontFamily: 'Poppins-ExtraBold'
    },
    poppinsExtraBoldItalic: {
        fontFamily: 'Poppins-ExtraBoldItalic'
    },
    poppinsExtraLight: {
        fontFamily: 'Poppins-ExtraLight'
    },
    poppinsExtraLightItalic: {
        fontFamily: 'Poppins-ExtraLightItalic'
    },
    poppinsItalic: {
        fontFamily: 'Poppins-Italic'
    },
    poppinsLight: {
        fontFamily: 'Poppins-Light'
    },
    poppinsLightItalic: {
        fontFamily: 'Poppins-LightItalic'
    },
    poppinsMedium: {
        fontFamily: 'Poppins-Medium'
    },
    poppinsMediumItalic: {
        fontFamily: 'Poppins-MediumItalic'
    },
    poppinsRegular: {
        fontFamily: 'Poppins-Regular'
    },
    poppinsSemiBold: {
        fontFamily: 'Poppins-SemiBold'
    },
    poppinsSemiBoldItalic: {
        fontFamily: 'Poppins-SemiBoldItalic'
    },
    poppinsThin: {
        fontFamily: 'Poppins-Thin'
    },
    poppinsThinItalic: {
        fontFamily: 'Poppins-ThinItalic'
    }
});

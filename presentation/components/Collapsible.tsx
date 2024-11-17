import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { CustomText } from './CustomText';

export function Collapsible({
    children,
    title
}: PropsWithChildren & { title: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <View>
            <TouchableOpacity
                style={styles.heading}
                onPress={() => setIsOpen((value) => !value)}
                activeOpacity={0.8}
            >
                <Ionicons
                    name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
                    size={18}
                    color={'#687076'}
                />
                <CustomText type='defaultSemiBold'>{title}</CustomText>
            </TouchableOpacity>
            {isOpen && <View style={styles.content}>{children}</View>}
        </View>
    );
}

const styles = StyleSheet.create({
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6
    },
    content: {
        marginTop: 6,
        marginLeft: 24
    }
});

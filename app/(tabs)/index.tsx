import { Image, StyleSheet, Platform, View } from 'react-native';
import { HelloWave } from '@/presentation/components/HelloWave';
import ParallaxScrollView from '@/presentation/components/ParallaxScrollView';
import { CustomText } from '@/presentation/components/CustomText';

export default function HomeScreen() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
            }
        >
            <View style={styles.titleContainer}>
                <CustomText type='title'>Hello World</CustomText>
                <HelloWave />
            </View>

            <View style={styles.stepContainer}>
                <CustomText type='subtitle'>Step 1: Try it</CustomText>
                <CustomText>
                    Edit{' '}
                    <CustomText type='defaultSemiBold'>
                        app/(tabs)/index.tsx
                    </CustomText>{' '}
                    to see changes. Press{' '}
                    <CustomText type='defaultSemiBold'>
                        {Platform.select({
                            ios: 'cmd + d',
                            android: 'cmd + m'
                        })}
                    </CustomText>{' '}
                    to open developer tools.
                </CustomText>
            </View>
            <View style={styles.stepContainer}>
                <CustomText type='subtitle'>Step 2: Explore</CustomText>
                <CustomText>
                    Tap the Explore tab to learn more about what's included in
                    this starter app.
                </CustomText>
            </View>
            <View style={styles.stepContainer}>
                <CustomText type='subtitle'>
                    Step 3: Get a fresh start
                </CustomText>
                <CustomText>
                    When you're ready, run{' '}
                    <CustomText type='defaultSemiBold'>
                        npm run reset-project
                    </CustomText>{' '}
                    to get a fresh{' '}
                    <CustomText type='defaultSemiBold'>app</CustomText>{' '}
                    directory. This will move the current{' '}
                    <CustomText type='defaultSemiBold'>app</CustomText> to{' '}
                    <CustomText type='defaultSemiBold'>app-example</CustomText>.
                </CustomText>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <CustomText type='subtitle'>Step 4: Code!</CustomText>
                <CustomText>
                    When you're ready, run{' '}
                    <CustomText type='defaultSemiBold'>
                        npm run reset-project
                    </CustomText>{' '}
                    to get a fresh{' '}
                    <CustomText type='defaultSemiBold'>app</CustomText>{' '}
                    directory. This will move the current{' '}
                    <CustomText type='defaultSemiBold'>app</CustomText> to{' '}
                    <CustomText type='defaultSemiBold'>app-example</CustomText>.
                </CustomText>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <CustomText type='subtitle'>Step 4: Code!</CustomText>
                <CustomText>
                    When you're ready, run{' '}
                    <CustomText type='defaultSemiBold'>
                        npm run reset-project
                    </CustomText>{' '}
                    to get a fresh{' '}
                    <CustomText type='defaultSemiBold'>app</CustomText>{' '}
                    directory. This will move the current{' '}
                    <CustomText type='defaultSemiBold'>app</CustomText> to{' '}
                    <CustomText type='defaultSemiBold'>app-example</CustomText>.
                </CustomText>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <CustomText type='subtitle'>Step 4: Code!</CustomText>
                <CustomText>
                    When you're ready, run{' '}
                    <CustomText type='defaultSemiBold'>
                        npm run reset-project
                    </CustomText>{' '}
                    to get a fresh{' '}
                    <CustomText type='defaultSemiBold'>app</CustomText>{' '}
                    directory. This will move the current{' '}
                    <CustomText type='defaultSemiBold'>app</CustomText> to{' '}
                    <CustomText type='defaultSemiBold'>app-example</CustomText>.
                </CustomText>
            </View>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute'
    }
});

import { CustomText } from '@/presentation/components/CustomText';
import axios from 'axios';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';

const TestPage = () => {
    const insets = useSafeAreaInsets();

    const { data: quotes, isLoading } = useQuery({
        queryKey: ['quotes'],
        queryFn: async () => {
            const data = await axios.get('https://catfact.ninja/fact');

            return data.data;
        },
        refetchOnMount: false,
        refetchOnReconnect: false
    });

    const { data: ip, isLoading: isLoadingIP } = useQuery({
        queryKey: ['ip'],
        queryFn: async () => {
            const data = await axios.get('https://api.ipify.org/?format=json');

            return data.data;
        },
        refetchOnMount: false,
        refetchOnReconnect: false
    });

    const { data: ipLocation, isLoading: isLoadingIPLocation } = useQuery({
        queryKey: ['ip-location'],
        queryFn: async () => {
            const data = await axios.get(`https://ipinfo.io/${ip.ip}/geo`);

            return data.data;
        },
        refetchOnMount: false,
        refetchOnReconnect: false,
        enabled: !isLoadingIP
    });

    const [count, setCount] = useState<number>(0);

    return (
        <>
            <View
                style={{
                    flex: 1,
                    paddingTop: insets.top + 8,
                    paddingHorizontal: 32
                }}
            >
                <ScrollView
                    style={{
                        flex: 1
                    }}
                >
                    <View
                        style={{
                            gap: 24,
                            flexDirection: 'column',
                            display: 'flex'
                        }}
                    >
                        {!isLoading && (
                            <View style={{ gap: 8, flexDirection: 'column' }}>
                                <CustomText type='subtitle'>
                                    Cats Fact of the day
                                </CustomText>
                                <CustomText type='default'>
                                    {quotes.fact}
                                </CustomText>
                            </View>
                        )}

                        {!isLoadingIP && (
                            <View style={{ gap: 8, flexDirection: 'column' }}>
                                <CustomText type='subtitle'>Your IP</CustomText>
                                <CustomText type='default'>{ip.ip}</CustomText>
                            </View>
                        )}

                        {!isLoadingIPLocation && (
                            <View style={{ gap: 8, flexDirection: 'column' }}>
                                <CustomText type='subtitle'>
                                    Your IP Location
                                </CustomText>
                                <CustomText type='default'>
                                    {JSON.stringify(ipLocation)}
                                </CustomText>
                            </View>
                        )}

                        <View style={{ gap: 8, flexDirection: 'column' }}>
                            <CustomText type='subtitle'>
                                Count : {count}
                            </CustomText>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flex: 1,
                                    gap: 16
                                }}
                            >
                                <Pressable
                                    style={{
                                        flex: 1,
                                        backgroundColor: 'red',
                                        alignItems: 'center'
                                    }}
                                    onPress={() =>
                                        setCount((state) => {
                                            console.log('test');
                                            return state === 0 ? 0 : state - 1;
                                        })
                                    }
                                >
                                    <CustomText style={{ color: 'white' }}>
                                        -
                                    </CustomText>
                                </Pressable>
                                <Pressable
                                    style={{
                                        flex: 1,
                                        backgroundColor: 'green',
                                        alignItems: 'center'
                                    }}
                                    onPress={() =>
                                        setCount((state) => state + 1)
                                    }
                                >
                                    <CustomText style={{ color: 'white' }}>
                                        +
                                    </CustomText>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    );
};

export default TestPage;

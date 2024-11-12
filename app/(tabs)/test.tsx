import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import axios from 'axios';
import { useState } from 'react';
import { Pressable, ScrollView } from 'react-native';
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
            <ThemedView
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
                    <ThemedView
                        style={{
                            gap: 24,
                            flexDirection: 'column',
                            display: 'flex'
                        }}
                    >
                        {!isLoading && (
                            <ThemedView
                                style={{ gap: 8, flexDirection: 'column' }}
                            >
                                <ThemedText type='subtitle'>
                                    Cats Fact of the day
                                </ThemedText>
                                <ThemedText type='default'>
                                    {quotes.fact}
                                </ThemedText>
                            </ThemedView>
                        )}

                        {!isLoadingIP && (
                            <ThemedView
                                style={{ gap: 8, flexDirection: 'column' }}
                            >
                                <ThemedText type='subtitle'>Your IP</ThemedText>
                                <ThemedText type='default'>{ip.ip}</ThemedText>
                            </ThemedView>
                        )}

                        {!isLoadingIPLocation && (
                            <ThemedView
                                style={{ gap: 8, flexDirection: 'column' }}
                            >
                                <ThemedText type='subtitle'>
                                    Your IP Location
                                </ThemedText>
                                <ThemedText type='default'>
                                    {JSON.stringify(ipLocation)}
                                </ThemedText>
                            </ThemedView>
                        )}

                        <ThemedView style={{ gap: 8, flexDirection: 'column' }}>
                            <ThemedText type='subtitle'>
                                Count : {count}
                            </ThemedText>
                            <ThemedView
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
                                        setCount((state) =>
                                            state === 0 ? 0 : state - 1
                                        )
                                    }
                                >
                                    <ThemedText style={{ color: 'white' }}>
                                        -
                                    </ThemedText>
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
                                    <ThemedText style={{ color: 'white' }}>
                                        +
                                    </ThemedText>
                                </Pressable>
                            </ThemedView>
                        </ThemedView>
                    </ThemedView>
                </ScrollView>
            </ThemedView>
        </>
    );
};

export default TestPage;

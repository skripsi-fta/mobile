import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key: string, value: object) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error setting item:', error);
    }
};

export const getItem = async <T>(key: string): Promise<T | null> => {
    try {
        const value = await AsyncStorage.getItem(key);

        return value != null ? (JSON.parse(value) as T) : null;
    } catch (error) {
        console.error('Error getting item:', error);
        return null;
    }
};

export const removeItem = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing item:', error);
    }
};

export const getAllKeys = async () => {
    try {
        return await AsyncStorage.getAllKeys();
    } catch (error) {
        console.error('Error getting all keys:', error);
        return [];
    }
};

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Storage {

    static async storeData(key: string, data: any) {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
        }
    }

    static async getItem(key: string) {
        try {
            const value = await AsyncStorage.getItem(key);
            return value;
        } catch (e) {
        }
    }

    static async removeItem(key: string) {
        try {
            return await AsyncStorage.removeItem(key);
        } catch (e) {
            return e;
        }
    }

    static async mergeItem(key: string, data: any) {
        try {
            return await AsyncStorage.mergeItem(key, JSON.stringify(data));
        } catch (e) {
            return e;
        }
    }

    static async clear() {
        try {
            return await AsyncStorage.clear();
        } catch (error) {
            return error;
        }
    }
}




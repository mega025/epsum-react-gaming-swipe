import AsyncStorage from "@react-native-async-storage/async-storage";

export const LocalStorage = () => {
    const save = async (key: string, value: any) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.error("Error while saving local storage: " + error);
        }
    }

    const getItem = async (key: string) => {
        try {
            return await AsyncStorage.getItem(key);
        } catch (error) {
            console.error("Error while getting item in local storage: " + error);
        }
    }

    const removeItem = async (key: string) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error("Error while deleting item in local storage: " + error);
        }
    }

    return {save, getItem, removeItem}


}
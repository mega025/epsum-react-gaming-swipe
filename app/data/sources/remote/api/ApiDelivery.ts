import axios from "axios";
import {removeUserUseCase} from "../../../../domain/usesCases/userLocal/removeUser";
import {Account} from "../../../../presentation/views/account/Account"
import {useNavigation} from "@react-navigation/native";
import {PropsStackNavigation} from "../../../../presentation/interfaces/StackNav";
import Toast from "react-native-toast-message";
import {clearTokens, loadTokens, saveTokens} from "../../local/secure/TokenStorage";

export const API_BASE_URL = "http://192.168.2.11:8000/api";

const ApiDelivery = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

ApiDelivery.interceptors.request.use(async (config) => {
    const creds = await loadTokens();
    if (creds) {
        const { access } = creds;
        config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
});

ApiDelivery.interceptors.response.use(
    successResponse => successResponse,
    async errorResponse => {
        const originalRequest = errorResponse.config;

        if (errorResponse.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const tokens = await loadTokens();
            if (!tokens) return Promise.reject(errorResponse);

            try {
                const response = await ApiDelivery.post(
                    "/users/token/refresh",
                    { refresh: tokens.refresh });

                const newAccessToken = response.data.access;
                await saveTokens(response.data.access, response.data.refresh);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
            } catch (refreshError) {
                await removeUserUseCase()
                await clearTokens()
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(errorResponse);
    }
);

export{ApiDelivery};
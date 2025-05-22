import axios from "axios";
import {removeUserUseCase} from "../../../../domain/usesCases/userLocal/removeUser";
import {Account} from "../../../../presentation/views/account/Account"
import {useNavigation} from "@react-navigation/native";
import {PropsStackNavigation} from "../../../../presentation/interfaces/StackNav";
import Toast from "react-native-toast-message";
const ApiDelivery = axios.create({
    baseURL: "http://10.0.2.2:8000/api",
    headers: {
        "Content-Type": "application/json"
    }
})

export const setupValidTokenInterceptor = (navigation: any) => {
    ApiDelivery.interceptors.response.use(
        response => response,
        async error => {
            if (error.response && error.response.data.code === "token_not_valid") {
                await removeUserUseCase();
                navigation.replace("TabViewLoginRegister");
                Toast.show({
                    "type": "error",
                    "text1": "Session expired",
                })
            }
            return Promise.reject(error);
        }
    );
};

export{ApiDelivery};
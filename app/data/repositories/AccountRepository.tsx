import {GetUserInterface, UpdateUserDTO} from "../../domain/entities/User";
import {AccountRepositoryInterface} from "../../domain/repositories/AcountRepositoryInterface";
import {AxiosError} from "axios";
import {ApiDelivery} from "../sources/remote/api/ApiDelivery";
import {ApiDeliveryResponse} from "../sources/remote/models/ApiDeliveryResponse";
import {PasswordsDTO} from "../../domain/entities/UpdatePasswordDTO";
import Toast from "react-native-toast-message";
import {UseUserLocalStorage} from "../../presentation/hooks/UseUserLocalStorage";


export class AccountRepository implements AccountRepositoryInterface {

    async getUser(slug: string, token: string): Promise<GetUserInterface> {
        try {
            const response = await ApiDelivery.get(`users/${slug}`, {
                headers: {
                    Authorization:"Bearer "+token,
                }
            });
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError<{error: string}>);
            console.log(e.response);
            return Promise.reject(e.response);
        }
    }

    async updateUser(slug: string, token: string, data: UpdateUserDTO | FormData | undefined): Promise<ApiDeliveryResponse> {
        try {
            const isFormData = data instanceof FormData;
            console.log(isFormData);
            const response = await ApiDelivery.post(`users/update/${slug}`, data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        ...(isFormData ? {"Content-Type": " multipart/form-data"} : { 'Content-Type': 'application/json' }),

                    },
                });
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError<{error: string}>);
            console.log(e.response);
            return Promise.reject(e.response);
        }
    }

    async updateUserPassword(slug: string, token: string, data: PasswordsDTO): Promise<ApiDeliveryResponse> {
        try {
            const response = await ApiDelivery.post(`users/update-password/${slug}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError<{error: string}>);
            console.log(e.response?.data.error);
            Toast.show({
                type: "error",
                text1: e.response?.data.error,
            })
            return Promise.reject(e.response);
        }
    }
}
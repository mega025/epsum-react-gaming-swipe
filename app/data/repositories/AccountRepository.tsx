import {GetUserInterface, UpdateUserDTO} from "../../domain/entities/User";
import {AccountRepositoryInterface} from "../../domain/repositories/AcountRepositoryInterface";
import {AxiosError} from "axios";
import {ApiDelivery} from "../sources/remote/api/ApiDelivery";
import {ApiDeliveryResponse} from "../sources/remote/models/ApiDeliveryResponse";


export class AccountRepository implements AccountRepositoryInterface {
    async getUser(slug: string): Promise<GetUserInterface> {
        try {
            const response = await ApiDelivery.get(`users/${slug}`);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError<{error: string}>);
            console.error(e.response?.data.error);
            return Promise.reject(e.response);
        }
    }

    async updateUser(slug: string, data: UpdateUserDTO | FormData | undefined): Promise<ApiDeliveryResponse> {
        try {
            const isFormData = data instanceof FormData;
            console.log(isFormData);
            const response = await ApiDelivery.post(`users/update/${slug}`, data,
                {
                    headers: {
                        ...(isFormData ? {"Content-Type": " multipart/form-data"} : { 'Content-Type': 'application/json' }),

                    },
                });
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError<{error: string}>);
            console.error(e.response);
            return Promise.reject(e.response);
        }
    }
}
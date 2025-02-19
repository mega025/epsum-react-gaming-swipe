
import {AuthRepositoryInterface} from "../../domain/repositories/AuthRepositoryInterface";
import {LoginUserInterface, UserInterface} from "../../domain/entities/User";
import {ApiDeliveryResponse} from "../sources/remote/models/ApiDeliveryResponse";
import {Axios, AxiosError} from "axios";
import {ApiDelivery} from "../sources/remote/api/ApiDelivery";

export class AuthRepository implements AuthRepositoryInterface {
    async register(user: UserInterface): Promise<ApiDeliveryResponse> {
        try {
            const response = await ApiDelivery.post("users/create", user);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError)
            console.log("Error: "+ JSON.stringify(e.response?.data));
            return Promise.resolve(JSON.parse(JSON.stringify(e.response?.data)) as ApiDeliveryResponse);
        }
    }

    async login(user: LoginUserInterface): Promise<ApiDeliveryResponse> {
        try {
            const response = await ApiDelivery.post("users/login", user);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError)
            console.log("Error: "+ JSON.stringify(e.response?.data));
            return Promise.resolve(JSON.parse(JSON.stringify(e.response?.data)) as ApiDeliveryResponse);
        }
    }

}
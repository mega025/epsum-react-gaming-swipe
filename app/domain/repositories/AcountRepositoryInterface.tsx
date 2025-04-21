import {ApiDeliveryResponse} from "../../data/sources/remote/models/ApiDeliveryResponse";
import {GetUserInterface, UpdateUserDTO, UserInterface} from "../entities/User";


export interface AccountRepositoryInterface {
    getUser: (slug: string) => Promise<GetUserInterface>;
    updateUser: (slug: string, data?: UpdateUserDTO | FormData) => Promise<ApiDeliveryResponse>
}
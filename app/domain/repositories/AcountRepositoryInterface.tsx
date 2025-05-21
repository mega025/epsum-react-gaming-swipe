import {ApiDeliveryResponse} from "../../data/sources/remote/models/ApiDeliveryResponse";
import {GetUserInterface, UpdateUserDTO, UserInterface} from "../entities/User";
import {PasswordsDTO} from "../entities/UpdatePasswordDTO";


export interface AccountRepositoryInterface {
    getUser: (slug: string, token: string) => Promise<GetUserInterface>;
    updateUser: (slug: string, token: string, data: UpdateUserDTO | FormData) => Promise<ApiDeliveryResponse>
    updateUserPassword: (slug: string, token: string, data: PasswordsDTO) => Promise<ApiDeliveryResponse>
}
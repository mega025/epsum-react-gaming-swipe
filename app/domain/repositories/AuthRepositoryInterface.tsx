import {Platform} from "react-native";
import {LoggedUserInterface, LoginUserInterface, UserInterface} from "../entities/User";
import {ApiDeliveryResponse} from "../../data/sources/remote/models/ApiDeliveryResponse";

export interface AuthRepositoryInterface {
    register: (user: UserInterface) => Promise<ApiDeliveryResponse>;
    login: (user: LoginUserInterface) => Promise<LoggedUserInterface>;
}
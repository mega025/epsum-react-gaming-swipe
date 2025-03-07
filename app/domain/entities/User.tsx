import {PersonalDetails} from "./PersonalDetails";
import {Game} from "./Game";

export interface UserInterface {
    userId?: number;
    email: string;
    personalDetails: PersonalDetails;
    listFavGames: Game[]
}

export interface LoginUserInterface {
    email: string;
    password: string;
}

export interface LoggedUserInterface extends UserInterface {
    userId?: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    image_url: string;
    token: string;
}
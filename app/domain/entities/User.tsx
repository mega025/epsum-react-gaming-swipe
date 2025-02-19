import {PersonalDetails} from "./PersonalDetails";
import {Game} from "./Game";

export interface UserInterface {
    id: number;
    email: string;
    personalDetails: PersonalDetails;
    listFavGames: Game[]
}

export interface LoginUserInterface {
    email: string;
    password: string;
}

export interface LoggedUserInterface extends UserInterface {
    token: string;
}
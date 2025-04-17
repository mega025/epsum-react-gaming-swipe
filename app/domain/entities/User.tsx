import {Game} from "./Game";

export interface UserInterface {
    name: string
    last_name: string
    email: string;
    favorite_games?: Game[]
    password: string
}

export interface LoginUserInterface {
    email: string;
    password: string;
}

export interface LoggedUserInterface {
    slug: string;
    access_token: string;
    refresh_token: string
}
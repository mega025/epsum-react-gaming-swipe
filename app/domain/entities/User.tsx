import {Game} from "./Game";

export interface UserInterface {
    name: string
    last_name: string
    email: string;
    favorite_games?: Game[]
    password: string
}

export interface GetUserInterface {
    name: string
    last_name: string
    email: string
    image: string
}

export type UpdateUserDTO = Partial<Pick<GetUserInterface, "name" | "last_name">>

export interface LoginUserInterface {
    email: string;
    password: string;
}

export interface LoggedUserInterface {
    slug: string;
    access_token: string;
    refresh_token: string
}
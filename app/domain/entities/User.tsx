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

export interface GetSearchUserInterface {
    name: string
    last_name: string
    image: string
    slug: string
}


export type UpdateUserDTO = Partial<Pick<GetUserInterface, "name" | "last_name">>
export type SearchUserDTO = Pick<GetUserInterface, "name" | "last_name">

export interface LoginUserInterface {
    email: string;
    password: string;
}

export interface LoggedUserInterface {
    slug: string;
    access_token?: string;
    refresh_token?: string
}
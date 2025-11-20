import {ApiDeliveryResponse} from "../../data/sources/remote/models/ApiDeliveryResponse";
import {Game} from "../entities/Game";
import {GetSearchUserInterface, UpdateUserDTO} from "../entities/User";


export interface SearchRepositoryInterface {
    searchMostAnticipatedGames: () => Promise<Game[]>;
    searchGamesByUserInput: (input: string, page: number) => Promise<Game[]>;
    searchUsers: (userParametersDTO: UpdateUserDTO, token: string) => Promise<GetSearchUserInterface[]>;
}
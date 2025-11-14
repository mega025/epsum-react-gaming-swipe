import {ApiDeliveryResponse} from "../../data/sources/remote/models/ApiDeliveryResponse";
import {Game} from "../entities/Game";
import {GetSearchUserInterface, SearchUserDTO} from "../entities/User";


export interface SearchRepositoryInterface {
    searchMostAnticipatedGames: () => Promise<Game[]>;
    searchGamesByUserInput: (input: string, page: number) => Promise<Game[]>;
    getFirst15Companies: () => Promise<any[]>;
    searchUsers: (userParametersDTO: SearchUserDTO, token: string) => Promise<GetSearchUserInterface[]>;
}
import {ApiDeliveryResponse} from "../../data/sources/remote/models/ApiDeliveryResponse";
import {Game} from "../entities/Game";


export interface SearchRepositoryInterface {
    searchMostAnticipatedGames: () => Promise<Game[]>;
    searchGamesByUserInput: (input: string, page: number) => Promise<Game[]>;
}
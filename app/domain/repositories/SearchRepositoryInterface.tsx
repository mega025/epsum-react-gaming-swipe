import {ApiDeliveryResponse} from "../../data/sources/remote/models/ApiDeliveryResponse";
import {Game} from "../entities/Game";
import {Company} from "../entities/Company";


export interface SearchRepositoryInterface {
    searchMostAnticipatedGames: () => Promise<Game[]>;
    searchGamesByUserInput: (input: string, page: number) => Promise<Game[]>;
    getFirst15Companies: () => Promise<any[]>;
}
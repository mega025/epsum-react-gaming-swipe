import {FavGame} from "../entities/FavGame";
import {ApiDeliveryResponse} from "../../data/sources/remote/models/ApiDeliveryResponse";


export interface FavGamesRepositoryInterface {
    loadFavGames(slug: string, token: string): Promise<FavGame[]>;
    loadPlayedGames(slug: string, token: string): Promise<FavGame[]>;
    deleteFavGame(slug: string, id_api: number, token: string): Promise<ApiDeliveryResponse>;
    deletePlayedGame(slug: string, id_api: number, token: string): Promise<ApiDeliveryResponse>;
    addPlayedGame(slug: string, favgame: FavGame, token: string): Promise<ApiDeliveryResponse>;
}
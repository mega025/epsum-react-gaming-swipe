import {FavGame} from "../entities/FavGame";
import {ApiDeliveryResponse} from "../../data/sources/remote/models/ApiDeliveryResponse";


export interface FavGamesRepositoryInterface {
    loadFavGames(slug: string): Promise<FavGame[]>;
    deleteFavGame(slug: string, position: number): Promise<ApiDeliveryResponse>;
}
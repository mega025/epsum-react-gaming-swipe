import {FavGame} from "../entities/FavGame";
import {ApiDeliveryResponse} from "../../data/sources/remote/models/ApiDeliveryResponse";


export interface FavGamesRepositoryInterface {
    loadFavGames(userId: number): Promise<FavGame[]>;
    deleteFavGame(userId: number, position: number): Promise<ApiDeliveryResponse>;
}
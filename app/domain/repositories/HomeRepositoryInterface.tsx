import {ApiDeliveryResponse} from "../../data/sources/remote/models/ApiDeliveryResponse";
import {Game} from "../entities/Game";
import {FavGame} from "../entities/FavGame";

export interface HomeRepositoryInterface {
    refillGamesFromSwiper: () => Promise<Game[]>;
    addGameToFavorite: (userId: number, videogame: FavGame) => Promise<ApiDeliveryResponse>;
}
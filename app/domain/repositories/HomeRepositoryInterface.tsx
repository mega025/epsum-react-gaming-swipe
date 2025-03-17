import {ApiDeliveryResponse} from "../../data/sources/remote/models/ApiDeliveryResponse";
import {Game} from "../entities/Game";

export interface HomeRepositoryInterface {
    refillGamesFromSwiper: () => Promise<Game[]>;
}
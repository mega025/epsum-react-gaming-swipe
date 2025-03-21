import {HomeRepositoryInterface} from "../../domain/repositories/HomeRepositoryInterface";
import {ApiDeliveryResponse} from "../sources/remote/models/ApiDeliveryResponse";
import {ApiDelivery} from "../sources/remote/api/ApiDelivery";
import {IgdbApiDelivery} from "../sources/remote/igdbAPI/IgdbApiDelivery";
import {AxiosError} from "axios";
import {Game} from "../../domain/entities/Game";
import {FavGame} from "../../domain/entities/FavGame";
import Toast from "react-native-toast-message";

export class HomeRepository implements HomeRepositoryInterface {
    async refillGamesFromSwiper(): Promise<Game[]> {
        try {
            const randomOffset = Math.round(((Math.random()*9100)*100)/100).toFixed(0)
            const response = await IgdbApiDelivery.post(
                "/games",
                "fields name, " +
                "cover.url, " +
                "genres.name, " +
                "platforms.abbreviation, " +
                "rating, release_dates.y; limit 10; where rating > 70; offset "+randomOffset+";")

            return Promise.resolve(response.data)
        } catch (error) {
            let e = error as AxiosError;
            console.log(e.message);
            return Promise.reject(e);
        }
    }

    async addGameToFavorite(userId: number, videogame: FavGame): Promise<ApiDeliveryResponse> {
        try {
            const response = await ApiDelivery.post(`/favgames/add/${userId}`, videogame);
            return Promise.resolve(response.data)
        }  catch (error)  {
            const e = error as AxiosError;
            Toast.show({
                type: 'error',
                text1: e.message,
            })
            return Promise.resolve(JSON.parse(JSON.stringify(e.response?.data)) as ApiDeliveryResponse);
        }
    }

}
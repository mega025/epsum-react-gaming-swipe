import {HomeRepositoryInterface} from "../../domain/repositories/HomeRepositoryInterface";
import {ApiDeliveryResponse} from "../sources/remote/models/ApiDeliveryResponse";
import {ApiDelivery} from "../sources/remote/api/ApiDelivery";
import {IgdbApiDelivery} from "../sources/remote/igdbAPI/IgdbApiDelivery";
import {AxiosError} from "axios";
import {Game, Platform} from "../../domain/entities/Game";
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
                "platforms.name, " +
                "rating, release_dates.y; limit 15; where rating > 70; offset "+randomOffset+";")

            return Promise.resolve(response.data)
        } catch (error) {
            let e = error as AxiosError;
            console.log(e.message);
            return Promise.reject(e);
        }
    }

    async refillGamesFromSwiperWithFilters(platforms: Platform[], genres: Platform[]): Promise<Game[]> {
        try {
            let query = ""
            let response
            const genresToString = genres.map(item => item.id).join(', ');
            const platformsToString = platforms.map(item => item.id).join(', ');
                if (genres.length > 0 && platforms.length > 0) {
                    query = 'where genres = ['+genresToString+'] & platforms = ['+platformsToString+'] & rating > 50;'
                } if (genres.length > 0 && platforms.length === 0) {
                    query = 'where genres = ['+genresToString+'] & rating > 50;'
                } if (genres.length === 0 && platforms.length > 0) {
                    query = 'where platforms = ['+platformsToString+'] & rating > 50;'
                }
                console.log(query);
                const maxGames = await IgdbApiDelivery.post(
                    "/games/count",
                    "fields name, " +
                    "cover.url, " +
                    "genres.name, " +
                    "platforms.abbreviation, " +
                    "rating, release_dates.y;"+
                    query)

                const maxOffset = Math.max(0, maxGames.data?.count - 10);
                const randomOffset = Math.round(((Math.random()*maxOffset)*100)/100).toFixed(0)
                response = await IgdbApiDelivery.post(
                    "/games",
                    "fields name, " +
                    "cover.url, " +
                    "genres.name, " +
                    "platforms.abbreviation, " +
                    "rating, release_dates.y; limit 15; offset "+randomOffset+";"+
                    query)
            return Promise.resolve(response.data)
        } catch (error) {
            let e = error as AxiosError;
            console.log(e.message);
            return Promise.reject(e);
        }
    }

    async addGameToFavorite(slug: string, videogame: FavGame): Promise<ApiDeliveryResponse> {
        try {
            const response = await ApiDelivery.post(`/favgames/add/${slug}`, videogame);
            return Promise.resolve(response.data)
        }  catch (error)  {
            const e = (error as AxiosError<{error:string}>);
            console.log(e.response);
            Toast.show({
                type: 'error',
                text1: e.response?.data.error,
            })
            return Promise.reject(e.response?.data.error);
        }
    }

}
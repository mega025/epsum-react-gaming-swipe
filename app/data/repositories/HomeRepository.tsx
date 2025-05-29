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

    async refillGamesFromSwiperWithFilters(platform: string | null, genre: string | null): Promise<Game[]> {
        try {
            let platformFilter = ""
            let genreFilter = ""
            let response
            if (platform !== null && genre !== null) {
                const maxGames = await IgdbApiDelivery.post(
                    "/games/count",
                    "fields name, " +
                    "cover.url, " +
                    "genres.name, " +
                    "platforms.abbreviation, " +
                    "rating, release_dates.y; " +
                    "limit 10; " +
                    "where platforms.name = \""+platform+"\" & genres.name = \"" + genre + "\" & rating > 50;"
                )
                const maxOffset = Math.max(0, maxGames.data?.count - 10);
                const randomOffset = Math.round(((Math.random()*maxOffset)*100)/100).toFixed(0)

                response = await IgdbApiDelivery.post(
                    "/games",
                    "fields name, " +
                    "cover.url, " +
                    "genres.name, " +
                    "platforms.abbreviation, " +
                    "rating, release_dates.y; " +
                    "limit 10; " +
                    "offset " + randomOffset + "; " +
                    "where platforms.name = \""+platform+"\" & genres.name = \"" + genre + "\" & rating > 50;")
            } else {
                if (platform !== null) {
                    platformFilter = 'where platforms.name = "'+platform+'" & rating > 50;'
                }
                if (genre !== null) {
                    genreFilter = 'where genres.name = "'+genre+'" & rating > 50;'
                }
                const maxGames = await IgdbApiDelivery.post(
                    "/games/count",
                    "fields name, " +
                    "cover.url, " +
                    "genres.name, " +
                    "platforms.abbreviation, " +
                    "rating, release_dates.y; limit 10;"+
                    platformFilter+
                    genreFilter)

                const maxOffset = Math.max(0, maxGames.data?.count - 10);
                const randomOffset = Math.round(((Math.random()*maxOffset)*100)/100).toFixed(0)
                response = await IgdbApiDelivery.post(
                    "/games",
                    "fields name, " +
                    "cover.url, " +
                    "genres.name, " +
                    "platforms.abbreviation, " +
                    "rating, release_dates.y; limit 10; offset "+randomOffset+";"+
                    platformFilter+
                    genreFilter)
            }
            return Promise.resolve(response.data)
        } catch (error) {
            let e = error as AxiosError;
            console.log(e.message);
            return Promise.reject(e);
        }
    }

    async addGameToFavorite(slug: string, videogame: FavGame, token: string): Promise<ApiDeliveryResponse> {
        try {
            const response = await ApiDelivery.post(`/favgames/add/${slug}`, videogame,
                {
                    headers: {
                        Authorization: "Bearer "+token
                    }
                });
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
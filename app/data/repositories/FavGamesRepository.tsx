import {FavGamesRepositoryInterface} from "../../domain/repositories/FavGamesRepositoryInterface";
import {FavGame} from "../../domain/entities/FavGame";
import {AxiosError} from "axios";
import {ApiDeliveryResponse} from "../sources/remote/models/ApiDeliveryResponse";
import {ApiDelivery} from "../sources/remote/api/ApiDelivery";
import Toast from "react-native-toast-message";


export class FavGamesRepository implements FavGamesRepositoryInterface {
    async loadFavGames(slug: string): Promise<FavGame[]> {
        try {
            const response = await ApiDelivery.get(`/favgames/user/${slug}`)
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log("Error: "+ JSON.stringify(e.response?.data));
            return Promise.reject(JSON.parse(JSON.stringify(e.response?.data)) as ApiDeliveryResponse);
        }
    }

    async deleteFavGame(slug: string, position: number): Promise<ApiDeliveryResponse> {
        try {
            const response = await ApiDelivery.delete(`/favgames/delete/${slug}/${position}`);
            Toast.show({
                type: 'success',
                text1: response.data.message,
            });
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log("Error: "+ JSON.stringify(e.response?.data));
            return Promise.reject(JSON.parse(JSON.stringify(e.response?.data)) as ApiDeliveryResponse);
        }
    }

    async addPlayedGame(slug: string, favgame: FavGame): Promise<ApiDeliveryResponse> {
        try {
            const response = await ApiDelivery.post(`/favgames-played/add/${slug}`, favgame);
            Toast.show({
                type: 'success',
                text1: response.data.message,
            });
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError<{error:string}>);
            console.log("Error: "+JSON.stringify(e.response?.data));
            return Promise.reject(e.response?.data);
        }
    }

    async deletePlayedGame(slug: string, position: number): Promise<ApiDeliveryResponse> {
        try {
            const response = await ApiDelivery.delete(`/favgames-played/delete/${slug}/${position}`);
            Toast.show({
                type: 'success',
                text1: response.data.message,
            });
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError<{error:string}>);
            console.log("Error: "+ JSON.stringify(e.response?.data));
            return Promise.reject(e.response?.data);
        }
    }

    async loadPlayedGames(slug: string): Promise<FavGame[]> {
        try {
            const response = await ApiDelivery.get(`/favgames-played/user/${slug}`)
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError<{error:string}>);
            console.log("Error: "+ JSON.stringify(e.response?.data));
            return Promise.reject(e.response?.data);
        }
    }
}
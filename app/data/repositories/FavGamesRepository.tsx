import {FavGamesRepositoryInterface} from "../../domain/repositories/FavGamesRepositoryInterface";
import {FavGame} from "../../domain/entities/FavGame";
import {AxiosError} from "axios";
import {ApiDeliveryResponse} from "../sources/remote/models/ApiDeliveryResponse";
import {ApiDelivery} from "../sources/remote/api/ApiDelivery";
import Toast from "react-native-toast-message";


export class FavGamesRepository implements FavGamesRepositoryInterface {
    async loadFavGames(userId: number): Promise<FavGame[]> {
        try {
            const response = await ApiDelivery.get(`/favgames/user/${userId}`)
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log("Error: "+ JSON.stringify(e.response?.data));
            return Promise.reject(JSON.parse(JSON.stringify(e.response?.data)) as ApiDeliveryResponse);
        }
    }

    async deleteFavGame(userId: number, position: number): Promise<ApiDeliveryResponse> {
        try {
            const response = await ApiDelivery.post(`/favgames/delete/${userId}`, position);
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
}
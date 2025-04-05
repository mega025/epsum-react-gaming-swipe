import {HomeRepository} from "../../../data/repositories/HomeRepository";
import {FavGame} from "../../entities/FavGame";

const {addGameToFavorite} = new HomeRepository()

export const addGameToFavoriteUseCase = async (userId: number, videogame: FavGame) => {
    return await addGameToFavorite(userId, videogame)
}

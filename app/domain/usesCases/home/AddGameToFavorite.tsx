import {HomeRepository} from "../../../data/repositories/HomeRepository";
import {FavGame} from "../../entities/FavGame";

const {addGameToFavorite} = new HomeRepository()

export const addGameToFavoriteUseCase = async (slug: string, videogame: FavGame, token: string) => {
    return await addGameToFavorite(slug, videogame, token)
}

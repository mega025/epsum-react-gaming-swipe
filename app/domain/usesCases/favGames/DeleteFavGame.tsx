import {FavGamesRepositoryInterface} from "../../repositories/FavGamesRepositoryInterface";
import {FavGamesRepository} from "../../../data/repositories/FavGamesRepository";


const {deleteFavGame} = new FavGamesRepository()

export const deleteFavGameUseCase = async (slug: string, id_api: number) => {
    return await deleteFavGame(slug, id_api);
}
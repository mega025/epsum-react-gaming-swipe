import {FavGamesRepositoryInterface} from "../../repositories/FavGamesRepositoryInterface";
import {FavGamesRepository} from "../../../data/repositories/FavGamesRepository";


const {deleteFavGame} = new FavGamesRepository()

export const deleteFavGameUseCase = async (slug: string, position: number) => {
    return await deleteFavGame(slug, position);
}
import {FavGamesRepositoryInterface} from "../../repositories/FavGamesRepositoryInterface";
import {FavGamesRepository} from "../../../data/repositories/FavGamesRepository";


const {deletePlayedGame} = new FavGamesRepository()

export const deletePlayedGameUseCase = async (slug: string, position: number) => {
    return await deletePlayedGame(slug, position);
}
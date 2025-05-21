import {FavGamesRepositoryInterface} from "../../repositories/FavGamesRepositoryInterface";
import {FavGamesRepository} from "../../../data/repositories/FavGamesRepository";


const {deletePlayedGame} = new FavGamesRepository()

export const deletePlayedGameUseCase = async (slug: string, id_api: number, token: string) => {
    return await deletePlayedGame(slug, id_api, token);
}
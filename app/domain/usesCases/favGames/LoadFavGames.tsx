import {FavGamesRepositoryInterface} from "../../repositories/FavGamesRepositoryInterface";
import {FavGamesRepository} from "../../../data/repositories/FavGamesRepository";


const {loadFavGames} = new FavGamesRepository();

export const loadFavGamesUseCase = async (slug: string, token: string) => {
    return await loadFavGames(slug, token);
}
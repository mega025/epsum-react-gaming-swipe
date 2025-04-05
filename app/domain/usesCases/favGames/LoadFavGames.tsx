import {FavGamesRepositoryInterface} from "../../repositories/FavGamesRepositoryInterface";
import {FavGamesRepository} from "../../../data/repositories/FavGamesRepository";


const {loadFavGames} = new FavGamesRepository();

export const loadFavGamesUseCase = async (userId: number) => {
    return await loadFavGames(userId);
}
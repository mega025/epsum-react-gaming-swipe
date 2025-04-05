import {FavGamesRepositoryInterface} from "../../repositories/FavGamesRepositoryInterface";
import {FavGamesRepository} from "../../../data/repositories/FavGamesRepository";


const {deleteFavGame} = new FavGamesRepository()

export const deleteFavGameUseCase = async (userId: number, position: number) => {
    return await deleteFavGame(userId, position);
}
import {FavGamesRepository} from "../../../data/repositories/FavGamesRepository";
import {FavGame} from "../../entities/FavGame";


const {addPlayedGame} = new FavGamesRepository()

export const addPlayedGameUseCase = async (slug: string, favgame: FavGame) => {
    return await addPlayedGame(slug, favgame);
}
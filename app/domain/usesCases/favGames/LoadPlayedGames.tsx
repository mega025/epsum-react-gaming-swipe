import {FavGamesRepository} from "../../../data/repositories/FavGamesRepository";


const {loadPlayedGames} = new FavGamesRepository()

export const loadPlayedGamesUseCase = async (slug: string, token: string) => {
    return await loadPlayedGames(slug, token);
}
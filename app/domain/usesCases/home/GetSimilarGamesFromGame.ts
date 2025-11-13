import {HomeRepository} from "../../../data/repositories/HomeRepository";


const {getSimilarGamesFromGame} = new HomeRepository()

export const getSimilarGamesFromGameUseCase = async (gameId: number) => {
    return await getSimilarGamesFromGame(gameId)
}
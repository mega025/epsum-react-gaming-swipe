import {GameDetailsRepository} from "../../../data/repositories/GameDetailsRepository";


const {loadGameDetails} = new GameDetailsRepository()

export const loadGameDetailsUseCase = async (gameId: number) => {
    return await loadGameDetails(gameId)
}
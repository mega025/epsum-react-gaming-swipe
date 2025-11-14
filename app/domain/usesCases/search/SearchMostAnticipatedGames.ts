import {SearchRepository} from "../../../data/repositories/SearchRepository";


const {searchMostAnticipatedGames} = new SearchRepository()

export const searchMostAnticipatedGamesUseCase = async () => {
    return await searchMostAnticipatedGames()
}
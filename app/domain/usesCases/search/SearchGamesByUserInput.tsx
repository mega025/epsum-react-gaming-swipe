import {SearchRepository} from "../../../data/repositories/SearchRepository";


const {searchGamesByUserInput} = new SearchRepository()

export const searchGamesByUserInputUseCase = async (input: string, page: number) => {
    return await searchGamesByUserInput(input, page);
}
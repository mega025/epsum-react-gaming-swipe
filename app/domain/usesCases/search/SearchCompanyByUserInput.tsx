import {SearchRepository} from "../../../data/repositories/SearchRepository";


const {searchCompanyByUserInput} = new SearchRepository()

export const searchCompanyByUserInputUseCase = async (input: string, page: number) => {
    return await searchCompanyByUserInput(input, page);
}
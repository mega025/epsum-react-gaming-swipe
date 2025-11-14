import {SearchRepository} from "../../../data/repositories/SearchRepository";


const {getFirst15Companies} = new SearchRepository()

export const searchCompanyByUserInputUseCase = async () => {
    return await getFirst15Companies();
}
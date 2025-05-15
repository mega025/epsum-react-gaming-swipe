import {GameDetailsRepository} from "../../../data/repositories/GameDetailsRepository";


const {loadCompanyDetails} = new GameDetailsRepository();

export const loadCompanyDetailsUseCase = async (companyId: number) => {
    return await loadCompanyDetails(companyId);
}
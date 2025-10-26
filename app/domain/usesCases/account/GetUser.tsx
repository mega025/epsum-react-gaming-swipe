import {AccountRepository} from "../../../data/repositories/AccountRepository";


const {getUser} = new AccountRepository()

export const getUserDBUseCase = async (slug: string) => {
    return await getUser(slug);
}
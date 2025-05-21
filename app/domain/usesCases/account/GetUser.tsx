import {AccountRepository} from "../../../data/repositories/AccountRepository";


const {getUser} = new AccountRepository()

export const getUserDBUseCase = async (slug: string, token: string) => {
    return await getUser(slug, token);
}
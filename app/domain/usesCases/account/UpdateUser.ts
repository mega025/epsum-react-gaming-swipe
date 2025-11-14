import {AccountRepository} from "../../../data/repositories/AccountRepository";
import {UpdateUserDTO} from "../../entities/User";


const {updateUser} = new AccountRepository()

export const updateUserUseCase = async (slug: string, data: UpdateUserDTO | FormData | undefined) => {
    return await updateUser(slug, data)
}
import {AccountRepository} from "../../../data/repositories/AccountRepository";
import {PasswordsDTO} from "../../entities/UpdatePasswordDTO";


const {updateUserPassword} = new AccountRepository()

export const updatePasswordUseCase  = async (slug: string, data: PasswordsDTO) => {
    return await updateUserPassword(slug, data)
}
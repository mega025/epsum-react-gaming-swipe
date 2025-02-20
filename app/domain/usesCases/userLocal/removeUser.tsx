import {UserLocalRepository} from "../../../data/repositories/UserLocalRepository";
import {LoggedUserInterface} from "../../entities/User";


const {remove} = new UserLocalRepository()

export const removeUserUseCase = async () => {
    return await remove()
}
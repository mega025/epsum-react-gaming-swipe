import {UserLocalRepository} from "../../../data/repositories/UserLocalRepository";
import {LoggedUserInterface} from "../../entities/User";


const {save} = new UserLocalRepository();

export const saveUserUserCase = async (user: LoggedUserInterface) => {
    return await save(user);
}

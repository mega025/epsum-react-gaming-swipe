import {AuthRepository} from "../../../data/repositories/AuthRepository";
import {UserInterface} from "../../entities/User";


const  {register} = new AuthRepository();

export const registerUseCase = async (user: UserInterface) => {
    return await register(user);
}
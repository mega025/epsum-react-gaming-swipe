import {AuthRepository} from "../../../data/repositories/AuthRepository";
import {AuthRepositoryInterface} from "../../repositories/AuthRepositoryInterface";
import {LoginUserInterface} from "../../entities/User";


const {login} = new AuthRepository();

export const LoginAuthUseCase = async (user: LoginUserInterface) => {
    return await login(user);
}
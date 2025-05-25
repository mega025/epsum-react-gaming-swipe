import {SearchRepository} from "../../../data/repositories/SearchRepository";
import {SearchUserDTO} from "../../entities/User";


const {searchUsers} = new SearchRepository()

export const searchUsersUseCase = async (userParameters: SearchUserDTO, token: string) => {
    return await searchUsers(userParameters, token);
}
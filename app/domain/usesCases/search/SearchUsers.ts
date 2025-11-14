import {SearchRepository} from "../../../data/repositories/SearchRepository";
import {UpdateUserDTO} from "../../entities/User";


const {searchUsers} = new SearchRepository()

export const searchUsersUseCase = async (userParameters: UpdateUserDTO) => {
    return await searchUsers(userParameters);
}
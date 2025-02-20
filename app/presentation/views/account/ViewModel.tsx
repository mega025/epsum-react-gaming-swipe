import {removeUserUseCase} from "../../../domain/usesCases/userLocal/removeUser";

export const AccountViewModel =()=> {

    const deleteSession = async () => {
        await removeUserUseCase()}

    return {deleteSession};
}

export default { AccountViewModel };
import {UserLocalRepositoryInterface} from "../../domain/repositories/UserLocalRepositoryInterface";
import {LoggedUserInterface} from "../../domain/entities/User";
import {LocalStorage} from "../sources/local/LocalStorage";

export class UserLocalRepository implements UserLocalRepositoryInterface {
    async getUser(): Promise<LoggedUserInterface> {
        const {getItem} = LocalStorage();
        const data = await getItem("gsapp_user")
        return JSON.parse(data as any) as LoggedUserInterface;
    }

    async remove(): Promise<void> {
        const {removeItem} = LocalStorage()
        await removeItem("gsapp_user")
    }

    async save(user: LoggedUserInterface): Promise<void> {
        const {save} = LocalStorage()
        await save("gsapp_user", JSON.stringify(user))
    }
}
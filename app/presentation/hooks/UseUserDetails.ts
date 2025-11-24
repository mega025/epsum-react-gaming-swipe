import {AccountRepository} from "../../data/repositories/AccountRepository";
import {useQuery} from "@tanstack/react-query";

const {getUser} = new AccountRepository()

export const useUserDetails = (userSlug:  string) => {
    return useQuery({
        queryKey: ["user", userSlug],
        queryFn: () => getUser(userSlug),
    })
}
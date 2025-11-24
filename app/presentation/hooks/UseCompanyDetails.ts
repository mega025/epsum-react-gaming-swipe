import {GameDetailsRepository} from "../../data/repositories/GameDetailsRepository";
import {useQuery} from "@tanstack/react-query";

const {loadCompanyDetails} = new GameDetailsRepository();

export const useCompanyDetails = (companyId: number) => {
    return useQuery({
        queryKey: ["company", companyId ],
        queryFn: () => loadCompanyDetails(companyId)
    })
}
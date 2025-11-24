import {useQuery} from "@tanstack/react-query";
import {searchMostAnticipatedGamesUseCase} from "../../domain/usesCases/search/SearchMostAnticipatedGames";


export const useAnticipatedGames = () => {
    return useQuery({
        queryKey: ["anticipated_games"],
        queryFn: () => searchMostAnticipatedGamesUseCase()
    })
}
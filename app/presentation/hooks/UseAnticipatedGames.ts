import {useQuery} from "@tanstack/react-query";
import {searchMostAnticipatedGamesUseCase} from "../../domain/usesCases/search/SearchMostAnticipatedGames";
import {SearchRepository} from "../../data/repositories/SearchRepository";

const {searchMostAnticipatedGames} = new SearchRepository()

export const useAnticipatedGames = () => {
    return useQuery({
        queryKey: ["anticipated_games"],
        queryFn: () => searchMostAnticipatedGames()
    })
}
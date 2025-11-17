import { useQuery } from "@tanstack/react-query";
import {GameDetailsRepository} from "../../data/repositories/GameDetailsRepository";

const { loadGameDetails } = new GameDetailsRepository();

export const useGameDetails = (gameId: number) => {
    return useQuery({
        queryKey: ["game", gameId],
        queryFn: () => loadGameDetails(gameId),
    });
};

import {loadFavGamesUseCase} from "../../../domain/usesCases/favGames/LoadFavGames";
import {useState} from "react";
import {GameDetails} from "../../../domain/entities/Game";
import {loadGameDetailsUseCase} from "../../../domain/usesCases/gameDetails/LoadGameDetails";

export const gameDetailsViewModel = () => {
    const [gameDetails, setGameDetails] = useState<GameDetails>();
    const [showLoading, setShowLoading] = useState(true);

    const loadGameDetails = async (gameId: number) => {
        const response = await loadGameDetailsUseCase(gameId);
        setGameDetails(response[0]);
        console.log(response[0].similar_games);
        setShowLoading(false);
    }

    return {
        loadGameDetails,
        gameDetails,
        showLoading
    }
}

export default gameDetailsViewModel
import {Cover, Game, Platform} from "../../domain/entities/Game";

export const NO_GAMES_FOUND_LABEL = "No games found with those filters 😭"

export const generateNoGamesFoundCard = (selectedGenres: Platform[], selectedPlatforms: Platform[]) => {
    const noGameFoundWithThisFilters: Game = {
        id: 1,
        name: NO_GAMES_FOUND_LABEL,
        genres: selectedGenres,
        platforms: selectedPlatforms,
    }
    return noGameFoundWithThisFilters
}

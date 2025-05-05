import {GameDetails} from "../entities/Game";


export interface GameDetailsRepositoryInterface {
    loadGameDetails: (gameId: number) => Promise<GameDetails[]>
}
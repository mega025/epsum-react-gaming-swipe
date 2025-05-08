import {GameDetailsInterface} from "../entities/Game";


export interface GameDetailsRepositoryInterface {
    loadGameDetails: (gameId: number) => Promise<GameDetailsInterface[]>
}
import {GameDetailsRepositoryInterface} from "../../domain/repositories/GameDetailsRepositoryInterface";
import {GameDetails} from "../../domain/entities/Game";
import {AxiosError} from "axios";
import {IgdbApiDelivery} from "../sources/remote/igdbAPI/IgdbApiDelivery";


export class GameDetailsRepository implements GameDetailsRepositoryInterface {
    async loadGameDetails(gameId: number): Promise<GameDetails[]> {
        try {
            const response = await IgdbApiDelivery.post(
                "/games",
                "fields name, " +
                "cover.url, " +
                "genres.name, " +
                "platforms.abbreviation, " +
                "rating, release_dates.human, release_dates.y, " +
                "storyline, summary, videos.video_id, similar_games.name, " +
                "involved_companies.company.name;" +
                `where id = ${gameId};`)
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError)
            console.log(e)
            return Promise.reject(e)
        }
    }
}
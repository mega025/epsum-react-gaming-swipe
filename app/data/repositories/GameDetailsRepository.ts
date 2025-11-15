import {GameDetailsRepositoryInterface} from "../../domain/repositories/GameDetailsRepositoryInterface";
import {GameDetailsInterface} from "../../domain/entities/Game";
import {AxiosError} from "axios";
import {IgdbApiDelivery} from "../sources/remote/igdbAPI/IgdbApiDelivery";
import {CompanyDetailsInterface} from "../../domain/entities/Company";


export class GameDetailsRepository implements GameDetailsRepositoryInterface {
    async loadGameDetails(gameId: number): Promise<GameDetailsInterface[]> {
        try {
            const response = await IgdbApiDelivery.post(
                "/games",
                "fields name, " +
                "cover.url, " +
                "genres.name, " +
                "platforms.abbreviation, screenshots.url, " +
                "rating, release_dates.human, release_dates.y, " +
                "storyline, summary, videos.video_id, similar_games.name, similar_games.cover.url, " +
                "involved_companies.company.name;" +
                `where id = ${gameId};`)
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError)
            console.log(e)
            return Promise.reject(e)
        }
    }

    async loadCompanyDetails(companyId: number): Promise<CompanyDetailsInterface[]> {
        try {
            const response = await IgdbApiDelivery.post(
                "/companies",
                "fields name, " +
                "logo.url, " +
                "description, " +
                "start_date, published.name, published.cover.url, " +
                "country, developed.name, developed.cover.url; " +
                `where id = ${companyId};`)
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError)
            console.log(e)
            return Promise.reject(e)
        }
    }
}
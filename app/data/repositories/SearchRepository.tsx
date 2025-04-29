import {SearchRepositoryInterface} from "../../domain/repositories/SearchRepositoryInterface";
import {Game} from "../../domain/entities/Game";
import {Company} from "../../domain/entities/Company";
import {IgdbApiDelivery} from "../sources/remote/igdbAPI/IgdbApiDelivery";
import {AxiosError} from "axios";
import {ApiDeliveryResponse} from "../sources/remote/models/ApiDeliveryResponse";


export class SearchRepository implements SearchRepositoryInterface {
    async searchMostAnticipatedGames(): Promise<Game[]> {
        try {
            const response = await IgdbApiDelivery.post(
                "/games",
                `fields name, rating, platforms.abbreviation, genres.name, cover.url, release_dates.y; limit 10; 
                sort hypes desc; where total_rating_count = null & release_dates.y >= 2025;`)
            return Promise.resolve(response.data)
        } catch (error) {
            let e = (error as AxiosError);
            console.error("Error: ", e.message);
            return Promise.reject(e.message);
        }
    }

    async searchGamesByUserInput(input: string, page: number): Promise<Game[]> {
        try {
            const offset = page > 1 ? `offset ${page * 15};` : "";
            const response = await IgdbApiDelivery.post(
                "/games",
                `fields name, 
                rating, 
                platforms.abbreviation,
                genres.name, cover.url, 
                release_dates.y; limit 15; search "${input}"; ${offset}`
            )
            return Promise.resolve(response.data)
        } catch (error) {
            let e = (error as AxiosError);
            console.error("Error: ", e.message);
            return Promise.reject(e.message);
        }
    }
    async mostPopularCompany(): Promise<Company[]> {
        try {
            const response = await IgdbApiDelivery.post(
                "/games",
                `fields name, rating, platforms.abbreviation, genres.name, cover.url, release_dates.y; limit 10; 
                sort hypes desc; where total_rating_count = null & release_dates.y >= 2025;`)
            return Promise.resolve(response.data)
        } catch (error) {
            let e = (error as AxiosError);
            console.error("Error: ", e.message);
            return Promise.reject(e.message);
        }
    }
    async searchCompanyByUserInput(input: string, page: number): Promise<Company[]> {
        try {
            const offset = page > 1 ? `offset ${(page - 1) * 15};` : "";
            const response = await IgdbApiDelivery.post(
                "/companies",
                `fields id, name, description, country, logo.image_id; limit 15; search "${input}"; ${offset}`
            );
            return Promise.resolve(response.data);
        } catch (error) {
            const e = error as AxiosError;
            console.error("Error: ", e.message);
            return Promise.reject(e.message);
        }
    }
}
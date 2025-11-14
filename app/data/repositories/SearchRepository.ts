import {SearchRepositoryInterface} from "../../domain/repositories/SearchRepositoryInterface";
import {Game} from "../../domain/entities/Game";
import {CompanyDetailsInterface} from "../../domain/entities/Company";
import {IgdbApiDelivery} from "../sources/remote/igdbAPI/IgdbApiDelivery";
import axios, {AxiosError} from "axios";
import {ApiDeliveryResponse} from "../sources/remote/models/ApiDeliveryResponse";
import {GetSearchUserInterface, UpdateUserDTO} from "../../domain/entities/User";
import {ApiDelivery} from "../sources/remote/api/ApiDelivery";


export class SearchRepository implements SearchRepositoryInterface {
    async searchMostAnticipatedGames(): Promise<Game[]> {
        try {
            const response = await IgdbApiDelivery.post(
                "/games",
                `fields name, hypes, rating, 
                platforms.abbreviation, genres.name, cover.url, 
                release_dates.y, release_dates.date, summary; 
                limit 10; 
                sort hypes desc; 
                where first_release_date > ${Math.floor(Date.now() / 1000)} & hypes != null;`)
            return Promise.resolve(response.data)
        } catch (error) {
            let e = (error as AxiosError);
            console.log("Error: ", e.message);
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
                summary, release_dates.date, 
                release_dates.y; limit 15; search "${input}"; ${offset}`
            )
            return Promise.resolve(response.data)
        } catch (error) {
            let e = (error as AxiosError);
            console.log("Error: ", e.message);
            return Promise.reject(e.message);
        }
    }
    async getFirst15Companies(): Promise<CompanyDetailsInterface[]> {
        try {
            const gamesResponse = await IgdbApiDelivery.post(
                '/games',
                `fields name; limit 100; sort hypes desc;
                 where rating != null & total_rating_count > 900 & hypes > 20;`
            );

            const gameIds: number[] = gamesResponse.data.map((game: any) => game.id);

            const involvedCompaniesResponse = await IgdbApiDelivery.post(
                '/involved_companies',
                `fields company; where game = (${gameIds.join(',')}) & developer = true; limit 100 ;`
            );

            const companyIds: number[] = involvedCompaniesResponse.data.map((item: any) => item.company);

            const companiesResponse = await IgdbApiDelivery.post(
                '/companies',
                `fields id,name,description,country,logo.image_id; where id = (${companyIds.join(',')}); limit 20;`
            );

            const companies: CompanyDetailsInterface[] = companiesResponse.data.map((company: any) => ({
                id: company.id,
                name: company.name,
                description: company.description,
                country: company.country,
                logo: {
                    id: company.logo?.id,
                    url: company.logo?.image_id
                        ? `https://images.igdb.com/igdb/image/upload/t_logo_med/${company.logo.image_id}.png`
                        : '',
                },
            }));

            const uniqueCompanies: CompanyDetailsInterface[] = Array.from(
                new Map(companies.map((company) => [company.id, company])).values()
            ).slice(0, 20);

            return uniqueCompanies;
        } catch (error) {
            console.log('Error fetching top companies:', error);
            throw error;
        }
    }

    async searchUsers(userParameters: UpdateUserDTO): Promise<GetSearchUserInterface[]> {
        try {
            const response = await ApiDelivery.post("/users/search/", userParameters);
            return Promise.resolve(response.data)
        } catch (error) {
            let e = (error as AxiosError);
            console.log("Error: ", e.response?.data);
            return Promise.reject(e.response?.data);
        }
    }

}
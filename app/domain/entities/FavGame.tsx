import {Game, Genre, GenreDTO, Platform} from "./Game";

export interface FavGame {
    id?: number;
    name: string;
    rating_score: number;
    release_year: number;
    image_url: string;
    platforms: Platform[];
    genres: Genre[];
    id_api: number;
}
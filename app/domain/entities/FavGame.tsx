import {Game, Genre, GenreDTO, Platform} from "./Game";

export interface FavGame {
    id?: number;
    name: string;
    image_url: string;
    rating_score: number;
    genres: Genre[];
    platforms: Platform[];
    release_year: number
    id_api: number;
}
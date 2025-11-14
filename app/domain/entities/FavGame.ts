import {Game, Genre, GenreDTO, Platform} from "./Game";

export interface FavGame {
    id?: number;
    name: string;
    image_url: string;
    rating_score: number;
    summary?: string;
    genres: Genre[];
    platforms: Platform[];
    release_date?: number
    id_api: number;
}
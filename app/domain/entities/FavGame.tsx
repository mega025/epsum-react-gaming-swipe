import {Game, Genre, GenreDTO, Platform} from "./Game";

export interface FavGame {
    id?: number;
    name: string;
    image_url: string;
    id_api: number;
}
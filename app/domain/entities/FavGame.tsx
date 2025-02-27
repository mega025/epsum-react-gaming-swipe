import {Game, GenreDTO, Platform} from "./Game";

export interface FavGame {
    name: string;
    ratingScore: number;
    releaseYear: number;
    imageUrl: string;
    listPlatforms: Platform[];
    listGenres: GenreDTO[];
}
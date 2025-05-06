import {GameDetailsRepositoryInterface} from "../repositories/GameDetailsRepositoryInterface";

export interface Game {
    id: number;
    name: string;
    rating: number;
    platforms: Platform[];
    release_dates: ReleaseDate[];
    genres: Genre[];
    cover: Cover;
}

export interface GameDetails extends Game {
    storyline: string
    summary: string
    videos: Video[]
    similar_games: SimilarGame[]
    involved_companies: InvolvedCompany []
}

export type SimilarGame = Pick<Game, "id" | "name" | "cover">

export interface InvolvedCompany {
    company: Company;
}

export interface Company {
    id: number;
    name: string
}

export interface Video{
    video_id: string;
}

export interface Platform {
    abbreviation: string;
}


export interface ReleaseDate {
    y: number;
    human?: string;
}

export interface Genre {
    name: string;
}

export interface GenreDTO {
    genreName: string;
}

export interface Cover {
    url: string
}
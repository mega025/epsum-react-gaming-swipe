export interface Game {
    name: string;
    rating: number;
    platforms: Platform[];
    releaseDate: ReleaseDate[];
    genres: Genre[];
    cover: Cover;
}

export interface Platform {
    abbreviation: string;
}

export interface ReleaseDate {
    y: number;
}

export interface Genre {
    name: string;
}

export interface Cover {
    url: string
}
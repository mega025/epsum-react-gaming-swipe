export interface Game {
    id: any;
    name: string;
    rating: number;
    platforms: Platform[];
    release_dates: ReleaseDate[];
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
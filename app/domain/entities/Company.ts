import {SimilarGame} from "./Game";

export interface CompanyDetailsInterface {
    id: number
    name: string
    description: string
    logo: Logo
    developed: SimilarGame[]
    published: SimilarGame[]
    country: number
    start_date: number
}

export interface Logo {
    url: string
}
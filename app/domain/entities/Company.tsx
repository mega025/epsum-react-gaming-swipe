export interface Company {
    id: number;
    name: string;
    description?: string;
    country?: number;
    logo: CompanyLogo;
}


export interface CompanyLogo {
    id?: number;
    url: string;
}
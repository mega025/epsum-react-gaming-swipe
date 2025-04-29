export interface Company {
    id: number;
    name: string;
    description?: string;
    country?: number;
    logo?: {
        image_id: string;
    };
}
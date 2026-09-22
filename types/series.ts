export interface Serie {
    id: number;
    title: string;
    genre: string;
    seasons: number;
    platform: string;
    rating: number;
    image: string;
    description: string;
    favorite: boolean;
}

export interface SerieFormData {
    title: string;
    genre: string;
    seasons: string;
    platform: string;
    rating: string;
    image: string;
    description: string;
}
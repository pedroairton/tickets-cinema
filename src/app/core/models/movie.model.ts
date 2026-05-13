export type Movie = {
    id: number;
    title: string;
    slug: string;
    synopsis: string;
    duration_minutes: number;
    formatted_duration?: string;
    age_rating: string;
    image_url?: string;
    trailer_url?: string;
    original_title: string;
    director?: string;
    distributor?: string;
    country_of_origin?: string;
    release_date?: string;
    status: string;
    genres: Genre[];
    available_screenings?: Screening[]
}

export type Screening = {
    id: number;
    movie_id: number;
    room_id: number;
    room_name: string;
    start_time: string;
    end_time: string;
    price: number;

}

export type Genre = {
    id: number;
    name: string;
    slug: string;
}

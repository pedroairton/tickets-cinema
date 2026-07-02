export interface Ticket {
    id: number;
    code: string;
    seat_id: string;
    unit_price: number;
    screening: {
        id: number;
        start_time: string;
        end_time: string;
        movie: {
            id: number;
            title: string;
            slug: string;
            image_url: string;
            age_rating: string;
        };
        room: {
            id: number;
            name: string;
        };
    }
}
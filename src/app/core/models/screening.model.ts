export interface ScreeningDetail {
  data: {
    id: number;
    movie_id: number;
    room_id: number;
    start_time: string;
    end_time: string;
    price: string;
    is_active: boolean;
    formatted_time: string;
    formatted_date: string;
    has_started: boolean;
    has_ended: boolean;
    movie: {
      id: number;
      title: string;
      slug: string;
      synopsis: string;
      image_url: string;
      age_rating: string;
      duration_minutes: number;
      genres: { id: number; name: string; slug: string }[];
    };
    room: {
      id: number;
      name: string;
      total_rows: number;
      total_columns: number;
    };
  };
  seats: {
    total: number;
    occupied: number;
    available: number;
  };
}
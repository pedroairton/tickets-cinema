export interface Room {
    id: number;
    name: string;
    total_rows: number;
    total_columns: number;
    is_active: boolean;
    seats_count: number;
    active_screenings_count: number;
}
export interface Seat {
    id: number,
    row_label: number,
    column_number: number,
    is_occupied: boolean
}

export interface SeatMap {
    [rowLabel: string]: Seat[]
}

export interface SeatMapResponse {
    screening: {
        id: number,
        room: string
        price: string,
    };
    seat_map: SeatMap
}
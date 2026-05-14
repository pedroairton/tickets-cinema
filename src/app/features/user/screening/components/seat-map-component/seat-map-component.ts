import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Seat, SeatMap } from '../../../../../core/models/seat.model';

@Component({
  selector: 'app-seat-map-component',
  imports: [],
  templateUrl: './seat-map-component.html',
  styleUrl: './seat-map-component.scss',
})
export class SeatMapComponent {
  @Input({ required: true }) seatMap!: SeatMap;
  @Input({ required: true }) selectedSeats!: Seat[];
  @Output() seatToggled = new EventEmitter<Seat>();

  get rows(): string[] {
    return Object.keys(this.seatMap).sort();
  }

  getSeatsForRow(row: string): Seat[] {
    return this.seatMap[row] || [];
  }

  isSeatSelected(seat: Seat): boolean {
    return this.selectedSeats.some((s) => s.id === seat.id);
  }

  getSeatClass(seat: Seat): string {
    if(seat.is_occupied) {
      return 'seat occupied';
    }
    if(this.isSeatSelected(seat)) {
      return 'seat selected';
    }
    return 'seat available';
  }

  onSeatClick(seat: Seat) {
    if(seat.is_occupied) {
      return
    }
    this.seatToggled.emit(seat);
  }
}

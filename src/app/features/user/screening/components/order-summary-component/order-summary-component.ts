import { Component, Input } from '@angular/core';
import { Seat } from '../../../../../core/models/seat.model';

@Component({
  selector: 'app-order-summary-component',
  imports: [],
  templateUrl: './order-summary-component.html',
  styleUrl: './order-summary-component.scss',
})
export class OrderSummaryComponent {
  @Input({required: true}) selectedSeats!: Seat[]
  @Input({required: true}) unitPrice!: number
  @Input({required: true}) totalPrice!: number
}

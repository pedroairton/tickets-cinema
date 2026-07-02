import { Component } from '@angular/core';
import { Ticket } from '../../../core/models/history.model';

@Component({
  selector: 'app-history',
  imports: [],
  templateUrl: './history.html',
  styleUrl: './history.scss',
})
export class History {
  tickets: Ticket[] = [];
}

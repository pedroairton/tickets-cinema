import { Component, inject, signal } from '@angular/core';
import { Ticket } from '../../../core/models/history.model';
import { ApiService } from '../../../core/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-history',
  imports: [DatePipe],
  templateUrl: './history.html',
  styleUrl: './history.scss',
})
export class History {
  // tickets: Ticket[] = [];
  tickets = signal<Ticket[]>([])
  private apiService = inject(ApiService)
  private toastr = inject(ToastrService)
  storageUrl = environment.storageUrl

  ngOnInit() {
    this.apiService.getTickets().subscribe({
      next: (res: any) => {
        this.tickets.set(res.data);
        console.log(this.tickets());
      },
      error: (err) => {
        this.toastr.error(err.error.message);
        console.error(err);
      }
    })
  }
}

import { Component, inject } from '@angular/core';
import { Ticket } from '../../../core/models/history.model';
import { ApiService } from '../../../core/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-history',
  imports: [],
  templateUrl: './history.html',
  styleUrl: './history.scss',
})
export class History {
  tickets: Ticket[] = [];
  private apiService = inject(ApiService)
  private toastr = inject(ToastrService)

  ngOnInit() {
    this.apiService.getTickets().subscribe({
      next: (res: any) => {
        this.tickets = res.data;
        console.log(this.tickets);
      },
      error: (err) => {
        this.toastr.error(err.error.message);
        console.error(err);
      }
    })
  }
}

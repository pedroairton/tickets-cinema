import { Component, inject, signal } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Dashboard, DashboardSummary } from '../../../core/models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  dashboard = signal<Dashboard>({
    summary: null
  })

  private adminService = inject(AdminService)
  private toastr = inject(ToastrService)

  ngOnInit(){
    this.adminService.getDashboardSummary().subscribe({
      next: (res: {data: DashboardSummary}) => {
        this.dashboard.update(state => {
          return {
            ...state,
            summary: res.data
          }
        })
        console.log(this.dashboard());
      },

      error: (err) => {
        console.log(err);
        this.toastr.error('Erro ao carregar o sumário');
      }
    })
  }
}

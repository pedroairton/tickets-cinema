import { Component, inject, signal } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Dashboard, DashboardPopularTime, DashboardSummary, DashboardTopGenre, DashboardTopMovie } from '../../../core/models/dashboard.model';

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
    this.loadDashboardSummary()
    this.loadDashboardTopMovies()
    this.loadDashboardPopularTimes()
    this.loadDashboardTopGenres()
  }
  loadDashboardSummary(){
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
  loadDashboardTopMovies(){
    this.adminService.getDashboardTopMovies().subscribe({
      next: (res: {data: DashboardTopMovie[]}) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Erro ao carregar os filmes mais vendidos');
      }
    })
  }
  loadDashboardPopularTimes(){
    this.adminService.getDashboardPopularTimes().subscribe({
      next: (res: {data: DashboardPopularTime[]}) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Erro ao carregar as horas mais populares');
      }
    })
  }
  loadDashboardTopGenres(){
    this.adminService.getDashboardTopGenres().subscribe({
      next: (res: {data: DashboardTopGenre[]}) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Erro ao carregar os gêneros mais vendidos');
      }
    })
  }
}

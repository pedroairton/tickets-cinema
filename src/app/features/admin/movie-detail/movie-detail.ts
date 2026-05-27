import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Movie } from '../../../core/models/movie.model';

@Component({
  selector: 'app-movie-detail',
  imports: [],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.scss',
})
export class MovieDetail {
  movieId: number
  movie = signal<Movie | null>(null)
  private adminService = inject(AdminService)
  private toastr = inject(ToastrService)

  constructor(private route: ActivatedRoute) {
    this.movieId = this.route.snapshot.params['id'];
  }

  loadMovie(){
    this.adminService.getMovieById(this.movieId).subscribe({
      next: (res) => {
        console.log(res);
        this.movie.set(res);
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Erro ao carregar o filme');
      }
    })
  }
}

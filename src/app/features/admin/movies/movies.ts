import { Component, inject, signal } from '@angular/core';
import { Movie } from '../../../core/models/movie.model';
import { AdminService } from '../../../core/services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movies',
  imports: [],
  templateUrl: './movies.html',
  styleUrl: './movies.scss',
})
export class Movies {
  movies = signal<Movie[]>([]);
  private adminService = inject(AdminService);
  private toastr = inject(ToastrService);

  loadMovies() {
    this.adminService.getMovies().subscribe({
      next: (res) => this.movies.set(res.data),
      error: (err) => this.toastr.error('Erro ao carregar os filmes'),
    });
  }

  ngOnInit() {
    this.loadMovies();
  }
}

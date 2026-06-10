import { Component, inject, signal } from '@angular/core';
import { Movie } from '../../../core/models/movie.model';
import { AdminService } from '../../../core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { DialogMovieInfo } from '../dialog/dialog-movie-info/dialog-movie-info';
import { LoadingComponent } from '../../../shared/loading/loading.component';

@Component({
  selector: 'app-movies',
  imports: [MatIconModule, RouterLink, LoadingComponent],
  templateUrl: './movies.html',
  styleUrl: './movies.scss',
})
export class Movies {
  storageUrl = environment.storageUrl;
  comingSoon = signal<Movie[]>([]);
  showing = signal<Movie[]>([]);
  offScreen = signal<Movie[]>([]);
  isLoading = signal(false);
  private adminService = inject(AdminService);
  private toastr = inject(ToastrService);

  constructor(private dialog: MatDialog) {}

  loadMovies() {
    this.isLoading.set(true);
    this.adminService.getMovies().subscribe({
      next: (res) => {
        this.comingSoon.set(res.data.coming_soon.movies);
        this.showing.set(res.data.showing.movies);
        this.offScreen.set(res.data.off_screen.movies);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.toastr.error('Erro ao carregar os filmes');
        this.isLoading.set(false);
      },
    });
  }

  deleteMovie(id: number) {
    if (!confirm('Deseja realmente excluir o filme?')) return;
    this.adminService.deleteMovie(id).subscribe({
      next: () => {
        this.loadMovies();
        this.toastr.success('Filme excluído com sucesso');
      },
      error: (err) => this.toastr.error(err.error.message),
    });
  }

  openDialog(movie: Movie) {
    const dialogRef = this.dialog.open(DialogMovieInfo, {
      width: '500px',
      data: {
        movie: movie,
      },
    });
  }

  ngOnInit() {
    this.loadMovies();
  }
}

import { Component, inject, signal } from '@angular/core';
import { Movie } from '../../../core/models/movie.model';
import { AdminService } from '../../../core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from "@angular/router";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-movies',
  imports: [MatIconModule, RouterLink],
  templateUrl: './movies.html',
  styleUrl: './movies.scss',
})
export class Movies {
  storageUrl = environment.storageUrl;
  comingSoon = signal<Movie[]>([]);
  showing = signal<Movie[]>([]);
  offScreen = signal<Movie[]>([]);
  private adminService = inject(AdminService);
  private toastr = inject(ToastrService);

  loadMovies() {
    this.adminService.getMovies().subscribe({
      next: (res) => {
        this.comingSoon.set(res.data.coming_soon.movies);
        this.showing.set(res.data.showing.movies);
        this.offScreen.set(res.data.off_screen.movies);
      },
      error: (err) => this.toastr.error('Erro ao carregar os filmes'),
    });
  }

  ngOnInit() {
    this.loadMovies();
  }
}

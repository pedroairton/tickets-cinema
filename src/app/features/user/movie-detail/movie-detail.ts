import { Component, inject, signal } from '@angular/core';
import { Movie, MovieDate, Screening } from '../../../core/models/movie.model';
import { ApiService } from '../../../core/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import { MovieScreeningResponse } from '../../../core/models/responses.model';
import { DatePipe } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-movie-detail',
  imports: [MatExpansionModule, DatePipe],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.scss',
})
export class MovieDetail {
  movie = signal<Movie | null>(null);
  screeningsDates = signal<MovieDate[]>([]);
  slug: string;
  readonly panelOpenState = signal(false);
  private apiService = inject(ApiService);
  private toastr = inject(ToastrService);
  storageUrl = environment.storageUrl

  constructor(private route: ActivatedRoute) {
    this.slug = this.route.snapshot.paramMap.get('slug') as string;
  }

  ngOnInit(){
    this.loadMovie()
    this.loadMovieScreenings()
  }
  loadMovie(){
    this.apiService.getMovie(this.slug).subscribe({
      next: (res: Movie) => {
        this.movie.set(res);
        console.log(this.movie());
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Erro ao carregar o filme');
      }
    })
  }
  loadMovieScreenings(){
    this.apiService.getMovieScreenings(this.slug).subscribe({
      next: (res: MovieScreeningResponse) => {
        this.screeningsDates.set(res.dates);
        console.log(this.screeningsDates());
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Erro ao carregar os filmes');
      }
    })
  }
  formatDate(date: Date | null): string | null {
    if (!date) return null;
    return date.toISOString().split('T')[0];
  }
}

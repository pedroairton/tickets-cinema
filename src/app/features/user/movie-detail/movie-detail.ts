import { Component, inject, signal } from '@angular/core';
import { Movie } from '../../../core/models/movie.model';
import { ApiService } from '../../../core/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  imports: [],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.scss',
})
export class MovieDetail {
  movie = signal<Movie | null>(null);
  slug: string;
  private apiService = inject(ApiService);
  private toastr = inject(ToastrService);

  constructor(private route: ActivatedRoute) {
    this.slug = this.route.snapshot.paramMap.get('slug') as string;
  }

  ngOnInit(){
    this.loadMovie()
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
  formatDate(date: Date | null): string | null {
    if (!date) return null;
    return date.toISOString().split('T')[0];
  }
}

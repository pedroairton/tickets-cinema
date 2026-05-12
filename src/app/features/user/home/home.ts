import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { DatePipe } from '@angular/common';
import { Movie } from '../../../core/models/movie.model';

@Component({
  selector: 'app-home',
  imports: [DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private apiService = inject(ApiService);
  today = this.formatDate(new Date());
  movies = signal<Movie[]>([]);

  constructor() {}

  ngOnInit() {
    this.apiService.getScreeningsByDate(this.today).subscribe({
      next: (res: any) => {
        this.movies.set(res.data);
        console.log(this.movies());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  formatDate(date: Date) {
    return date.toISOString().split('T')[0];
  }
  convertMinutes(totalMinutes: number) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h ${minutes}m`;
  }
}

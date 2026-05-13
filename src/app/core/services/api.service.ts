import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Movie } from '../models/movie.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getScreeningsByDate(date: string) {
    console.log(this.apiUrl);
    return this.http.get(`${this.apiUrl}/screenings/by-date?date=${date}`);
  }
  getGenres() {
    return this.http.get(`${this.apiUrl}/genres`);
  }
  getMovies(params?: any): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies`, { params });
  }
  getMovie(slug: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movies/${slug}`);
  }
}

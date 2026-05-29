import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {
  DashboardPopularTime,
  DashboardSummary,
  DashboardTopGenre,
  DashboardTopMovie,
} from '../models/dashboard.model';
import { Movie } from '../models/movie.model';

interface DashboardSummaryResponse {
  data: DashboardSummary;
}
interface DashboardTopMoviesResponse {
  data: DashboardTopMovie[];
  period: string;
}
interface DashboardPopularTimesResponse {
  data: DashboardPopularTime[];
  period: string;
}
interface DashboardTopGenresResponse {
  data: DashboardTopGenre[];
  period: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getDashboardSummary(): Observable<DashboardSummaryResponse> {
    return this.http.get<DashboardSummaryResponse>(`${this.apiUrl}/admin/dashboard/summary`);
  }
  getDashboardTopMovies(): Observable<DashboardTopMoviesResponse> {
    return this.http.get<DashboardTopMoviesResponse>(`${this.apiUrl}/admin/dashboard/top-movies`);
  }
  getDashboardRevenue() {
    return this.http.get(`${this.apiUrl}/admin/dashboard/revenue`);
  }
  getDashboardPopularTimes(): Observable<DashboardPopularTimesResponse> {
    return this.http.get<DashboardPopularTimesResponse>(
      `${this.apiUrl}/admin/dashboard/popular-times`,
    );
  }
  getDashboardTopGenres(): Observable<DashboardTopGenresResponse> {
    return this.http.get<DashboardTopGenresResponse>(`${this.apiUrl}/admin/dashboard/top-genres`);
  }

  getRooms(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/rooms`);
  }

  updateRoomStatus(roomId: number, status: boolean): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/admin/rooms/${roomId}/status`, {
      is_active: status,
    });
  }

  getMovies(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/movies`);
  }

  getMovieById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/movies/${id}`);
  }
  getGenres(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/genres`);
  }
  createMovie(movie: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/movies`, { movie });
  }

  updateMovie(id: number, movie: FormData): Observable<any> {
    movie.append('_method', 'PUT');

    return this.http.post<any>(`${this.apiUrl}/admin/movies/${id}`, movie);
  }
}

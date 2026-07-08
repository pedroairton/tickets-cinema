import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Movie } from '../models/movie.model';
import { Observable } from 'rxjs';
import { MovieScreeningResponse } from '../models/responses.model';
import { ScreeningDetail } from '../../features/user/screening/screening-detail/screening-detail';
import { SeatMapResponse } from '../models/seat.model';
import { CreateOrderRequest, OrderResponse } from '../models/order.model';

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
  searchMovies(title: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies/search?input=${title}`);
  }
  getMovie(slug: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movies/${slug}`);
  }
  getMovieScreenings(slug: string): Observable<MovieScreeningResponse> {
    return this.http.get<MovieScreeningResponse>(`${this.apiUrl}/movies/${slug}/screenings`);
  }
  getScreening(id: number): Observable<ScreeningDetail> {
    return this.http.get<ScreeningDetail>(`${this.apiUrl}/screenings/${id}`);
  }
  getSeatMap(id: number): Observable<SeatMapResponse> {
    return this.http.get<SeatMapResponse>(`${this.apiUrl}/screenings/${id}/seats`);
  }
  createOrder(data: CreateOrderRequest) {
    return this.http.post<OrderResponse>(`${this.apiUrl}/orders`, data);
  }
  getTickets() {
    return this.http.get(`${this.apiUrl}/tickets`);
  }
}

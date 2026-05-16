import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AdminService {
  private apiUrl = environment.apiUrl
  constructor(private http: HttpClient) {}

  getDashboardSummary(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/dashboard/summary`)
  }
  getDashboardTopMovies(){
    return this.http.get(`${this.apiUrl}/admin/dashboard/top-movies`)
  }
  getDashboardRevenue(){
    return this.http.get(`${this.apiUrl}/admin/dashboard/revenue`)
  }
  getDashboardPopularTimes(){
    return this.http.get(`${this.apiUrl}/admin/dashboard/popular-times`)
  }
  getDashboardTopGenres(){
    return this.http.get(`${this.apiUrl}/admin/dashboard/top-genres`)
  }
}

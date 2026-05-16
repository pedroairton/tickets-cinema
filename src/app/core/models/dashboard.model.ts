import { WritableSignal } from '@angular/core';

export interface Dashboard {
    summary: DashboardSummary | null
  // topMovies: any,
  // revenue: any
  // popularTimes: any,
  // topGenres: any,
}

export interface DashboardSummary {
  total_revenue: number;
  total_orders: number;
  total_tickets: number;
  total_customers: number;
}

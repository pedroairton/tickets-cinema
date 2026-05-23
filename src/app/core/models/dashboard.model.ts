import { WritableSignal } from '@angular/core';

export interface Dashboard {
  summary: DashboardSummary | null;
  topMovies: DashboardTopMovie[] | null;
  // revenue: any
  popularTimes: DashboardPopularTime[] | null;
  topGenres: DashboardTopGenre[] | null;
}

export interface DashboardSummary {
  total_revenue: number;
  total_orders: number;
  total_tickets: number;
  total_customers: number;
}

export interface DashboardTopMovie {
  id: number;
  title: string;
  image_url: string;
  tickets_sold: number;
  total_revenue: string;
}

export interface DashboardPopularTime {
  hour: number;
  tickets_sold: number;
}
export interface DashboardTopGenre {
  id: number;
  name: string;
  slug: string;
  tickets_sold: number;
}

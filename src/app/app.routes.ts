import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/user/login/login').then((m) => m.Login),
  },
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () => import('./features/user/home/home').then((m) => m.Home),
      },
      {
        path: 'filmes',
        loadComponent: () => import('./features/user/movies/movies').then((m) => m.Movies),
      },
      {
        path: 'filmes/:slug',
        loadComponent: () =>
          import('./features/user/movie-detail/movie-detail').then((m) => m.MovieDetail),
      },
      {
        path: 'historico',
        canActivate: [authGuard],
        loadComponent: () => import('./features/user/history/history').then((m) => m.History),
      },
      {
        path: 'sessoes/:id',
        loadComponent: () =>
          import('./features/user/screening/screening-detail/screening-detail').then(
            (m) => m.ScreeningDetail,
          ),
      },
    ],
  },
  {
    path: 'admin',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/admin/login/login').then((m) => m.Login),
      },
      {
        path: 'dashboard',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/admin/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'filmes',
        canActivate: [adminGuard],
        loadComponent: () => import('./features/admin/movies/movies').then((m) => m.Movies),
      },
      {
        path: 'filmes/editar/:id',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/admin/movie-detail/movie-detail').then((m) => m.MovieDetail),
      },
      {
        path: 'filmes/novo',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/admin/movie-detail/movie-detail').then((m) => m.MovieDetail),
      },
      {
        path: 'sessoes',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/admin/screenings/screenings').then((m) => m.Screenings),
      },
      {
        path: 'salas',
        canActivate: [adminGuard],
        loadComponent: () => import('./features/admin/rooms/rooms').then((m) => m.Rooms),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

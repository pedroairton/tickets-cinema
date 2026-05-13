import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./features/user/login/login').then(m => m.Login)
    },
    {
        path: '',
        children: [
            {
                path:'', redirectTo: 'home', pathMatch: 'full'
            },
            {
                path: 'home',
                loadComponent: () => import('./features/user/home/home').then(m => m.Home)
            },
            {
                path: 'filmes',
                loadComponent: () => import('./features/user/movies/movies').then(m => m.Movies)
            },
            {
                path: 'filmes/:slug',
                loadComponent: () => import('./features/user/movie-detail/movie-detail').then(m => m.MovieDetail)
            },
            {
                path: 'historico',
                canActivate: [authGuard],
                loadComponent: () => import('./features/user/history/history').then(m => m.History)
            },
            {
                path: '**',
                redirectTo: 'home'
            }
        ]
    },
    {
        path: 'admin',
        children: [
            {
                path: 'login',
                loadComponent: () => import('./features/admin/login/login').then(m => m.Login)
            },
            {
                path: 'catalogo',
                canActivate: [adminGuard],
                loadComponent: () => import('./features/admin/movies/movies').then(m => m.Movies)
            }
        ]
    }
];

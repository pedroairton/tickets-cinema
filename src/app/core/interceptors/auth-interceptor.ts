import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  const token = localStorage.getItem('auth_token');

  let authReq = req;

  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/json',
        // Accept: 'application/json',
      },
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if ((error.status === 401 || 
        error.status === 403) &&
        !router.url.includes('/login') 
      ) {
        localStorage.removeItem('auth_token');
        // redireciona para login
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};